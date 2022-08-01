import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';


export default function PeopleDetails() {
  let baseUrl='https://image.tmdb.org/t/p/original/';
  let[search,useSearch]=useSearchParams()
  let currentId=search.get('id');
  let [peopleDetails,setPeopleDetails]=useState([]);

  async function getTrending()
  {
  let {data}=await axios.get(`https://api.themoviedb.org/3/person/${currentId}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US`)
  setPeopleDetails(data);
  }

  useEffect(() => {
    getTrending();

  }, [])


  return (
    <> 
    <div className="container my-4">
      <div className="row">
        <div className="col-md-4">
          <img src={baseUrl+peopleDetails.profile_path} className='img-fluid' alt="" />
        </div>

        <div className="col-md-8">
             <div className="people">
              <h2>{peopleDetails.name}</h2>
              <p><span className='text-muted mt-3'>Birthday: </span> {peopleDetails.birthday}</p>
              <p><span className='text-muted mt-3'>Place of birthday: </span> {peopleDetails.place_of_birth}</p>
              <p><span className='text-muted mt-3'>popularity: </span> {peopleDetails.popularity}</p>

              <p><span className='text-muted mt-3'>biography: </span> <br />
              {peopleDetails.biography}</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
