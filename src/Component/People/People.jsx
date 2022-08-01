import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import style from './People.module.scss';
import img2 from '../../images/images.png';
import { useNavigate } from 'react-router-dom';
export default function People() {
  let baseUrl='https://image.tmdb.org/t/p/original/';
  let [trendingPeople,setTrendingPeople]=useState([]);

  async function getTrending()
  {
  let {data}=await axios.get(`https://api.themoviedb.org/3/trending/person/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
  setTrendingPeople(data.results);
  }

  useEffect(() => {
   getTrending()
  }, [])

  let navigate=useNavigate()
  function goToPeopleDetails(id)
  {
     navigate({
      pathname:'/peopledetails',
      search:`?id=${id}`
     })
  }

  return (
   <>
   <div className="container">
   <div className="row justify-content-center">
            <div className="col-md-3">
              <div className="title mt-5">
              <div className={`${style.brdr} w-50 my-4`}></div>
                <h2>Trending <br /> people <br /> to watch now</h2>
                <p className='text-white-50 mt-4'>Most watched people by days</p>
              <div className={`${style.brdr} w-100 my-4`}></div>
              </div>
            </div>
           {trendingPeople.map((person,index)=>
               <div key={index} className="col-md-3 my-3  position-relative">
               <div className="person">
                  <div onClick={()=>goToPeopleDetails(person.id)}  className={`${style.group} position-relative`}>
                  {person.profile_path !=null ?<img src={baseUrl+person.profile_path} className={`${style.img} w-100`} alt="" />:<img src={img2} className={`${style.img} w-100`} alt="" />}
                  <div className={`${style.layer} d-flex justify-content-center align-items-center text-info`}><p>Click to show more details... </p></div>
                  </div>
                   <p className='mt-3'>{person.name}</p>
               </div>
             </div>
           )}
          </div>
   </div>
   </>
  )
}
