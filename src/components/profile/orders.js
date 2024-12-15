import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import {auth} from '../firebase-config';
import { db } from "../firebase-config";
import "bootstrap/dist/css/bootstrap.min.css";
import StarRating from "./rateproduct";

export default function OrderList(){

  const [orderProducts, setOrderProducts]= useState([]);

      function GetCurrentUser(){
      const [user,setUser] = useState(null);
      useEffect(() => {
        const fetchData = async () => {
          auth.onAuthStateChanged(async (user) => {
            if (user) {
              try {
                // Fetch user data
                const userDoc = await db.collection("users").doc(user.uid).get();
                setUser(userDoc.data().Email);
      
                // Fetch cart data
                db.collection("Buyer-Cart " + user.uid).onSnapshot((snapshot) => {
                  const newCartProduct = snapshot.docs.map((doc) => ({
                    ID: doc.id,
                    ...doc.data(),
                  }));
                  setOrderProducts(newCartProduct);
                });
              } catch (error) {
                console.error("Error fetching data:", error);
              }
            } else {
              setUser(null);
              console.log("User is not signed in to retrieve cart");
            }
          });
        };
      
        fetchData(); // Call the inner async function
      }, []); 
      
      return user;
      }
      const user=GetCurrentUser();

    const changeRating=(ratings)=>{
      auth.onAuthStateChanged(user=>{
        if(user){
          db.collection('Buyer-Cart '+user.uid).doc(ratings.ID).update(ratings).then(()=>{
            console.log('rating updated');
          })
       }else{
        console.log('user is not logged In')
        }
     })
    }

  return (
  <>
    <Navbar user={user} />
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Order List</h2>
      {orderProducts.length > 0 ? (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Rate this Product</th>
            </tr>
          </thead>
          <tbody>
            {orderProducts.map((order, index) => (
              <tr key={order.ID}>
                <td>{index + 1}</td>
                <td>{order.title}</td>
                <td>{order.price}</td>
                <td>{order.qty}</td>
                <td>{order.TotalProductPrice}</td>
                <td><StarRating order={order} changeRating={changeRating}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-warning text-center">
          No orders available at the moment.
        </div>
      )}
    </div>
    </>
  );
};