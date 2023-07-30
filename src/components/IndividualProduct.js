import React from "react";

export default function IndividualProducts({individualProducts,addToCart}){
      //console.log(individualProducts);
      const handleAddToCart=()=>{
            addToCart(individualProducts);

      }
      
      return(
            <>
            <div className="p-2" style={{flex:"1",margin:"10px",padding:"10px",border:"1px solid #ccc",borderRadius:"5px",backgroungColor:"#fff"}} >
                  
                  <div className="p-3" >
                        <img src={individualProducts.url} alt="product-img" width={200} height={200} />
                  </div>
                  <div className='p-3 '>
                        <div className="product-text title" style={{justifyContent:'center'}}><h2 style={{color:"red"}}>{individualProducts.title}</h2></div>
                        <div className="product-text decription"><h5>{individualProducts.description}</h5></div>
                        <div className="product-text price"><h4>${individualProducts.price}</h4></div>
                        <span
                              className="restaurant-rating" 
                              style={{ backgroundColor: +individualProducts.rating >= 4 ? "#48c479" : "#db7c38",color:"#fff", padding:"0.2rem 0.5rem",display:"flex", maxWidth:"25%",marginLeft:"37%" }}
                              >
                              ★ &nbsp;<span >{individualProducts.rating}</span>
                        </span>
                        <div className="btn btn-danger btn-md cart-btn" onClick={handleAddToCart}>Add To CART</div>
                  </div> 
            </div>
            </>
      )
}