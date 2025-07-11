import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';  // 這裡請改成你的 AuthContext 路徑
import LoadingSpinner from '@/components/LoadinigSpinner';

const LineLogin = () => {
  const navigate = useNavigate();
  const { setToken, verifyToken, loading, referrer } = useAuth();  // 取得 setToken

  useEffect(() => {
    if(loading) {
      return;
    }
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(hash.split('?')[1]);
    const token = urlParams.get('token');

    if (token) {
      setToken(token);
      console.log('JWT 已儲存:', token);
      console.log(referrer);
      const verify = async () => {
        const Verified = await verifyToken(token);
        console.log(`verified: ${Verified}`);
        window.history.replaceState(null, '', '#/line-login');
        navigate(referrer);
      };
      verify();

    } else {
      console.log("無 token，不處理");
    }
  }, [navigate, setToken, verifyToken, loading]);


  return(<LoadingSpinner text='Logging in...' />);
};

export default LineLogin;
