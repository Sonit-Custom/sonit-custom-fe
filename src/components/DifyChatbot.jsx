import { useEffect } from 'react';

const DifyChatbot = ({
  token = 'bA0pmmUYhi0caSwE',
  userName,
  avatarUrl,
  buttonColor = '#1C64F2',
  width = '24rem',
  height = '40rem',
  bottom = '2rem',
  right = '1.5rem',
}) => {
  useEffect(() => {
    const styleId = 'dify-custom-style';
    const scriptId = token;

    // 1. Gán config lên window
    window.difyChatbotConfig = {
      token,
      userVariables: {
        ...(userName && { name: userName }),
        ...(avatarUrl && { avatar_url: avatarUrl }),
      },
    };

    // 2. Inject style nếu chưa có
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        #dify-chatbot-bubble-button {
          width: 3rem !important;
          height: 3rem !important;
          background-color: #1C64F2 !important;
          z-index: 9999 !important;
          bottom: 5rem !important;
          right: 1.5rem !important;
        }

        #dify-chatbot-bubble-window {
          width: ${width} !important;
          height: ${height} !important;
          position: fixed !important;
          bottom: ${bottom} !important;
          right: ${right} !important;
          z-index: 9999 !important;
          border-radius: 1rem !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3) !important;
        }
      `;
      document.head.appendChild(style);
    }

    // 3. Inject script nếu chưa có
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.src = 'https://udify.app/embed.min.js';
      script.id = scriptId;
      script.defer = true;
      script.async = true;
      document.body.appendChild(script);
    }
  }, [token, userName, avatarUrl, buttonColor, width, height, bottom, right]);

  return null;
};

export default DifyChatbot;
