import React from "react";
import IndividualProducts from "./IndividualProduct";

export default function Products({products,addToCart}){
   
    return products.map((individualProducts)=>(
          <IndividualProducts key={individualProducts.ID} individualProducts={individualProducts}
          addToCart={addToCart}/>
    ))
}