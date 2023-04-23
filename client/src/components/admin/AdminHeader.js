import React from "react";
import { useNavigate } from 'react-router-dom';
// import './AdminHeader.css';

export default function AdminHeader() {
    const navigate = useNavigate()
    return (
      <div className='header-admin'>
        <div className='logo-admin'>
          <img className="logo-admin-pic" src="/logo.jpeg" alt="logo" onClick={()=>navigate('/admin')}/>
          <p className="company-admin" onClick={()=>navigate('/admin')}>Miles : Car Rental</p>
        </div>
        <div className='logout-container-admin'>
          <div className="logout-text-container-admin">
            <p onClick={()=>{
              localStorage.removeItem('authToken');
              navigate('/');

            }}>Logout</p>
          </div>
        </div>
      </div>
    )
};
