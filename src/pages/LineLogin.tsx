import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';  // 這裡請改成你的 AuthContext 路徑
import { Verified } from 'lucide-react';

const LineLogin = () => {
  const navigate = useNavigate();
  const { setToken, verifyToken } = useAuth();  // 取得 setToken

  useEffect(() => {
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(hash.split('?')[1]);
    const token = urlParams.get('token');

    if (token) {
      setToken(token);  // ✅ 儲存到 AuthContext + localStorage（你的 setToken 已經會存 localStorage）
      console.log('JWT 已儲存:', token);

      // 清除 token，保留 hash 路由
      window.location.hash = '#/line-login';

      const verify = async () => {
        const Verified = await verifyToken(token);
        console.log(`verified: ${Verified}`);
        navigate('/');
      }
      verify();
      
    } else {
      alert('登入失敗，缺少 token');
    }
  }, [navigate, setToken, verifyToken]);

  return (
    <div>
      <h2>登入中，請稍候...</h2>
    </div>
  );
};

export default LineLogin;
