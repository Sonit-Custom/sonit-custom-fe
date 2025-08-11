import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dashboardAPI from '../../services/dashboardAPI';

const createApiThunk = (name, apiCall) => {
  return createAsyncThunk(`dashboard/${name}`, async (_, { rejectWithValue }) => {
    try {
      const response = await apiCall();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || `Failed to fetch ${name}`);
    }
  });
};

export const fetchUsers = createApiThunk('users', dashboardAPI.getUsers);
export const fetchOrders = createApiThunk('orders', dashboardAPI.getOrders);
export const fetchProducts = createApiThunk('products', dashboardAPI.getProducts);
export const fetchCategories = createApiThunk('categories', dashboardAPI.getCategories);
export const fetchCollections = createApiThunk('collections', dashboardAPI.getCollections);
export const fetchRoles = createApiThunk('roles', dashboardAPI.getRoles);
export const fetchVouchers = createApiThunk('vouchers', dashboardAPI.getVouchers);
export const fetchPayments = createApiThunk('payments', dashboardAPI.getPayments);

const initialState = {
  users: [],
  orders: [],
  products: [],
  categories: [],
  collections: [],
  roles: [],
  vouchers: [],
  payments: [],
  isLoading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const thunks = [fetchUsers, fetchOrders, fetchProducts, fetchCategories, fetchCollections, fetchRoles, fetchVouchers, fetchPayments];
    
    thunks.forEach(thunk => {
      const entity = thunk.typePrefix.split('/')[1];
      builder
        .addCase(thunk.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state.isLoading = false;
          state[entity] = action.payload.data || action.payload;
        })
        .addCase(thunk.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        });
    });
  },
});

export default dashboardSlice.reducer; 