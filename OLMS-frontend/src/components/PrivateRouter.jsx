import React from 'react'
import { useRecoilValue } from 'recoil';
import { roleState } from './atom';
import { Navigate } from 'react-router-dom';

const PrivateRouter = ({role,children}) => {
  const currentRole = useRecoilValue(roleState);

  if(currentRole != role){
    return <Navigate to="/unauthorized" replace/>
  }
  return children;
}

export default PrivateRouter
