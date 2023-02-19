import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import AddProducts from './components/AddProducts';
import Cart from './components/Cart';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  db  from './components/firebase-config';
//import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

function App() {
  return (
      <Router>
          <Routes>
              <Route exact path='/' element={< Login />} ></Route>
             
              <Route exact path='/signup' element={< Register />} />
              <Route exact path='/home' element={< Home />} />
              <Route exact path='/cart' element={<Cart/>}/>
              <Route exact path='/add-products' element={< AddProducts />} />
          </Routes>
      </Router>
  );
}

export default App;



// import { useState, useEffect } from 'react';
// import './App.css';
// import Form from './components/Form';
// import Home from './components/Home';
// // import {
// //   BrowserRouter as Router,
// //   Routes,
// //   Route,
// //   useNavigate
// // } from 'react-router-dom';
// import { BrowserRouter as Router, Routes, Route,useNavigate } from 'react-router-dom';
// import { app } from './firebase-config';
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// function App() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();
//   const handleAction = (id) => {
//     const authentication = getAuth();
//     if (id === 1) {
//       signInWithEmailAndPassword(authentication, email, password)
//         .then((response) => {
//           navigate('/home')
//           sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
//         })
//         .catch((error) => {
//           console.log(error.code)
//           if (error.code === 'auth/wrong-password') {
//             toast.error('Please check the Password');
//           }
//           if (error.code === 'auth/user-not-found') {
//             toast.error('Please check the Email');
//           }
//         })
//     }
//     if (id === 2) {
//       createUserWithEmailAndPassword(authentication, email, password)
//         .then((response) => {
//           navigate('/home')
//           sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
//         })
//         .catch((error) => {
//           if (error.code === 'auth/email-already-in-use') {
//             toast.error('Email Already in Use');
//           }
//         })
//     }
//   }

//   useEffect(() => {
//     let authToken = sessionStorage.getItem('Auth Token')

//     if (authToken) {
//       navigate('/home')
//     }
//   }, [])
//   return (
//       <Router>
//        <ToastContainer />
//         <Routes>
//           <Route
//             path='/login'
//             element={
//               <Form
//                 title="Login"
//                 setEmail={setEmail}
//                 setPassword={setPassword}
//                 handleAction={() => handleAction(1)}
//               />}
//           />
//           <Route
//             path='/register'
//             element={
//               <Form
//                 title="Register"
//                 setEmail={setEmail}
//                 setPassword={setPassword}
//                 handleAction={() => handleAction(2)}
//               />}
//           />

//           <Route
//             path='/home'
//             element={
//               <Home />}
//           />
//         </Routes>
//       </Router>
//   );
// }

// export default App;