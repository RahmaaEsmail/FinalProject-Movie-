import logo from './logo.svg';
import './App.css';
import {Routes,Route, useNavigate, Navigate} from 'react-router-dom';
import Home from './Component/Home/Home';
import Movies from './Component/Movies/Movies';
import Tvshows from './Component/Tvshows/Tvshows';
import People from './Component/People/People';
import MovieDetails from './Component/MovieDetails/MovieDetails';
import TvshowDetails from './Component/TvshowDetails/TvshowDetails';
import PeopleDetails from './Component/PeopleDetails/PeopleDetails';
import Notfound from './Component/Notfound/Notfound';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import Footer from './Component/Footer/Footer';
import Navbar from './Component/Navbar/Navbar';
import jwtDecode from 'jwt-decode';
import {useEffect} from 'react'
import { useState } from 'react';


function App() {
  let [userData,setUserData]=useState(null)
   function saveData()
   {
    let encodedData=localStorage.getItem('userToken');
    let decodedData=jwtDecode(encodedData);
    setUserData(decodedData)
   }

   useEffect(() => {
     if(localStorage.getItem('userToken') != null)
     {
      saveData()
     }
   }, [])
   
   let navigate=useNavigate();

   function logOut()
   {
    localStorage.clear();
    setUserData(null);
    navigate('/login')
   }

   function ProtectedData(props)
   {
    if(localStorage.getItem('userToken')==null)
    {
       return <Navigate to='/login'/>
    }
    else{
      return props.children;
    }
   }

  return (
    <>
    {/* userData={userData} logout={logOut} 
     saveData={saveData}
    */}
    <Navbar userData={userData} logout={logOut} />
    <Routes>
      <Route path='/' element={<ProtectedData><Home/></ProtectedData>}></Route>
      <Route path='home' element={<ProtectedData><Home/></ProtectedData>}></Route>
      <Route path='movies' element={<ProtectedData><Movies/></ProtectedData>}></Route>
      <Route path='moviedetails' element={<ProtectedData><MovieDetails/></ProtectedData>}></Route>
      <Route path='people' element={<ProtectedData><People/></ProtectedData>}></Route>
      <Route path='peopledetails' element={<ProtectedData><PeopleDetails/></ProtectedData>}></Route>
      <Route path='tvshows' element={<ProtectedData><Tvshows/></ProtectedData>}></Route>
      <Route path='tvshowdetails' element={<ProtectedData><TvshowDetails/></ProtectedData>}></Route>
      <Route path='login' element={<Login saveData={saveData}/>}></Route>
      <Route path='register' element={<Register/>}></Route>
      <Route path='*' element={<Notfound/>}></Route>
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
