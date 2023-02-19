import { Icon } from "react-icons-kit";
import React,{useEffect,useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import logo from '../Images/cart.png';
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart';
import {auth} from './firebase-config';
import { db } from "./firebase-config";

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
        <div className='navbar'>
            <div className='leftside'>
                <div className='logo' style={{display:'flex', marginLeft:'5em'}}>
                    <img src={logo} alt='logo'/>
                </div>
            </div>
            <div className='rightside' style={{display:'flex', marginRight:'5em'}}>
                {/* {!user&&<>
                    <div><Link className='navlink' to="/signup">SIGNUP</Link></div>
                    <div><Link className='navlink' to="/login">LOGIN</Link></div>
                </>} */}
                
                {user&&<>
                    <div><Link className="navlink" to="/">{user}</Link></div>
                    <div className="cart-menu-btn">
                        <Link className="navlink" to="/cart" style={{marginLeft:'1em'}}>
                            <Icon icon={shoppingCart} size={20}/>
                         </Link>
                         <span className="cart-indicator">{cartProducts.length}</span>
                    </div>
                    <div className="btn btn-danger btn-md" onClick={handleLogout} style={{marginLeft:'1em'}}>LOGOUT</div>
                </>}
            </div>
        </div>
    )
}