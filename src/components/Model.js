import React,{useState} from 'react';
import { auth,db } from './firebase-config';
import { useNavigate } from 'react-router-dom';

export default function Model({totalProductPrice,totalQty,hideModel}){
     const [cell, setCell]=useState('');
     const [residentialAddress, setResidentialAddress]=useState('');
     const [cartPrice]=useState(totalProductPrice);
     const [cartQty]=useState(totalQty)
     

     const handleCloseModel=()=>{
           hideModel();
     }

     const navigate=useNavigate();

     //cash on delivery
     const handleCashOnDelivery=async(e)=>{
           e.preventDefault();
           //console.log(cell,residentialAddress,cartPrice,cartQty)
           const uid=auth.currentUser.uid;
           console.log(uid);
           const userData=await db.collection('users').doc(uid).get();
           await db.collection('Buyer-Personal-Info').add({
                 Email:userData.data().Email,
                 CellNo:cell,
                 ResidentialAddress:residentialAddress,
                 CartPrice:cartPrice,
                 TotalQty:totalQty
           })  
           const cartData= await db.collection('Cart '+uid).get();
           for(var snap of cartData.docs){
                 var data=snap.data();
                 data.ID=snap.id;
                 await db.collection('Buyer-Cart '+uid).add(data);
                 await db.collection('Cart '+uid).doc(snap.id).delete();
           }
           hideModel();
           navigate('/');
      }

      return(
            <div className='shade-area' style={{width:'100vw', height:'100vh', position:'fixed', top:'0',left:'0',backgroundColor:'rgba(0,0,0,0.7)',display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <div className='modal-container' style={{width:'300px',height:'auto',padding:'20px',backgroundColor:'#fff',position:'relative'}}>
                        <form className='form-group' onSubmit={handleCashOnDelivery}>
                              <input type="number" className='form-control' placeholder='Cell No' required 
                              onChange={(e)=>setCell(e.target.value)} value={cell}/>
                              <br/>
                              <input type="text" className='form-control' placeholder='Residential Address' required 
                              onChange={(e)=>setResidentialAddress(e.target.value)} value={residentialAddress}/>
                              <br/>
                              <label>Total Quantity</label>
                              <input type="text" className='form-control' readOnly required value={cartQty}/>
                              <br/>
                              <label>Total Price</label>
                              <input type="text" className='form-control' readOnly required value={cartPrice}/>
                              <br/>
                              <button type='submit' className='btn btn-success btn-md'>Submit</button>
                        </form>
                        <div className='delete-icon' onClick={handleCloseModel} style={{backgroundColor:'#e00a02',width:'25px',height:'25px',borderRadius:'50%',display:'flex',justifyContent:'center',alignItems:'center',color:'#fff',fontSize:'12px',fontWeight:'600',position:'absolute',top:'-15px',right:'-15px',cursor:'pointer'}}>x</div>
                  </div>
                  
            </div>
      )
}