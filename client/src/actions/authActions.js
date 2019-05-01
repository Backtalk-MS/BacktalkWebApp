import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthToken from "../utilities/setAuthToken";
import jwt_decode from "jwt-decode";

//Register User
export const registeruser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {}//err.response.data
      })
    );
};

// Login action => JWT
export const loginuser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const JWToken = res.data.token;
      localStorage.setItem("jwtToken", JWToken);
      setAuthToken(JWToken);
      //Decode the json web token => User data
      const decoded_token = jwt_decode(JWToken);
      //Set the user based on decoded token
      dispatch(setCurrentUser(decoded_token));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set current logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//TODO: Get current logged in user