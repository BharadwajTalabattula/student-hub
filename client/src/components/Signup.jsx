
import React, { useReducer } from "react";
import Axios from 'axios';

export function Signup() {
  const initialState = {
    name: "",
    email: "",
    password: "",
    age: "",
    role: "",
  };

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "CHANGE_FIELD":
        return { ...state, [action.payload.name]: action.payload.value };
        case 'RESET':
        return initialState;

      default:
        return state;
    }
  }, initialState);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_FIELD",
      payload: {
        name: e.target.name,
        value: e.target.value,
      },
    });
  };

  async function submitForm(e) {
    e.preventDefault();

    try {
        const res = await Axios.post(
          "http://localhost:3000/api/std/signup",
          state
        );
    
        alert(res.data.message);
        console.log("Success:", res.data);
         dispatch({ type: "RESET"})
    
    
       

      } catch (error) {
        console.error("Axios error:", error);
    
        alert(
          error.response?.data?.message ||
          error.message ||
          "Something went wrong"
        );
        dispatch({ type: "RESET"})
      }
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-4 m-auto">
          <div className="card">
            <div className="card-header">
              <h4>Signup Form</h4>
            </div>
            <div className="card-body">
              <form onSubmit={(e) => submitForm(e)}>
                <label>Email </label>
                <input
                  className="w-100"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={state.email}
                  onChange={handleChange}
                  name="email"
                />
                <br></br>
                <br></br>
                <label>Name </label>
                <input
                  className="w-100"
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={state.name}
                  onChange={handleChange}
                  name="name"
                />
                <br></br>
                <br></br>
                <label>Password </label>
                <input
                  className="w-100"
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={state.password}
                  onChange={handleChange}
                  name="password"
                />
                <br></br>
                <br></br>
                <label>age </label>
                <input
                  className="w-100"
                  type="number"
                  required
                  placeholder="Enter your age"
                  value={state.age}
                  onChange={handleChange}
                  name="age"
                />
                <br></br>
                <br></br>
                <label>role </label>
                <input
                  className="w-100"
                  type="text"
                  required
                  placeholder="std"
                  value={state.role}
                  onChange={handleChange}
                  name="role"
                />
                <br></br>
                <br></br>
                <input
                  className="btn bg-secondary text-white w-100"
                  type="submit"
                  required
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
