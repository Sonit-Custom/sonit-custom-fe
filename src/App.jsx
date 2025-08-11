import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuthStatus } from './store/slices/authSlice';
import Layout from "./components/Layout";
import Home from "./pages/Home";

// Components
import Login from './pages/Login';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import Customize from './pages/Customize';
import Store from './pages/Store';
import Cart from './pages/Cart';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import PrivateRoute from './routes/PrivateRoute';
import Register from './pages/Register';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import UserManagement from './pages/dashboard/UserManagement';
import OrderManagement from './pages/dashboard/OrderManagement';
import ProductManagement from './pages/dashboard/ProductManagement';
import CategoryManagement from './pages/dashboard/CategoryManagement';
import CollectionManagement from './pages/dashboard/CollectionManagement';
import RoleManagement from './pages/dashboard/RoleManagement';
import VoucherManagement from './pages/dashboard/VoucherManagement';
import Analytics from './pages/dashboard/Analytics';
import PaymentManagement from './pages/dashboard/PaymentManagement';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import WaitingActivation from './pages/WaitingActivation';

// App Routes Component
const AppRoutes = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthStatus());
    // eslint-disable-next-line
  }, [dispatch]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <Login />
        } 
      />
      <Route 
        path="/register" 
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <Register />
        } 
      />
      <Route 
        path="/waiting-activation" 
        element={<WaitingActivation />} 
      />
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        } 
      >
        <Route index element={<Navigate to="analytics" replace />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="orders" element={<OrderManagement />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="categories" element={<CategoryManagement />} />
        <Route path="collections" element={<CollectionManagement />} />
        <Route path="roles" element={<RoleManagement />} />
        <Route path="vouchers" element={<VoucherManagement />} />
        <Route path="payments" element={<PaymentManagement />} />
      </Route>
      <Route 
        path="/customize" 
        element={<Layout><Customize /></Layout>} 
      />
      <Route 
        path="/store" 
        element={<Layout><Store /></Layout>} 
      />
      <Route 
        path="/product/:id" 
        element={<Layout><ProductDetails /></Layout>} 
      />
      <Route 
        path="/checkout" 
        element={<Layout><Checkout /></Layout>} 
      />
      <Route 
        path="/cart" 
        element={<Layout><Cart /></Layout>} 
      />
      <Route 
        path="/orders" 
        element={<Layout><MyOrders /></Layout>} 
      />
      <Route 
        path="/payment-success/:id" 
        element={<Layout><PaymentSuccess /></Layout>} 
      />
      <Route 
        path="/payment-failed/:id" 
        element={<Layout><PaymentFailed /></Layout>} 
      />
      <Route 
        path="/profile" 
        element={<Profile />} 
      />
      <Route 
        path="/about" 
        element={<Layout><AboutUs /></Layout>} 
      />
      <Route 
        path="/" 
        element={<Layout><Home /></Layout>} 
      />
      <Route 
        path="*" 
        element={<Navigate to="/" replace />} 
      />
    </Routes>
  );
};

// Main App Component
function App() {
  return (
    <Provider store={store}>
      <Router>
          <AppRoutes />
      </Router>
    </Provider>
  );
}

export default App;
