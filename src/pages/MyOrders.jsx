import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ordersAPI from '../services/ordersAPI';
import { addToCart, fetchCart } from '../store/slices/cartSlice';

const ORDER_TABS = ['TẤT CẢ', 'PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

const MyOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('TẤT CẢ');
  // Dữ liệu phân trang cho tab TẤT CẢ
  const [pagedOrders, setPagedOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingPage, setLoadingPage] = useState(false);
  // Dữ liệu tất cả trang để lọc client cho các tab khác
  const [allOrders, setAllOrders] = useState([]);
  const [loadingAll, setLoadingAll] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }
    const loadFirstPage = async () => {
      setLoadingPage(true);
      setError('');
      try {
        const res = await ordersAPI.getOrdersByUserIdPage(user.user_id, 1);
        setPagedOrders(res.data);
        setPageNumber(res.page_number);
        setTotalPages(res.total_pages);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Không thể tải đơn hàng');
      } finally {
        setLoadingPage(false);
      }
    };

    const loadAllOrders = async () => {
      setLoadingAll(true);
      try {
        const all = await ordersAPI.getAllOrdersByUserId(user.user_id);
        setAllOrders(Array.isArray(all) ? all : []);
      } catch {
        // không chặn UI tab TẤT CẢ nếu lỗi prefetch all
      } finally {
        setLoadingAll(false);
      }
    };

    loadFirstPage();
    loadAllOrders();
  }, [isAuthenticated, navigate, user?.user_id]);

  const filteredOrders = useMemo(() => {
    if (activeTab === 'TẤT CẢ') return pagedOrders;
    return allOrders.filter((o) => o.status === activeTab);
  }, [pagedOrders, allOrders, activeTab]);

  const refreshOrdersAfterUpdate = async () => {
    if (!user?.user_id) return;
    try {
      const [resPage, all] = await Promise.all([
        ordersAPI.getOrdersByUserIdPage(user.user_id, pageNumber),
        ordersAPI.getAllOrdersByUserId(user.user_id),
      ]);
      setPagedOrders(resPage.data);
      setPageNumber(resPage.page_number);
      setTotalPages(resPage.total_pages);
      setAllOrders(Array.isArray(all) ? all : []);
    } catch (err) {
      // không chặn UI nếu refresh lỗi
    }
  };

  const handleMarkDelivered = async (order) => {
    if (!user?.user_id) return;
    try {
      await ordersAPI.updateOrderStatus({ order_id: order.order_id, status: 'DELIVERED' });
      await refreshOrdersAfterUpdate();
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Không thể cập nhật trạng thái');
    }
  };

  const handleBuyAgain = async (order) => {
    if (!user?.user_id) {
      navigate('/login');
      return;
    }
    try {
      // Thêm từng sản phẩm lại vào giỏ
      for (const it of order.items || []) {
        const payload = {
          quantity: Math.max(1, Number(it.quantity) || 1),
          request: { product_id: it.product_id, user_id: user.user_id },
        };
        // eslint-disable-next-line no-await-in-loop
        await dispatch(addToCart(payload)).unwrap();
      }
      await dispatch(fetchCart(user.user_id));
      const selectedProductIds = (order.items || []).map((it) => it.product_id);
      navigate('/cart', { state: { selectedProductIds } });
    } catch (err) {
      alert(`Không thể mua lại: ${err}`);
    }
  };

  const goToPage = async (nextPage) => {
    if (!user?.user_id) return;
    if (nextPage < 1 || nextPage > totalPages) return;
    setLoadingPage(true);
    setError('');
    try {
      const res = await ordersAPI.getOrdersByUserIdPage(user.user_id, nextPage);
      setPagedOrders(res.data);
      setPageNumber(res.page_number);
      setTotalPages(res.total_pages);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Không thể tải đơn hàng');
    } finally {
      setLoadingPage(false);
    }
  };

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
        {loadingPage ? (
          <div className="text-white">Đang tải...</div>
        ) : error ? (
          <div className="text-red-300">{error}</div>
        ) : activeTab !== 'TẤT CẢ' && loadingAll ? (
          <div className="text-white">Đang tải tất cả đơn hàng...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-white/70">Không có đơn hàng</div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <React.Fragment key={order.order_id}>
              <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-white/80 text-sm">Mã đơn: <span className="text-white font-semibold">{order.order_id}</span></div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    order.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-300' :
                    order.status === 'CONFIRMED' ? 'bg-emerald-500/20 text-emerald-300' :
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
                        {`${Math.round(Number(it.price) || 0).toLocaleString('vi-VN')} ₫`}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-white/80 text-sm">
                  <div>Ghi chú: <span className="text-white">{order.note || '-'}</span></div>
                  <div>Tổng: <span className="text-[#e0d6ce] font-bold">{`${Math.round(Number(order.total_amount) || 0).toLocaleString('vi-VN')} ₫`}</span></div>
                </div>
                <div className="mt-2 text-white/60 text-xs">Ngày đặt: {new Date(order.created_at).toLocaleString('vi-VN')}</div>
              </div>
              {order.status === 'SHIPPED' && (
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => handleMarkDelivered(order)}
                    className="px-4 py-2 rounded-lg bg-green-500/20 text-green-200 font-semibold hover:bg-green-500/30"
                  >
                    Đã Nhận Hàng
                  </button>
                </div>
              )}
              {order.status === 'CANCELLED' && (
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => handleBuyAgain(order)}
                    className="px-4 py-2 rounded-lg bg-[#e0d6ce] text-black font-semibold hover:bg-[#d1c2b2]"
                  >
                    Mua lại
                  </button>
                </div>
              )}
              </React.Fragment>
            ))}
            {/* Pagination controls for TẤT CẢ */}
            {activeTab === 'TẤT CẢ' && (
              <div className="flex items-center justify-between pt-4 border-t border-white/10 text-white/80 text-sm">
                <button
                  className={`px-3 py-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-40`}
                  onClick={() => goToPage(pageNumber - 1)}
                  disabled={pageNumber <= 1 || loadingPage}
                >
                  Trang trước
                </button>
                <div>Trang {pageNumber} / {totalPages}</div>
                <button
                  className={`px-3 py-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-40`}
                  onClick={() => goToPage(pageNumber + 1)}
                  disabled={pageNumber >= totalPages || loadingPage}
                >
                  Trang sau
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;


