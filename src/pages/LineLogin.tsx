import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';  // 這裡請改成你的 AuthContext 路徑

const LineLogin = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();  // 取得 setToken

  useEffect(() => {
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(hash.split('?')[1]);
    const token = urlParams.get('token');

    if (token) {
      setToken(token);  // ✅ 儲存到 AuthContext + localStorage（你的 setToken 已經會存 localStorage）
      console.log('JWT 已儲存:', token);

      // 將 token 放到後端檢查其可用性
      fetch(`${import.meta.env.VITE_API_URL}/user_entry`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(async res => {
          if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error);
          }
          return res.json();
        })
        .then(data => {
          console.log('驗證成功', data);
        })
        .catch(err => {
          console.error('驗證失敗:', err.message);
        });

      // 清除 token，保留 hash 路由
      window.location.hash = '#/line-login';

      // 自動跳轉
      navigate('/');
    } else {
      alert('登入失敗，缺少 token');
    }
  }, [navigate, setToken]);

  return (
    <div>
      <h2>登入中，請稍候...</h2>
    </div>
  );
};

export default LineLogin;
