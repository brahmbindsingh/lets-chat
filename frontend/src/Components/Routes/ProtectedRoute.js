import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ Component, showAlert }) => {
    const { user, loading, isAuthenticated } = useSelector((state)=>state.user);
    const navigate = useNavigate();
    useEffect(()=>{
        if(!isAuthenticated){
            navigate("/login");
        }
    }, [])
  return (
    <>
        {!loading && <Component showAlert = {showAlert} />}
    </>
  )
}

export default ProtectedRoute