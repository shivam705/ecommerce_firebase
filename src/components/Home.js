
import React,{ useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar';
import { auth,db } from './firebase-config';
import Products from './Products';
//import { collection, addDoc, getDocs } from "firebase/firestore";

export default function Home() {
    
    // gettin current user uid
    function GetUserUid(){
        const [uid, setUseruid]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    setUseruid(user.uid);
                }
            })
        },[])
        return uid;
    }
    const uid=GetUserUid();


    const navigate = useNavigate();
    



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
    
    const user=GetCurrentUser();
    //console.log(user);



    const [products, setProducts]= useState([]);

    const getProducts= async()=>{
        const products = await db.collection('products').get();
        const productsArray=[];
        for(var snap of products.docs){
            var data= snap.data();
            data.ID=snap.id;
            productsArray.push({
                ...data
            })
            if(productsArray.length===products.docs.length){
                setProducts(productsArray);
            }
        }
        
    }


    useEffect(()=>{
        getProducts();
    },[])


    // const [totalProducts, setTotalProducts]=useState(0);
    // useEffect(()=>{
    //     auth.onAuthStateChanged(user=>{
    //         if(user){
    //             db.collection('Cart '+user.id).onSnapshot(snapshot=>{
    //                 const qty= snapshot.docs.length;
    //                 setTotalProducts(qty);
    //             })
    //         }
    //     })
    // },[])

    let Product;
    const addToCart=(product)=>{
        if(uid!==null){
            console.log(product);
            Product=product;
            Product['qty']=1;
            Product['TotalProductPrice']=Product.qty*Product.price;
            db.collection('Cart '+uid).doc(product.ID).set(Product).then(()=>{
                console.log('successfully added to cart');
            })
        }else{
        navigate('/');
        }
    }

    return (
        <div>
            <Navbar user={user}/>
            <br></br>
            {products.length>0 && (
                <div className='container-fluid' >
                    <h1 className='text-center'>Products
                        <div className='product-box' style={{display:'flex'}}>
                            <Products products={products} addToCart={addToCart}/>
                        </div>
                    </h1>
                </div>
            )}
            {products.length<1 && (
                <div className='çontainer-fluid'>
                    please wait ......
                </div>
            )}
        </div>
    );
}