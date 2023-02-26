import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link} from 'react-router-dom';

import {db} from './firebase-config';
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';

export default function Register(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    

  const navigate = useNavigate();
  const handleAction = (e) => {
    e.preventDefault();
    const authentication = getAuth();
    //if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
      .then((response) => {
        sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        db.collection('users').doc(response.user.uid).set({
          Email: email,
          Password: password
        }).then(()=>{
          setEmail('');
          setPassword('');
          navigate('/login');
          
        })
        
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          toast.error('Email Already in Use');
        }
      })
      
   //}
}
  return (
    <div className='container' style={{ textAlign:"center" , marginTop:"10%"}}>
      <h1>Register Page</h1>
      <hr/>
    
      <ToastContainer style={{width:'10%',height:'10%'}}/>
    <Form className='form-group'>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                    Email
                     </Form.Label>
                    <Col sm={5}>
                    <Form.Control type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                    Password
                    </Form.Label>
                    <Col sm={5}>
                    <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
                    </Col>
            </Form.Group>

        <Form.Group as={Row} className="mb-3">
            <Col sm={7}>
            <Button type="submit" onClick={handleAction} variant="outline-primary">Register</Button>
            <Link to="/login"><Button variant="outline-primary" style={{marginLeft:"17px"}}>Login</Button></Link>
            </Col>
        </Form.Group>

    </Form>
    
</div>
  );
};