import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ordersAPI from '../services/ordersAPI';

const ORDER_TABS = ['TẤT CẢ', 'PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

const MyOrders = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('TẤT CẢ');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }
    const fetchOrders = async () => {
      setLoading(true);
      setError('');
      try {
        const list = await ordersAPI.getOrdersByUserId(user.user_id);
        setOrders(Array.isArray(list) ? list : []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Không thể tải đơn hàng');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [isAuthenticated, navigate, user?.user_id]);

  const filteredOrders = useMemo(() => {
    if (activeTab === 'TẤT CẢ') return orders;
    return orders.filter((o) => o.status === activeTab);
  }, [orders, activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Đơn hàng của tôi</h1>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 border-b border-white/10">
          {ORDER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${activeTab === tab ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-white">Đang tải...</div>
        ) : error ? (
          <div className="text-red-300">{error}</div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-white/70">Không có đơn hàng</div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.order_id} className="bg-white/10 border border-white/20 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-white/80 text-sm">Mã đơn: <span className="text-white font-semibold">{order.order_id}</span></div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    order.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-300' :
                    order.status === 'SHIPPED' ? 'bg-blue-500/20 text-blue-300' :
                    order.status === 'DELIVERED' ? 'bg-green-500/20 text-green-300' :
                    order.status === 'CANCELLED' ? 'bg-red-500/20 text-red-300' : 'bg-white/10 text-white/80'
                  }`}
                  >{order.status}</span>
                </div>
                <div className="space-y-3">
                  {order.items?.map((it, idx) => (
                    <div key={`${order.order_id}-${it.product_id}-${idx}`} className="flex items-center gap-4">
                      <img src={it.image_url} alt={it.name} className="w-16 h-16 rounded-lg object-cover border border-white/20" />
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-medium truncate">{it.name}</div>
                        <div className="text-white/60 text-sm">Số lượng: {it.quantity}</div>
                      </div>
                      <div className="text-[#e0d6ce] font-semibold">
                        {it.currency === 'VND' ? `${Math.round(it.price).toLocaleString()} ₫` : `$${Number(it.price).toLocaleString()}`}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-white/80 text-sm">
                  <div>Ghi chú: <span className="text-white">{order.note || '-'}</span></div>
                  <div>Tổng: <span className="text-[#e0d6ce] font-bold">{order.currency === 'VND' ? `${Math.round(order.total_amount).toLocaleString()} ₫` : `$${Number(order.total_amount).toLocaleString()}`}</span></div>
                </div>
                <div className="mt-2 text-white/60 text-xs">Ngày đặt: {new Date(order.created_at).toLocaleString('vi-VN')}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;


