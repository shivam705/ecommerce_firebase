import { Icon } from "react-icons-kit";
import React,{useEffect,useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import logo from '../Images/cart.png';
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart';
import {auth} from './firebase-config';
import { db } from "./firebase-config";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default function Navbar({user}){


    const navigate=useNavigate();
    const handleLogout=()=>{
        auth.signOut().then(()=>{
            sessionStorage.removeItem('Auth Token');
            navigate('/');
        })
    }


    
    
    //total product added to cart for current user

    const [cartProducts, setCartProducts]= useState([]);

        useEffect(()=>{
              auth.onAuthStateChanged(user=>{
                    if(user){
                          db.collection('Cart '+user.uid).onSnapshot(snapshot=>{
                              const newCartProduct=snapshot.docs.map((doc)=>({
                                    ID: doc.id,
                                    ...doc.data(),
                              }));
                              setCartProducts(newCartProduct);
                          })
                          
                    }else{
                          console.log('User is not signed in to retrive cart');
                    }
              })
        },[])



    return(
        <div className='navbar' style={{margin:"10px",padding:"10px",border:"1px solid #ccc",borderRadius:"5px",backgroungColor:"#fff",boxShadow:"20px 10px 30px 5px pink inset",display:"flex"}}>
            <div className='leftside'>
                <div className='logo' style={{marginLeft:'5em'}}>
                    <img src={logo} alt='logo' width={70}/>
                </div>
            </div>
            <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
            <div className='rightside' style={{display:'flex', marginRight:'5em'}}>
                {!user&&<>
                    <div><Link className='navlink' to="/signup">SIGNUP</Link></div>
                    <div><Link className='navlink' to="/login">LOGIN</Link></div>
                </>}
                
                {user&&<>
                    <div style={{marginRight:'2em'}}><Link className="navlink" to="/">{user}</Link></div>
                    <div className="cart-menu-btn" style={{marginRight:'2em'}}>
                        <Link className="navlink" to="/cart" style={{marginLeft:'1em'}}>
                            <Icon icon={shoppingCart} size={20}/>
                         </Link>
                         <span className="cart-indicator" style={{backgroundColor:'#e00a02',width:'20px',height:'20px',borderRadius:'60%',justifyContent:'center',textAlign:'center',color:'#fff',fontSize:'12px',fontWeight:'600',position:'absolute'}}>{cartProducts.length}</span>
                    </div>
                    <div className="btn btn-danger btn-md" onClick={handleLogout} style={{marginLeft:'1em'}}>LOGOUT</div>
                </>}
            </div>
        </div>
    )
}