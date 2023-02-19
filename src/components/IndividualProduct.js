import React from "react";

export default function IndividualProducts({individualProducts,addToCart}){
      console.log(individualProducts);
      const handleAddToCart=()=>{
            addToCart(individualProducts);

      }
      return(
            <>
            <div className="p-2"  >
                  
                  <div className="p-3" >
                        <img src={individualProducts.url} alt="product-img" width={200} height={200} />
                  </div>
                  <div className='p-3 '>
                        <div className="product-text title" style={{backgroundColor:'red'}}><h2>{individualProducts.title}</h2></div>
                        <div className="product-text decription"><h5>{individualProducts.description}</h5></div>
                        <div className="product-text price"><h4>{individualProducts.price}</h4></div>
                        <div className="btn btn-danger btn-md cart-btn" onClick={handleAddToCart}>Add To CART</div>
                  </div> 
            </div>
           </>
      )
}