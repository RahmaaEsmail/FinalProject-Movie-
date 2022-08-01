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
    console.log(decodedData);
   }

   useEffect(() => {
     if(localStorage.getItem('userToken'))
     {
      saveData()
     }
   }, [])
   
    let navigate=useNavigate();

   function logOut()
   {
    setUserData(null);
    localStorage.removeItem('userToken');
    navigate('/login')
   }

   function ProtectedRoute(props)
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
    {/* userData={userData}  
     saveData={saveData}
    */}
    <Navbar userData={userData} logout={logOut}/>
    <Routes>
      <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
      <Route path='home' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
      <Route path='movies' element={<ProtectedRoute><Movies/></ProtectedRoute>}></Route>
      <Route path='moviedetails' element={<ProtectedRoute><MovieDetails/></ProtectedRoute>}></Route>
      <Route path='people' element={<ProtectedRoute><People/></ProtectedRoute>}></Route>
      <Route path='peopledetails' element={<ProtectedRoute><PeopleDetails/></ProtectedRoute>}></Route>
      <Route path='tvshows' element={<ProtectedRoute><Tvshows/></ProtectedRoute>}></Route>
      <Route path='tvshowdetails' element={<ProtectedRoute><TvshowDetails/></ProtectedRoute>}></Route>
      <Route path='login' element={<Login saveData={saveData}/>}></Route>
      <Route path='register' element={<Register/>}></Route>
      <Route path='*' element={<Notfound/>}></Route>
    </Routes>


{/* <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='home' element={<Home/>}></Route>
      <Route path='movies' element={<Movies/>}></Route>
      <Route path='moviedetails' element={<MovieDetails/>}></Route>
      <Route path='people' element={<People/>}></Route>
      <Route path='peopledetails' element={<PeopleDetails/>}></Route>
      <Route path='tvshows' element={<Tvshows/>}></Route>
      <Route path='tvshowdetails' element={<TvshowDetails/>}></Route>
      <Route path='login' element={<Login saveData={saveData}/>}></Route>
      <Route path='register' element={<Register/>}></Route>
      <Route path='*' element={<Notfound/>}></Route>
    </Routes> */}
    <Footer/>
    </>
  );
}

export default App;
