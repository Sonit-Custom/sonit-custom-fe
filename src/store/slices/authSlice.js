import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authAPI from '../../services/authAPI';
import { jwtDecode } from 'jwt-decode';

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await authAPI.login(email, password);
      return response; // Chỉ trả về tokens, không dispatch fetchUserById ở đây
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Login failed');
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'auth/fetchUserById',
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      const response = await authAPI.getUserById(userId);
      // Fetch cart sau khi user được load thành công
      if (response && response.user_id) {
        // Dispatch fetchCart action trực tiếp để tránh circular dependency
        dispatch({ type: 'cart/fetchCart/pending' });
        try {
          const cartAPI = await import('../../services/cartAPI');
          const cartResponse = await cartAPI.default.getCartByUserId(response.user_id);
          dispatch({ 
            type: 'cart/fetchCart/fulfilled', 
            payload: cartResponse.data || cartResponse 
          });
        } catch (cartError) {
          console.error('Failed to fetch cart:', cartError);
          dispatch({ 
            type: 'cart/fetchCart/rejected', 
            payload: cartError.message 
          });
        }
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Fetch user failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { getState, rejectWithValue, dispatch }) => {
    const { auth } = getState();
    if (!auth.user) return;
    try {
      await authAPI.logout(auth.user.user_id);
    } catch (error) {
      console.error('Logout API failed, proceeding with client-side logout.', error);
    }
    // Clear cart khi logout
    dispatch({ type: 'cart/clearCart' });
    return;
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        return rejectWithValue('No token found');
      }
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        return rejectWithValue('Token expired');
      }
      // If token is valid, fetch user data.
      await dispatch(fetchUserById(decodedToken.user_id));
    } catch (error) {
      return rejectWithValue('Invalid token');
    }
  }
);

const initialState = {
  user: null,
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  isAuthenticated: false,
  isLoading: true, // Bắt đầu với loading true để check auth
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    clearError: (state) => {
      state.error = null;
    },
    setTokens: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        // user sẽ được set bởi fetchUserById
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch User By ID
      .addCase(fetchUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true; // <-- Quan trọng
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // Xóa mọi thứ nếu fetch user thất bại
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.error = null;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      })
      // Check Auth Status
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state) => {
        // isLoading sẽ được xử lý bởi fetchUserById
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      });
  },
});

export const { logout, clearError, setTokens } = authSlice.actions;
export default authSlice.reducer; 