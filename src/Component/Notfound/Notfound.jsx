import React from 'react'
import img from '../../images/notfound.jpg'
export default function Notfound() {
  return (
    <>
      <div className="container my-5">
        <div className="img vh-100 d-flex justify-content-center align-items-center">
            <img src={img} alt="" />
        </div>
      </div>
    </>
  )
}
