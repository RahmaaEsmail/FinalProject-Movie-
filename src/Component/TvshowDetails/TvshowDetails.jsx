import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';


export default function TvshowDetails() {
  let baseUrl='https://image.tmdb.org/t/p/original/';
  let[search,useSearch]=useSearchParams()
  let currentId=search.get('id');
  let [tvDetails,setTvDetails]=useState([]);

  async function getTrending()
  {
  let {data}=await axios.get(`https://api.themoviedb.org/3/tv/${currentId}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US`)
  setTvDetails(data);
  }

  useEffect(() => {
    getTrending();

  }, [])
  return (
    <>
    <div className="container my-4">
    <div className="row">
        <div className="col-md-4">
          <div className="tv-img">
             <img src={baseUrl+tvDetails.poster_path} className='img-fluid' alt="" />
          </div>
          </div>
          <div className="col-md-8">
          <div className="movie-detail">
            <h2 className='mt-3'>{tvDetails.original_name}</h2>
            <h5 className='mt-3 text-white-50'>{tvDetails.tagline}</h5>
            {tvDetails && tvDetails.genres? tvDetails.genres.map((genre,index)=>
            <button key={index} className='btn btn-info text-white mx-2 mt-3'>{genre.name}</button>
            ):''}

            <p className='mt-3'>Vote : {tvDetails.vote_average}</p>
            <p className='mt-3'>Vote Count : {tvDetails.vote_count}</p>
            <p className='mt-3'>Popularity : {tvDetails.popularity}</p>
            <p className='mt-3'>release_date : {tvDetails.release_date}</p>

            <h3 className='text-white-50 mt-4 lh-lg h5'>{tvDetails.overview}</h3>
          </div>
          </div>
       
      </div>
    </div>
    </>
  )
}
