import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../store/slices/dashboardSlice';

const STATUS_EXCLUDED = new Set(['PENDING', 'CANCELLED']);

function formatCurrencyVND(value) {
  const num = Number(value) || 0;
  return `${Math.round(num).toLocaleString('vi-VN')} ₫`;
}

const Analytics = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const filteredOrders = useMemo(() => {
    const list = Array.isArray(orders) ? orders : [];
    return list.filter((o) => !STATUS_EXCLUDED.has(o.status));
  }, [orders]);

  const totalRevenue = useMemo(() => {
    return filteredOrders.reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0);
  }, [filteredOrders]);

  const monthlyData = useMemo(() => {
    // Build 12 months for current year
    const now = new Date();
    const currentYear = now.getFullYear();
    const months = Array.from({ length: 12 }, (_, i) => ({ month: i, total: 0 }));
    for (const o of filteredOrders) {
      const d = new Date(o.created_at);
      if (!Number.isFinite(d.getTime())) continue;
      if (d.getFullYear() !== currentYear) continue;
      const m = d.getMonth();
      months[m].total += Number(o.total_amount) || 0;
    }
    return months;
  }, [filteredOrders]);

  const maxMonthly = useMemo(() => {
    return monthlyData.reduce((max, m) => Math.max(max, m.total), 0);
  }, [monthlyData]);

  const monthLabels = ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'];

  const [hoverIndex, setHoverIndex] = useState(null);

  // Compute a nice Y axis max and ticks
  const yAxis = useMemo(() => {
    const rawMax = maxMonthly;
    if (rawMax <= 0) {
      return { max: 0, ticks: [0] };
    }
    const magnitude = Math.pow(10, Math.max(0, Math.floor(Math.log10(rawMax)) - 1));
    const niceMax = Math.ceil(rawMax / magnitude) * magnitude;
    const step = niceMax / 4;
    const ticks = [0, step, step * 2, step * 3, niceMax];
    return { max: niceMax, ticks };
  }, [maxMonthly]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Phân tích doanh thu</h1>
      {isLoading && <div className="text-white/80">Đang tải dữ liệu...</div>}
      {error && <div className="text-red-300">{error}</div>}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
          <div className="text-white/60 text-sm">Tổng doanh thu (đơn đã chốt)</div>
          <div className="text-3xl font-extrabold text-[#e0d6ce] mt-2">{formatCurrencyVND(totalRevenue)}</div>
        </div>
        <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
          <div className="text-white/60 text-sm">Tổng số đơn hợp lệ</div>
          <div className="text-3xl font-extrabold text-white mt-2">{filteredOrders.length}</div>
        </div>
        <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
          <div className="text-white/60 text-sm">Đơn loại trừ (Pending/Cancelled)</div>
          <div className="text-3xl font-extrabold text-white mt-2">{(Array.isArray(orders) ? orders.length : 0) - filteredOrders.length}</div>
        </div>
      </div>

      {/* Monthly Revenue Chart (SVG) */}
      <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Doanh thu theo tháng (năm hiện tại)</h2>
          <span className="text-white/60 text-sm">Đơn vị: VND</span>
        </div>
        <div className="w-full">
          <svg viewBox="0 0 800 320" className="w-full h-auto">
            {(() => {
              const width = 800;
              const height = 320;
              const margin = { top: 16, right: 16, bottom: 48, left: 56 };
              const innerWidth = width - margin.left - margin.right;
              const innerHeight = height - margin.top - margin.bottom;
              const band = innerWidth / 12;
              const barWidth = band * 0.6;
              const yMax = yAxis.max || 1;

              // Axes
              const axisX1 = { x1: margin.left, y1: height - margin.bottom, x2: width - margin.right, y2: height - margin.bottom };
              const axisY1 = { x1: margin.left, y1: margin.top, x2: margin.left, y2: height - margin.bottom };

              return (
                <g>
                  {/* Gridlines and Y-axis labels */}
                  {yAxis.ticks.map((t, i) => {
                    const y = margin.top + innerHeight - (t / yMax) * innerHeight;
                    return (
                      <g key={`grid-${i}`}> 
                        <line x1={margin.left} y1={y} x2={width - margin.right} y2={y} stroke="rgba(255,255,255,0.1)" />
                        <text x={margin.left - 8} y={y} textAnchor="end" dominantBaseline="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                          {Math.round(t).toLocaleString('vi-VN')}
                        </text>
                      </g>
                    );
                  })}
                  {/* Axes */}
                  <line {...axisX1} stroke="rgba(255,255,255,0.3)" />
                  <line {...axisY1} stroke="rgba(255,255,255,0.3)" />

                  {/* Bars */}
                  {monthlyData.map((m, idx) => {
                    const x = margin.left + idx * band + (band - barWidth) / 2;
                    const barH = yMax > 0 ? (m.total / yMax) * innerHeight : 0;
                    const y = margin.top + innerHeight - barH;
                    const isHover = hoverIndex === idx;
                    return (
                      <g key={`bar-${idx}`} onMouseEnter={() => setHoverIndex(idx)} onMouseLeave={() => setHoverIndex(null)}>
                        <rect
                          x={x}
                          y={y}
                          width={barWidth}
                          height={barH}
                          rx={4}
                          fill={isHover ? 'rgba(59,130,246,0.7)' : 'rgba(59,130,246,0.5)'}
                        />
                        {/* Value on hover */}
                        {isHover && (
                          <text x={x + barWidth / 2} y={y - 6} textAnchor="middle" fill="#e0d6ce" fontSize="11" fontWeight="600">
                            {Math.round(m.total).toLocaleString('vi-VN')} ₫
                          </text>
                        )}
                      </g>
                    );
                  })}

                  {/* X-axis labels */}
                  {monthLabels.map((ml, idx) => {
                    const x = margin.left + idx * band + band / 2;
                    const y = height - margin.bottom + 18;
                    return (
                      <text key={`xlabel-${idx}`} x={x} y={y} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11">
                        {ml}
                      </text>
                    );
                  })}
                </g>
              );
            })()}
          </svg>
        </div>
      </div>

      {/* Recent valid orders */}
      <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">Đơn hàng hợp lệ gần đây</h2>
        {filteredOrders.length === 0 ? (
          <div className="text-white/60">Chưa có đơn hàng</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/20 text-white/70">
                  <th className="p-3">Mã đơn</th>
                  <th className="p-3">Khách hàng</th>
                  <th className="p-3">Ngày tạo</th>
                  <th className="p-3">Trạng thái</th>
                  <th className="p-3">Tổng</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.slice(0, 10).map((o) => (
                  <tr key={o.order_id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="p-3 text-white/90 text-xs">{o.order_id}</td>
                    <td className="p-3 text-white/80">{o.user_id}</td>
                    <td className="p-3 text-white/70">{new Date(o.created_at).toLocaleString('vi-VN')}</td>
                    <td className="p-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${
                        o.status === 'CONFIRMED' ? 'bg-emerald-500/20 text-emerald-300' :
                        o.status === 'SHIPPED' ? 'bg-blue-500/20 text-blue-300' :
                        o.status === 'DELIVERED' ? 'bg-green-500/20 text-green-300' : 'bg-white/10 text-white/80'
                      }`}>{o.status}</span>
                    </td>
                    <td className="p-3 text-[#e0d6ce] font-semibold">{formatCurrencyVND(o.total_amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;


