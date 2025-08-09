import React from 'react';
import { motion } from 'framer-motion';
import sonitLogo from '../assets/sonit-logo.png';
import p1 from '../assets/p1.jpg';
import p2 from '../assets/p2.jpg';
import p3 from '../assets/p3.jpg';
import p4 from '../assets/p4.jpg';
import p5 from '../assets/p5.jpg';
import p6 from '../assets/p6.jpg';
import p7 from '../assets/p7.jpg';
import { FaUsers, FaHistory, FaTools, FaHandsHelping, FaAward, FaStar, FaPhone } from 'react-icons/fa';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const SectionCard = ({ icon, title, children, className }) => (
  <motion.div
    variants={fadeIn}
    className={`bg-gray-800 bg-opacity-50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 ${className}`}
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-blue-600 bg-opacity-30 rounded-full text-blue-400">
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">{title}</h2>
    </div>
    <div className="text-gray-300 leading-relaxed">{children}</div>
  </motion.div>
);

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 via-black to-blue-900/40 text-white min-h-screen pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* --- Hero Section --- */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-20 flex flex-col items-center"
        >
          <img src={sonitLogo} alt="Sonit Custom Logo" className="w-40 h-40 object-contain rounded-full shadow-2xl bg-white p-2 mb-6" />
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400">
            VỀ SONIT CUSTOM
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-300">
            Nơi Đam Mê & Nghệ Thuật Chế Tác Bida Giao Thoa. Chúng tôi không chỉ tạo ra sản phẩm, chúng tôi kiến tạo di sản.
          </p>
        </motion.section>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* --- Sứ mệnh & Giá trị cốt lõi --- */}
          <SectionCard icon={<FaStar size={24} />} title="Sứ mệnh & Giá trị" className="lg:col-span-2">
            <p className="mb-4">Chúng tôi mang đến giải pháp cá nhân hóa sản phẩm bida hàng đầu Việt Nam, giúp khách hàng thể hiện phong cách và đẳng cấp riêng. Sứ mệnh của chúng tôi là biến mọi ý tưởng thành hiện thực, đồng hành cùng cộng đồng bida phát triển bền vững.</p>
            <ul className="list-disc list-inside space-y-2 text-blue-300">
              <li><strong>Chất lượng - Sáng tạo - Tận tâm:</strong> Nền tảng cho mọi sản phẩm.</li>
              <li><strong>Khách hàng là trung tâm:</strong> Lắng nghe, thấu hiểu và đáp ứng vượt mong đợi.</li>
              <li><strong>Đổi mới không ngừng:</strong> Luôn tiên phong trong công nghệ và thiết kế.</li>
            </ul>
          </SectionCard>

          {/* --- Hình ảnh --- */}
          <motion.div variants={fadeIn} className="relative w-full h-full min-h-[250px] rounded-2xl overflow-hidden shadow-2xl">
            <img src={p1} alt="Bida Art" className="absolute inset-0 w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </motion.div>
          
          {/* --- Lịch sử hình thành --- */}
          <SectionCard icon={<FaHistory size={24} />} title="Lịch sử hình thành">
            <p>Thành lập năm 2020 bởi những người trẻ đam mê bida và công nghệ. Từ một xưởng nhỏ, chúng tôi đã phát triển thành doanh nghiệp dẫn đầu trong lĩnh vực custom sản phẩm bida tại Việt Nam, phục vụ hàng ngàn khách hàng từ cá nhân đến chuyên nghiệp.</p>
          </SectionCard>
          
          {/* --- Xưởng sản xuất --- */}
          <SectionCard icon={<FaTools size={24} />} title="Xưởng sản xuất hiện đại">
            <p>Sở hữu xưởng sản xuất với máy móc CNC, in UV, khắc laser hiện đại, đội ngũ nghệ nhân lành nghề, đảm bảo từng sản phẩm đều đạt tiêu chuẩn quốc tế về chất lượng và thẩm mỹ.</p>
          </SectionCard>
          
          {/* --- Hình ảnh 2 --- */}
           <motion.div variants={fadeIn} className="relative w-full h-full min-h-[250px] rounded-2xl overflow-hidden shadow-2xl">
            <img src={p2} alt="Workshop" className="absolute inset-0 w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </motion.div>

          {/* --- Dịch vụ & Sản phẩm --- */}
          <SectionCard icon={<FaHandsHelping size={24} />} title="Dịch vụ & Sản phẩm" className="lg:col-span-3">
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-700/50 p-4 rounded-lg text-center">Custom cơ bida</div>
                <div className="bg-gray-700/50 p-4 rounded-lg text-center">Custom bi, bàn</div>
                <div className="bg-gray-700/50 p-4 rounded-lg text-center">Phụ kiện & Găng tay</div>
                <div className="bg-gray-700/50 p-4 rounded-lg text-center">Quà tặng doanh nghiệp</div>
             </div>
          </SectionCard>

          {/* --- Hình ảnh 3 & 4 --- */}
          <motion.div variants={fadeIn} className="relative w-full h-full min-h-[250px] rounded-2xl overflow-hidden shadow-2xl">
            <img src={p3} alt="Product Detail" className="absolute inset-0 w-full h-full object-cover"/>
          </motion.div>
          <motion.div variants={fadeIn} className="relative w-full h-full min-h-[250px] rounded-2xl overflow-hidden shadow-2xl">
            <img src={p4} alt="Process" className="absolute inset-0 w-full h-full object-cover"/>
          </motion.div>

          {/* --- Đội ngũ chuyên gia --- */}
          <SectionCard icon={<FaUsers size={24} />} title="Đội ngũ chuyên gia">
            <p>Đội ngũ SONIT gồm các nghệ nhân, kỹ sư, designer trẻ trung, sáng tạo, luôn cập nhật xu hướng mới nhất của thế giới bida và công nghệ sản xuất.</p>
          </SectionCard>
          
          {/* --- Cam kết chất lượng --- */}
          <SectionCard icon={<FaAward size={24} />} title="Cam kết chất lượng" className="lg:col-span-2">
            <ul className="list-none space-y-2">
              <li className="flex items-center gap-3"><FaStar className="text-yellow-400"/> Bảo hành 1 đổi 1 với lỗi sản xuất</li>
              <li className="flex items-center gap-3"><FaStar className="text-yellow-400"/> Hoàn tiền nếu không hài lòng</li>
              <li className="flex items-center gap-3"><FaStar className="text-yellow-400"/> Hỗ trợ kỹ thuật trọn đời</li>
            </ul>
          </SectionCard>
          
          {/* --- Hình ảnh 5, 6, 7 --- */}
          <motion.div variants={fadeIn} className="relative w-full h-full min-h-[250px] rounded-2xl overflow-hidden shadow-2xl">
            <img src={p5} alt="Team" className="absolute inset-0 w-full h-full object-cover"/>
          </motion.div>
          <motion.div variants={fadeIn} className="relative w-full h-full min-h-[250px] rounded-2xl overflow-hidden shadow-2xl">
            <img src={p6} alt="Customer" className="absolute inset-0 w-full h-full object-cover"/>
          </motion.div>
           <motion.div variants={fadeIn} className="relative w-full h-full min-h-[250px] rounded-2xl overflow-hidden shadow-2xl">
            <img src={p7} alt="Quality" className="absolute inset-0 w-full h-full object-cover"/>
          </motion.div>
          
          {/* --- Liên hệ --- */}
          <SectionCard icon={<FaPhone size={24} />} title="Liên hệ" className="lg:col-span-3">
             <div className="flex flex-col md:flex-row gap-6 items-center justify-center text-center">
                <div className="flex-1">
                  <p className="font-medium text-lg">Địa chỉ</p>
                  <p className="text-gray-400">123 Đường Bida, Quận 1, TP.HCM</p>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-lg">Hotline</p>
                  <p className="text-gray-400">0901 234 567</p>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-lg">Email</p>
                  <p className="text-gray-400">contact@sonitbida.vn</p>
                </div>
              </div>
          </SectionCard>
        </div>

      </div>
    </div>
  );
};

export default AboutUs; 