import React, {useEffect,useState}from "react";
import { db,auth } from "./firebase-config";
import Navbar from "./Navbar";
import CartProducts from "./CartProducts";
import {  useNavigate } from "react-router-dom";
import StripeCheckout from 'react-stripe-checkout'
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Model from "./Model";
// toast.configure();

export default function Cart(){

      const [showModel, setShowModel]= useState(false);

      //trigger model
      const triggerModel=()=>{
            setShowModel(true);
      }

      //hide model
      const hideModel=()=>{
            setShowModel(false);
      }

      function GetCurrentUser(){
            const [user,setUser]=useState(null);
            useEffect(()=>{
                auth.onAuthStateChanged(user=>{
                    if(user){
                        db.collection('users').doc(user.uid).get().then(snapshot=>{
                            setUser(snapshot.data().Email);
                        })
                    }else{
                        setUser(null);
                    }
                })
            },[])
            return user;
        }
        useEffect(()=>{
              
        })
        const user=GetCurrentUser();


        //state of cart product
        const [cartProducts, setCartProducts]= useState([]);
        const navigate = useNavigate();
        useEffect(()=>{
            let authToken = sessionStorage.getItem('Auth Token')
              auth.onAuthStateChanged(user=>{
                    if(user){
                          db.collection('Cart '+user.uid).onSnapshot(snapshot=>{
                              const newCartProduct=snapshot.docs.map((doc)=>({
                                    ID: doc.id,
                                    ...doc.data(),
                              }));
                              setCartProducts(newCartProduct);
                          })
                          
                    }else if(!user||!authToken){
                          navigate('/');
                          console.log('User is not signed in to retrive cart');
                    }
              })
        },[])


        const qty= cartProducts.map(cartProduct=>{
              return cartProduct.qty;
        })

        //reducing the qty in a simple value
        const reduceOfQty=(accumulator,currentValue)=>accumulator+currentValue;
        const totalQty=qty.reduce(reduceOfQty,0)

        console.log(totalQty);


        //total price of all cart products 
        const price= cartProducts.map(cartProduct=>{
            return cartProduct.TotalProductPrice;
      })

      const reduceOfPrice=(accumulator,currentValue)=>accumulator+currentValue;
      const totalProductPrice=price.reduce(reduceOfPrice,0)

      console.log(totalProductPrice);



        let Product;
        const cartProductIncrease=(cartProduct)=>{
              //console.log(cartProduct);
              Product=cartProduct; 
              Product.qty=Product.qty+1;
              Product.TotalProductPrice=Product.qty*Product.price; 

              auth.onAuthStateChanged(user=>{
                    if(user){
                          db.collection('Cart '+user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                                console.log('increment added');
                          })

                    }else{
                          console.log('user is not logged In')
                    }
              })
        }

        let ProductDec;
        const cartProductDecrement=(cartProduct)=>{
              //console.log(cartProduct);
              if(cartProduct.qty<2){
                    return;
              }
              ProductDec=cartProduct; 
              ProductDec.qty=ProductDec.qty-1;
              ProductDec.TotalProductPrice=ProductDec.qty*ProductDec.price; 

              auth.onAuthStateChanged(user=>{
                    if(user){
                          db.collection('Cart '+user.uid).doc(cartProduct.ID).update(ProductDec).then(()=>{
                                console.log('decrement added');
                          })

                    }else{
                          console.log('user is not logged In')
                    }
              })
        }

       
        //charging payment
        const handleToken=async(token)=>{
            //   console.log(token);
            const cart={name: 'All Products',totalProductPrice}
            const response = await axios.post('http://localhost:9000/checkout', {
                  token,
                  cart
            })
            console.log(response);
            let {status}=response.data;
            if(status==='success'){
                  console.log("success")
                  navigate('/');
                  toast.success('Your order has been placed syccessfully',{
                        position: 'top-right',
                        autoClose:5000,
                        hideProgressBar: false,
                        closeOnClick:true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                  });
                  const uid= auth.currentUser.uid;
                  const carts= await db.collection('Cart '+uid).get();
                  for(var snap of carts.docs){
                        db.collection('Cart '+uid).doc(snap.id).delete();
                  }

            }else{
                  alert('payment error accure')
            }
        }
        
   
    return (
          <div>
                <Navbar user={user} />
                <div>
                {cartProducts.length> 0 &&(
                      <div className="container-fluid">
                              <h1 className="text-center">Cart</h1>
                              <div style={{ display:"flex",flexDirection:"column"}}>
                                    <div className="products-box" style={{ display:"flex",flexDirection:"row",flexWrap:"wrap",alignContent:"center",justifyContent:"start",marginRight:"5%",marginLeft:"5%",textAlign:"center"}}>
                                          <CartProducts cartProducts={cartProducts}
                                          cartProductIncrease={cartProductIncrease}
                                          cartProductDecrement={cartProductDecrement}/>
                                    </div> 
                              </div>
                              <div style={{textAlign:"center",marginLeft:"42%",marginRight:"42%"}}>
                                    <div className="center" style={{margin:"10px",padding:"10px",border:"1px solid #ccc",borderRadius:"5px",backgroungColor:"#fff"}}>
                                          <h5>Cart Summary</h5>
                                          <div>
                                                Total No of Products: <span>{totalQty}</span>
                                          </div>
                                          <div>
                                                Total Price to Pay; <span>$ {totalProductPrice}</span>
                                          </div>
                                          <br></br>
                                          <StripeCheckout
                                                stripeKey="pk_test_51MaZOTSIOJ6brQjUbSSJ60DK58HDa8aWKUg4L2FlYwUaic2dKlcdN0DIlGpdnr7l47AIJkV6iptPLtfoLCKzZ8qm00UcRITLZ6"
                                                token={handleToken}
                                                billingAddress
                                                shippingAddress
                                                name='All Products'
                                                amount={totalProductPrice*100}>
                                          </StripeCheckout>
                                          <h6 className='text-center' style={{marginTop:7+'px'}}>OR</h6>
                                          <button onClick={()=>triggerModel()}>Cash on Delivery</button>
                                    </div>
                              </div>
                              
                      </div>
                )}
                </div>
                
                {cartProducts.length<1&&(
                      <div className="container-fluid">
                             No Products to Cart....
                      </div>
                )}

                {showModel === true&&(
                      <Model totalProductPrice={totalProductPrice} totalQty={totalQty} hideModel={hideModel}/>
                )}
          </div>
    )
}