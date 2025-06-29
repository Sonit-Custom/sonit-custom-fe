import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useSelector, useDispatch } from 'react-redux';
import { autoLogin } from './store/slices/authSlice';
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import Home from "./pages/Home";

// Components
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Customize from './pages/Customize';
import Store from './pages/Store';
import PrivateRoute from './routes/PrivateRoute';

// App Routes Component
const AppRoutes = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  // Auto-login on app start if refresh token exists
  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken && !isAuthenticated) {
      dispatch(autoLogin());
    }
  }, [dispatch, isAuthenticated]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/customize" 
        element={<Layout><Customize /></Layout>} 
      />
      <Route 
        path="/store" 
        element={<Layout><Store /></Layout>} 
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
