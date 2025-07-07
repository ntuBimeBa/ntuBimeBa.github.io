import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LineLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(hash.split('?')[1]);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('jwt', token);
      console.log('JWT 已儲存:', token);

      // 清除 token，保留 hash 路由
      window.location.hash = '#/line-login';

      // 自動跳轉
      navigate('/dashboard');
    } else {
      alert('登入失敗，缺少 token');
    }
  }, [navigate]);

  return (
    <div>
      <h2>登入中，請稍候...</h2>
    </div>
  );
};

export default LineLogin;
