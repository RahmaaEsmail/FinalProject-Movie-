import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import style from './Home.module.scss'
import img2 from '../../images/images.png';
import {useNavigate} from 'react-router-dom';
export default function Home() {
let baseUrl='https://image.tmdb.org/t/p/original/';
let [trendingMovies,setTrendingMovies]=useState([]);
let [trendingTv,setTrendingTv]=useState([]);
let [trendingPeople,setTrendingPeople]=useState([]);


 async function getTrending(mediaType,callback)
  {
  let {data}=await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
  callback(data.results);
  }

  useEffect(() => {
    getTrending('movie',setTrendingMovies);
    getTrending('tv',setTrendingTv);
    getTrending('person',setTrendingPeople)
  }, [])
  

  let navigate=useNavigate()
  function goToMovieDetails(id)
  {
     navigate({
      pathname:'/moviedetails',
      search:`?id=${id}`
     })
  }

  function goToTvDetails(id)
  {
     navigate({
      pathname:'/tvshowdetails',
      search:`?id=${id}`
     })
  }

  function goToPeopleDetails(id)
  {
     navigate({
      pathname:'/peopledetails',
      search:`?id=${id}`
     })
  }
  return (
   <>
     <div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-3">
              <div className="title mt-5">
              <div className={`${style.brdr} w-50 my-4`}></div>
                <h2>Trending <br /> Movies <br /> to watch now</h2>
                <p className='text-white-50 mt-4'>Most watched movies by days</p>
              <div className={`${style.brdr} w-100 my-4`}></div>
              </div>
            </div>
           {trendingMovies.slice(0,7).map((movie,index)=>
               <div key={index} className="col-md-3 my-3  position-relative">
               <div className="movie">
               <span className={`${style.rating} position-absolute end-0 top-0 bg-info text-white p-2 fs-5`}>{(movie.vote_average).toFixed(1)}</span>
                  <div onClick={()=>goToMovieDetails(movie.id)} className={`${style.group} position-relative`}>
                  <img src={baseUrl+movie.poster_path} className={`${style.img} w-100`} alt="" />
                  <div className={`${style.layer} d-flex justify-content-center align-items-center text-info`}><p>Click to show more details... </p></div>
                  </div>
                <p className='mt-3'>{movie.original_title}</p>
                <div className='mt-3'><span className='float-start text-muted'>{movie.release_date}</span> <span className='float-end bg-dark text-white-50 rounded-2 p-1'>{movie.media_type}</span></div>
                <div className="clearfix"></div>
               </div>
             </div>
           )}
          </div>


          <div className="row justify-content-center">
            <div className="col-md-3">
              <div className="title mt-5">
              <div className={`${style.brdr} w-50 my-4`}></div>
                <h2>Trending <br /> Tv <br /> to watch now</h2>
                <p className='text-white-50 mt-4'>Most watched tv by days</p>
              <div className={`${style.brdr} w-100 my-4`}></div>
              </div>
            </div>
           {trendingTv.slice(0,7).map((tv,index)=>
               <div key={index} className="col-md-3 my-3  position-relative">
               <div className="tv">
               <span className={`${style.rating} position-absolute end-0 top-0 bg-info text-white p-2 fs-5`}>{(tv.vote_average).toFixed(1)}</span>
                  <div onClick={()=>goToTvDetails(tv.id)} className={`${style.group} position-relative`}>
                  <img src={baseUrl+tv.poster_path} className={`${style.img} w-100`} alt="" />
                  <div className={`${style.layer} d-flex justify-content-center align-items-center text-info`}><p>Click to show more details... </p></div>
                  </div>
                   <p className='mt-3'>{tv.name}</p>
                   <div className='mt-3'><span className='float-start text-muted'>{tv.first_air_date}</span> <span className='float-end bg-dark text-white-50 rounded-2 p-1'>{tv.media_type}</span></div>
                   <div className="clearfix"></div>
               </div>
             </div>
           )}
          </div>


          <div className="row justify-content-center">
            <div className="col-md-3">
              <div className="title mt-5">
              <div className={`${style.brdr} w-50 my-4`}></div>
                <h2>Trending <br /> people <br /> to watch now</h2>
                <p className='text-white-50 mt-4'>Most watched people by days</p>
              <div className={`${style.brdr} w-100 my-4`}></div>
              </div>
            </div>
           {trendingPeople.slice(0,7).map((person,index)=>
               <div key={index} className="col-md-3 my-3  position-relative">
               <div className="person">
                  <div onClick={()=>goToPeopleDetails(person.id)} className={`${style.group} position-relative`}>
                  {person.profile_path !=null ?<img src={baseUrl+person.profile_path} className={`${style.img} w-100`} alt="" />:<img src={img2} className={`${style.img} w-100`} alt="" />}
                  <div className={`${style.layer} d-flex justify-content-center align-items-center text-info`}><p>Click to show more details... </p></div>
                  </div>
                   <p className='mt-3'>{person.name}</p>
               </div>
             </div>
           )}
          </div>

        
        </div>
     </div>
   </>
  )
}
