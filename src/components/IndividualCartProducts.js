import React from 'react';
import Icon from "react-icons-kit";
import {plus} from 'react-icons-kit/feather/plus';
import {minus} from 'react-icons-kit/feather/minus';
import { db,auth } from './firebase-config';



export default function IndividualCartProducts({cartProduct,cartProductIncrease,cartProductDecrement}){
     
     
      const handleProductDecrease=()=>{
            cartProductDecrement(cartProduct);
      }


      const handleProductIncrement=()=>{
            cartProductIncrease(cartProduct);
      }
      
      
    const handleDeleteProduct=()=>{
     
          auth.onAuthStateChanged(user=>{
            if(user){
                  db.collection('Cart '+user.uid).doc(cartProduct.ID).delete().then(()=>{
                      console.log('Product Deleted succesfully');
                  })
              }
          })
        
    }



      return(
            <div className="p-4" style={{flex:"1",margin:"10px",padding:"10px",border:"1px solid #ccc",borderRadius:"5px",backgroungColor:"#fff"}}>
                  <div className="p-3" >
                        <img src={cartProduct.url} alt="product-img" width={200} height={200} />
                  </div>
                  <div className='products'>
                  <div ><h2>{cartProduct.title}</h2></div>
                  <div><h5>{cartProduct.description}</h5></div>
                  <div><h3>{cartProduct.price}</h3></div>
                  <span><h4>Quantity:</h4></span>
                  <div className='w3-container w3-teal' style={{textAlign:'center'}} >
                        <h4 style={{display:'flex',textAlign:'center'}}>
                        <div className="action-btns minus"  onClick={handleProductDecrease} style={{marginLeft:"42%",border:"1px solid #ccc"}}>
                              <Icon icon={minus} size={20}/>
                        </div>
                        <div style={{marginLeft:'1em'}}>{cartProduct.qty}</div>
                        <div className="action-btns plus" style={{marginLeft:'1em',border:"1px solid #ccc"}} onClick={handleProductIncrement}>
                              <Icon icon={plus} size={20}/>
                        </div>
                        </h4>
                  </div>
                  <div className="product-text cart-price"><h3>${cartProduct.TotalProductPrice}</h3></div>
                  <div className="btn btn-danger btn-md cart-btn" onClick={handleDeleteProduct}>DELETE</div>
                  </div>
                  
            </div>
      )
}