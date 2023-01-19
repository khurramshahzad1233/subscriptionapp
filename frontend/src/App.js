import React,{useEffect,useState} from 'react';
import {Routes,Route,BrowserRouter as Router} from "react-router-dom"
import WebFont from "webfontloader";
import Courses from './components/courses/Courses';
import Home from './components/home/Home';
import Footer from './components/layout/footer/Footer';
import Header from './components/layout/header/Header';
import Notfound from './components/layout/nofound/Notfound';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Protectedroute from "./components/route/Protectedroute"
import Profile from "./components/user/Profile"
import {useDispatch} from "react-redux";
import {loaduseraction} from "./components/actions/useraction"
import Createcourse from './components/admin/Createcourse';
import Alladmincourses from './components/admin/Alladmincourses';
import Addvideolecture from './components/courses/Addvideolecture';
import Subscribe from './payment/Subscribe';
import Paymentsuccess from './payment/Paymentsuccess';
import Paymentfail from './payment/Paymentfail';
import {Elements} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"
import axios from 'axios';
import Payments from './payment/Payments';
import Coursepage from './components/courses/Coursepage';
import Dashboard from './components/admin/Dashboard';
import Contact from './components/contact/Contact';






const App = () => {
  const dispatch=useDispatch()
  // window.addEventListener("contextmenu",e=>{
  //   e.preventDefault();
  // });


  const [stripePromise,setStripePromise]=useState(null);
  
  

  async function getstripeapikey(){
    const {data}=await axios.get("/api/stripeapikey");
    let stripeapikey=data.stripeapikey;
   
    setStripePromise(loadStripe(stripeapikey))
  };

  useEffect(()=>{
    WebFont.load({google:{
      families:["Roboto","Montserrat","Droid Sans","Chilanks","Satisfy"]
    }});
    

    dispatch(loaduseraction())
    getstripeapikey()
  },[dispatch])
  return (
    <Router>
      <Header/>

      <Routes>
        <Route path='*' element={<Notfound/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/courses' element={<Courses/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/contact' element={<Contact/>}/>

        <Route element={<Protectedroute/>}>
          <Route path='/account' element={<Profile/>}/>
        </Route>

        <Route element={<Protectedroute isAdmin={true}/>}>
          <Route path='/admin/createcourse' element={<Createcourse/>}/>
        </Route>

        <Route element={<Protectedroute isAdmin={true}/>}>
          <Route path='/admin/courses' element={<Alladmincourses/>}/>
        </Route>

        <Route element={<Protectedroute isAdmin={true}/>}>
          <Route path='/admin/course/lecture/:id' element={<Addvideolecture/>}/>
        </Route>

        <Route element={<Protectedroute/>}>
          <Route path='/subscribe' element={<Subscribe/>}/>
        </Route>

        <Route element={<Protectedroute/>}>
          <Route path='/subscribe/payment' element={<Elements stripe={stripePromise}><Payments/></Elements>}/>
        </Route>

        <Route element={<Protectedroute/>}>
          <Route path='/paymentsuccess' element={<Paymentsuccess/>}/>
        </Route>

        <Route element={<Protectedroute/>}>
          <Route path='/paymentfail' element={<Paymentfail/>}/>
        </Route>

        <Route element={<Protectedroute subscribe={true}/>}>
          <Route path='/course/:id' element={<Coursepage/>}/>
        </Route>

        <Route element={<Protectedroute isAdmin={true}/>}>
          <Route path='/admin/dashboard' element={<Dashboard/>}/>
        </Route>
        
      </Routes>
      
      <Footer/>
    </Router>
  )
}

export default App