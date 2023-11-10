import React from 'react';
import './SCSS/LoginPage.scss';

export default function LoginPage() {
  return (
    <>
    <div className="container-fluid login">
      <form className="container">
        <h2 className="h2">Login to your Blogger Account!</h2>
        <div className="row d-flex justify-content-center">
          <div className="col-7">
            <input
              type="text"
              className=" form-control"
              placeholder="UserName"
            />
          </div>
        
        
          <div className="col-7">
            <input
              type="password"
              className=" form-control"
              placeholder="Password"
          
            />
          </div>
       
          <div className="col-12 text-center">
            <button type="submit">Login</button>
          </div>
        </div>
      </form>
    </div>
  </>
  )
}
