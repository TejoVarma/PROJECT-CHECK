import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
//   MDBCheckbox
}
from 'mdb-react-ui-kit';
import { Link, Navigate, useNavigate } from 'react-router-dom';

function AdminLogin() {
    
    const [credentials, setCredentials] = useState({  email: '',  password: '' });
    let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://project-check-node-tejo.onrender.com/api/loginAdmin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({  email: credentials.email,  password: credentials.password })
    });

    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert('Enter Valid credentials');
    }

    if (json.success && json.authToken) {
      localStorage.setItem('adminToken', JSON.stringify(json.authToken));
      navigate('/admin');
    }

  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">ADMIN Login</p>

             

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg' />
                <MDBInput label='Your Email' id='form2' type='email' name='email' value={credentials.email} onChange={onChange} />
              </div>

              

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg' />
                <MDBInput label='Password' id='form4' type='password' name='password' value={credentials.password} onChange={onChange} />
              </div>

              

              <MDBBtn className='mb-4' size='lg' type='submit' onClick={handleSubmit}>Login</MDBBtn>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link to="/adminsignup" className='mb-4'>
                  <MDBBtn className='mb-4 btn-danger' size='lg' type='submit' style={{ marginRight: '10px' }}>Admin Signup</MDBBtn>
                </Link>
                <Link to="/" className='mb-4'>
                  <MDBBtn className='mb-4 btn-danger' size='lg' type='submit' style={{ marginLeft: '10px' }}>User Login</MDBBtn>
                </Link>
              </div>
            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80' fluid />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );

}

export default AdminLogin;
