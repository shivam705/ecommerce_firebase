import React from "react";
// import React,{ useState,useEffect } from "react";
// import { auth,db } from './firebase-config';
// import {AiFillHeart} from 'react-icons/ai';

export default function IndividualProducts({individualProducts,addToCart,addToWishList}){
      //console.log(individualProducts);
      const handleAddToCart=()=>{
            addToCart(individualProducts);

      }

      // gettin current user uid
      // function GetUserUid(){
      //       const [uid, setUseruid]=useState(null);
      //       useEffect(()=>{
      //       auth.onAuthStateChanged(user=>{
      //             if(user){
      //                   setUseruid(user.uid);
      //             }
      //             })
      //       },[])
      //       return uid;
      // }
      // const uid=GetUserUid();


      // let product = false;
      // const [toggleHeart, setToggleHeart] = useState(false);
      // const handleAddToWishList = async() =>{
      //       for(var snap of 'WishList'+uid.docs){
      //             if(snap.ID===individualProducts.ID){
      //                   product=true;
      //                   break;
      //             }
      //       }
      //       if(product===true)
      //       {
      //             await db.collection('WishList '+uid).doc(individualProducts.ID).delete();
      //             // setToggleHeart(false);
      //             product=false;
                  
      //       }else
      //       // if(product===false)
      //       {
      //             addToWishList(individualProducts);
      //             // setToggleHeart(true);
      //             product=true;
      //             //addToWishList(individualProducts);
      //       }
            
      //       // if(toggleHeart){
      //       //       setToggleHeart(false);
      //       // }
      //       // if(!toggleHeart){
      //             //setToggleHeart(true);
      //       // }
      //  };

      return(
            <>
            <div className="p-2" style={{flex:"1",margin:"10px",padding:"10px",border:"1px solid #ccc",borderRadius:"5px",backgroungColor:"#fff"}} >
            
                  <div className="p-3" >
                        {/* <div className="icon">
                             <AiFillHeart color={toggleHeart?"red":"black"} onClick={handleAddToWishList} />
                        </div> */}
                        <img src={individualProducts.url} alt="product-img" width={200} height={200} />
                  </div>
                  <div className='p-3 '>
                        <div className="product-text title" style={{justifyContent:'center'}}><h2 style={{color:"red"}}>{individualProducts.title}</h2></div>
                        <div className="product-text decription"><h5>{individualProducts.description}</h5></div>
                        <div className="product-text price"><h4>${individualProducts.price}</h4></div>
                        {/* <span
                              className="restaurant-rating" 
                              style={{ backgroundColor: +individualProducts.rating >= 4 ? "#48c479" : "#db7c38",color:"#fff", padding:"0.2rem 0.5rem",display:"flex", maxWidth:"25%",marginLeft:"37%" }}
                              >
                              ★ &nbsp;<span >{individualProducts.rating}</span>
                        </span> */}
                        <div>
                              <span
                              className="restaurant-rating"
                              style={{
                              backgroundColor: individualProducts.rating >= 4 ? "#48c479" : "#db7c38", // Use `>=` directly
                              color: "#fff",
                              padding: "0.2rem 0.5rem",
                              display: "inline-flex", // Changed to `inline-flex` for better alignment
                              alignItems: "center",  // Vertically aligns the text and star
                              justifyContent: "center",
                              borderRadius: "4px",   // Added rounded corners for better UI
                              margin: "0 auto",      // Center alignment using margin
                              maxWidth: "fit-content" // Adjust width dynamically
                              }}
                              >
                              <span>
                                    {individualProducts.rating}</span>★&nbsp;
                              </span>
                        </div>
                        <div className="btn btn-danger btn-md cart-btn" onClick={handleAddToCart}>Add To CART</div>
                  </div> 
                  
            </div>
            </>
      )
}