import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthCheck } from '../api/accessCheck.js';

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();
  const [checkAccess] = useAuthCheck();

  useEffect(() => {
    const checkToken = async () => {
      const isAuthenticated = await checkAccess();
      if (!isAuthenticated) {
        console.log("새 액세스 토큰 받지못함 -> isAuthenticated 없음")
        // navigate('/login');
      }
    };
    checkToken();
  }, [checkAccess, navigate]);

  return children;
};

export default AuthWrapper;
