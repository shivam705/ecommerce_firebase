import React from "react";
import IndividualProducts from "./IndividualProduct";

export default function Products({products,addToCart,addToWishList}){
   
    return products.map((individualProducts)=>(
          <IndividualProducts key={individualProducts.ID} individualProducts={individualProducts}
          addToCart={addToCart} addToWishList={addToWishList}/>
    ))
}