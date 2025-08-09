import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sonitLogo from '../assets/sonit-logo.png';

const genderOptions = [
  { label: 'Nam', value: 'male', icon: (
    <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l4-4m0 0l-4 4m4-4v6a9 9 0 11-6-8.485" /></svg>
  ) },
  { label: 'Nữ', value: 'female', icon: (
    <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v7m0 0h-3m3 0h3m-3-7a5 5 0 100-10 5 5 0 000 10z" /></svg>
  ) },
  { label: 'Khác', value: 'other', icon: (
    <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /><path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ) },
];

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isFocused, setIsFocused] = useState({ email: false, fullName: false, password: false, confirmPassword: false });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFocus = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: false }));
  };

  const handleGenderSelect = (value) => {
    setFormData(prev => ({ ...prev, gender: value }));
    if (errors.gender) {
      setErrors(prev => ({ ...prev, gender: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!formData.fullName) {
      newErrors.fullName = 'Họ tên là bắt buộc';
    }
    if (!formData.gender) {
      newErrors.gender = 'Vui lòng chọn giới tính';
    }
    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng nhập lại mật khẩu';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu nhập lại không khớp';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    // TODO: Gọi API đăng ký ở đây
    alert('Đăng ký thành công!');
    navigate('/login');
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <button
        onClick={handleBackToLogin}
        className="absolute top-6 left-6 z-20 flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="text-sm font-medium">Quay lại đăng nhập</span>
      </button>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-black">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full blur-lg animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-white rounded-full blur-2xl animate-pulse delay-2000"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-white rounded-full blur-xl animate-pulse delay-3000"></div>
        </div>
      </div>
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8 ">
            <div className="inline-block ">
              <img 
                src={sonitLogo} 
                alt="Sonit Logo" 
                className="h-48 w-auto mx-auto drop-shadow-lg"
              />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
              Đăng ký tài khoản
            </h1>
            <p className="text-white/80 text-sm">
              Tạo tài khoản mới để sử dụng hệ thống Bi-da
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="relative">
              <div className={`relative transition-all duration-300 ${isFocused.email ? 'transform scale-105' : ''}`}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`w-full px-4 py-4 bg-white/20 border-2 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300 ${errors.email ? 'border-red-400 focus:border-red-400' : isFocused.email ? 'border-white/60' : 'border-white/30'}`}
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-300 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>
            {/* Full Name */}
            <div className="relative">
              <div className={`relative transition-all duration-300 ${isFocused.fullName ? 'transform scale-105' : ''}`}>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  className={`w-full px-4 py-4 bg-white/20 border-2 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300 ${errors.fullName ? 'border-red-400 focus:border-red-400' : isFocused.fullName ? 'border-white/60' : 'border-white/30'}`}
                  placeholder="Họ và tên"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('fullName')}
                  onBlur={() => handleBlur('fullName')}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              {errors.fullName && (
                <p className="mt-2 text-sm text-red-300 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.fullName}
                </p>
              )}
            </div>
            {/* Gender */}
            <div className="relative">
              <div className="flex space-x-4 justify-center">
                {genderOptions.map(opt => (
                  <button
                    type="button"
                    key={opt.value}
                    className={`flex items-center px-4 py-2 rounded-xl border-2 transition-all duration-200 text-white text-sm font-medium focus:outline-none ${formData.gender === opt.value ? 'bg-white/30 border-white/60 scale-105' : 'bg-white/10 border-white/30 hover:bg-white/20'}`}
                    onClick={() => handleGenderSelect(opt.value)}
                  >
                    {opt.icon}
                    {opt.label}
                  </button>
                ))}
              </div>
              {errors.gender && (
                <p className="mt-2 text-sm text-red-300 flex items-center justify-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.gender}
                </p>
              )}
            </div>
            {/* Password */}
            <div className="relative">
              <div className={`relative transition-all duration-300 ${isFocused.password ? 'transform scale-105' : ''}`}>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`w-full px-4 py-4 bg-white/20 border-2 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300 ${errors.password ? 'border-red-400 focus:border-red-400' : isFocused.password ? 'border-white/60' : 'border-white/30'}`}
                  placeholder="Mật khẩu"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('password')}
                  onBlur={() => handleBlur('password')}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-300 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>
            {/* Confirm Password */}
            <div className="relative">
              <div className={`relative transition-all duration-300 ${isFocused.confirmPassword ? 'transform scale-105' : ''}`}>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`w-full px-4 py-4 bg-white/20 border-2 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300 ${errors.confirmPassword ? 'border-red-400 focus:border-red-400' : isFocused.confirmPassword ? 'border-white/60' : 'border-white/30'}`}
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('confirmPassword')}
                  onBlur={() => handleBlur('confirmPassword')}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-300 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            {/* Submit */}
            <button
              type="submit"
              className="group relative w-full py-4 px-6 bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 border border-white/30 hover:border-white/50 rounded-xl text-white font-semibold focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 21v-2a4 4 0 00-8 0v2M12 11a4 4 0 100-8 4 4 0 000 8zm0 0v4" />
                </svg>
                Đăng ký
              </div>
            </button>
          </form>
          <div className="text-center mt-6">
            <p className="text-white/60 text-xs">
              Đã có tài khoản?{' '}
              <button className="underline hover:text-white" onClick={() => navigate('/login')}>Đăng nhập</button>
            </p>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-white/30 rounded-full animate-bounce"></div>
        <div className="absolute top-1/3 right-16 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-20 w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce delay-2000"></div>
        <div className="absolute bottom-1/3 right-8 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-3000"></div>
      </div>
    </div>
  );
};

export default Register; 