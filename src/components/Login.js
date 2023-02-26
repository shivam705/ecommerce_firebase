import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link,useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';


export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const authentication = getAuth();
        if (email === '' || password === '') {
          alert("Enter both the field");
        } else {
            signInWithEmailAndPassword(authentication, email, password)
            .then((response) => {
              sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
              navigate('/')
              
            })
            .catch((error) => {
                console.log(error.code)
                if (error.code === 'auth/wrong-password') {
                  toast.error('Please check the Password');
                }
                if (error.code === 'auth/user-not-found') {
                  toast.error('Please check the Email');
                }
              })
            //navigate('/home')
        }
      };

      useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
    
        if (authToken) {
          navigate('/')
        }
      }, [navigate])


  return (
          
        <div className='container' style={{ textAlign:"center", marginTop:"10%"}}>
            <h1>Login Page</h1>
            <hr/>
            
            <ToastContainer style={{width:'30em', height:'20em'}}/>
            <Form >
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
                    <Button type="submit" onClick={handleSubmit} variant="outline-primary">Sign in</Button>
                    <Link to="/signup"><Button variant="outline-primary" style={{marginLeft:"17px"}}>Register</Button></Link>
                    </Col>
                </Form.Group>
            </Form>
        </div>
  );
};