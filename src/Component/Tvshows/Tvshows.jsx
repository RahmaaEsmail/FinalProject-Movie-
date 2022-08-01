import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import style from './Tvshows.module.scss';
import { useNavigate } from 'react-router-dom';



export default function Tvshows() {
  let baseUrl='https://image.tmdb.org/t/p/original/';
  let [trendingTv,setTrendingTv]=useState([]);
  

  let nums=new Array(13).fill(1).map((num,index)=>index+1)
  async function getTrending(pageNum)
  {
  let {data}=await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}`)
  setTrendingTv(data.results);
  }

  useEffect(() => {
    getTrending(1);

  }, [])

  let navigate=useNavigate()
  function goToTvDetails(id)
  {
     navigate({
      pathname:'/tvshowdetails',
      search:`?id=${id}`
     })
  }

  return (
   <>
     <div className="container">
     {trendingTv.length>0? <div className="row justify-content-center">
           {trendingTv.map((tv,index)=>
               <div key={index} className="col-md-3 my-3  position-relative">
               <div className="movie">
               <span className={`${style.rating} position-absolute end-0 top-0 bg-info text-white p-2 fs-5`}>{(tv.vote_average).toFixed(1)}</span>
                  <div onClick={()=>goToTvDetails(tv.id)} className={`${style.group} position-relative`}>
                  <img src={baseUrl+tv.poster_path} className={`${style.img} w-100`} alt="" />
                  <div className={`${style.layer} d-flex justify-content-center align-items-center text-info`}><p>Click to show more details... </p></div>
                  </div>
                   <p className='mt-3'>{tv.name}</p>
                   <div className='mt-3'><span className='float-start text-muted'>{tv.first_air_date}</span> <span className='float-end bg-dark text-white-50 rounded-2 p-1'>tv</span></div>
                   <div className="clearfix"></div>
               </div>
             </div>
           )}
          </div>:<div className='d-flex vh-100 justify-content-center align-items-center'>
              <i className='fa fa-spinner fa-spin fa-3x text-white'></i>
            </div>}
      </div>

    <nav aria-label="Page navigation example" className='py-4'>
  <ul class="pagination d-flex justify-content-center">
      {nums.map((pageNum)=><li key={pageNum} onClick={()=>getTrending(pageNum)} class="page-item"><a class="page-link bg-transparent text-white">{pageNum}</a></li>)}
  </ul>
</nav>
   </>
  )
}
