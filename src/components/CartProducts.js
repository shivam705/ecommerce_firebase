import React from "react";
import IndividualCartProducts from "./IndividualCartProducts";


export default function CartProducts({cartProducts,cartProductIncrease,cartProductDecrement}){


    return cartProducts.map((cartProduct)=>(
          <IndividualCartProducts key={cartProduct.ID} cartProduct={cartProduct} cartProductIncrease={cartProductIncrease} cartProductDecrement={cartProductDecrement}/>
    ))
}