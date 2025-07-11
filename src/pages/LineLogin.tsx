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
    const status_code = Number(urlParams.get('status_code') ?? '1');

    window.history.replaceState(null, '', '#/line-login');

    if (token) {
      setToken(token);
      if(status_code !== 0) {
        // 例外情況
        if(status_code === 2) {
          // 需要補齊資料
          navigate('/login-complete-action');
          return;
        }
      }
      const verify = async () => {
        const Verified = await verifyToken(token);
        console.log(`verified: ${Verified}`);
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
