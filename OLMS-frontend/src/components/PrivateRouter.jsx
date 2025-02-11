import React from 'react'
import { useRecoilValue } from 'recoil';
import { roleState } from './atom';
import { Navigate } from 'react-router-dom';

const PrivateRouter = ({roles,children}) => {
  const currentRole = useRecoilValue(roleState);

  const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
  

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(currentRole)) {
    return <Navigate to="/unauthorized" />;
  }
  return children;
}

export default PrivateRouter
