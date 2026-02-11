import Axios from "axios";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";


export function Profile() {
  let [data, setData] = useState({});

  async function getStdDetails() {
    try {
      let token = localStorage.getItem("token");
      let res = await Axios.get("http://localhost:3000/api/std/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data.std);
    } catch (error) {
      console.log(error);
    }
  }

  let { email, name, age } = data;
  return (
    <>
      <div className="container mt-5">
        <div className="card">
          <div className="card-header">
            <h4>welcome to student hub...</h4>
          </div>
          <div className="card-body">
            <button
              className="btn btn-secondary"
              onClick={() => getStdDetails()}
            >
              Get Details
            </button>
            <div>
              <h5> MailID : {email}</h5>
              <h5> Name: {name}</h5>
              <h5> Age: {age}</h5>
            </div>

            <div className="mt-4">
              <div className="mt-3">
                
                <Link to="updatename" className='btn btn-secondary me-2'>UpdateName</Link>
                <Link to="updatepassword" className='btn btn-secondary'>UpdatePassword</Link>
                <Outlet/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
