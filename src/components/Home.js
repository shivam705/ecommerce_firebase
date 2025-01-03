
import React,{ useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar';
import { auth,db } from './firebase-config';
import Products from './Products';
import "../index.css"
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import SearchItems from './SearchItems';
// import CurrentLocation from './location/CurrentLocation';


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



    let Product;
    const addToCart=(product)=>{
        auth.onAuthStateChanged(user=>{
           
        if(user){
            console.log(product);
            Product=product;
            Product['qty']=1;
            Product['TotalProductPrice']=Product.qty*Product.price;
            db.collection('Cart '+uid).doc(product.ID).set(Product).then(()=>{
                console.log('successfully added to cart');
            })
        }else{
        navigate('/login');
        }})
    }


    
    const getFilterSearch = (searchText) => {
        if(searchText!=='')
        {
           const data = products?.filter((res) =>
              res.title.toLowerCase().includes(searchText.toLowerCase())
            );
            console.log(data);
           setProducts(data);
        }else if(searchText===''){
            const p=getProducts();
            setProducts(p);
        }

      };

    

    let wishProduct;
    const addToWishList=(product)=>{
        //checkWishProduct = db.collection('WishList '+uid).doc(product.ID).get();
        auth.onAuthStateChanged(user=>{
            if(user){
                console.log(product);
                wishProduct=product;
                wishProduct['qty']=1;
                wishProduct['TotalProductPrice']=wishProduct.qty*wishProduct.price;
                db.collection('WishList '+uid).doc(product.ID).set(wishProduct).then(()=>{
                    console.log('successfully added to wishlist');
                })
            }else
            {
                navigate('/login');
            }
        })
    }

    return (
        <div>
            <Navbar user={user}/>
            <br></br>

            {/* <CurrentLocation/> */}

            <SearchItems getFilterSearch={getFilterSearch}/>

                {/* <div style={{width:'40%',height:'40%', margin:'auto'}}>
                    <Carousel autoPlay>
                        {products.map((s)=>
                            <img src={s.url} alt="product-img" />
                        )}
                    </Carousel>
                </div> */}
            
            {products.length>0 && (
                <h1 className='text-center'>Products
                    <div className='container-fluid'style={{ marginTop:"3%", display:"flex",flexDirection:"column"}} >
                        
                            <div className='product-box'  style={{ display:"flex",flexDirection:"row",flexWrap:"wrap",alignContent:"center",justifyContent:"start"}}>
                                <Products products={products} addToCart={addToCart} addToWishList={addToWishList}/>
                            </div>
                            
                    </div>
                </h1>
            )}
            {products.length<1 && (
                <div className='container-fluid'>
                    please wait ......
                </div>
            )}
            
        </div>
    );
}