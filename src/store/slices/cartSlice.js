import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartAPI from '../../services/cartAPI';

export const addToCart = createAsyncThunk(
  'cart/addItem',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await cartAPI.addToCart(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add item to cart');
    }
  }
);

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await cartAPI.getCartByUserId(userId);
      return response.data || response; // Trả về mảng items
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeItem',
  async (payload, { rejectWithValue }) => {
    try {
      await cartAPI.removeFromCart(payload);
      return payload.product_id; // Trả về product_id để xử lý ở client nếu cần
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove item');
    }
  }
);

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  lastAdded: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Action để clear cart khi logout
    clearCart: (state) => {
      state.items = [];
      state.isLoading = false;
      state.error = null;
      state.lastAdded = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        // Logic để cập nhật giỏ hàng, ví dụ:
        // state.items.push(action.payload);
        state.lastAdded = action.payload; // Lưu sản phẩm vừa thêm
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.items = []; // Xóa items khi có lỗi
      })
      // Remove item
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        // Không cần cập nhật state ở đây, component sẽ fetch lại cart
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer; 