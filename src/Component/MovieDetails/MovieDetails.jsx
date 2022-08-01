import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function MovieDetails() {
  let baseUrl='https://image.tmdb.org/t/p/original/';
  let[search,useSearch]=useSearchParams()
  let currentId=search.get('id');
  let [details,setDetails]=useState([]);

  async function getTrending()
  {
  let {data}=await axios.get(`https://api.themoviedb.org/3/movie/${currentId}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US`)
  setDetails(data);
  }

  useEffect(() => {
    getTrending();

  }, [])
  

  return (
    <>
    <div className="container my-4">
    <div className="row">
        <div className="col-md-4">
          <div className="movie-img">
             <img src={baseUrl+details.poster_path} className='img-fluid' alt="" />
          </div>
          </div>
          <div className="col-md-8">
          <div className="movie-detail">
            <h2 className='mt-3'>{details.original_title}</h2>
            <h5 className='mt-3 text-white-50'>{details.tagline}</h5>
            {details && details.genres? details.genres.map((genre,index)=>
            <button key={index} className='btn btn-info text-white mx-2 mt-3'>{genre.name}</button>
            ):''}

            <p className='mt-3'>Vote : {details.vote_average}</p>
            <p className='mt-3'>Vote Count : {details.vote_count}</p>
            <p className='mt-3'>Popularity : {details.popularity}</p>
            <p className='mt-3'>release_date : {details.release_date}</p>

            <h3 className='text-white-50 mt-4 lh-lg h5'>{details.overview}</h3>
          </div>
          </div>
       
      </div>
    </div>
    </>
  )
}

