import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';  // 這裡請改成你的 AuthContext 路徑
import { Verified } from 'lucide-react';

const LineLogin = () => {
  const navigate = useNavigate();
  const { setToken, verifyToken, token } = useAuth();  // 取得 setToken

  useEffect(() => {
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(hash.split('?')[1]);
    const token = urlParams.get('token');

    if (token) {
      setToken(token);
      console.log('JWT 已儲存:', token);

      const verify = async () => {
        const Verified = await verifyToken(token);
        console.log(`verified: ${Verified}`);
        window.history.replaceState(null, '', '#/line-login');
        navigate('/');
      };
      verify();

    } else {
      console.log("無 token，不處理");
    }
  }, [navigate, setToken, verifyToken]);


  return (
    <div>
      <h2>登入中，請稍候...</h2>
    </div>
  );
};

export default LineLogin;
