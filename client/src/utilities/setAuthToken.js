import axios from "axios";

const setAuthToken = token => {
  if (token) {
    //Attach to all reqeusts
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //Remove authorization header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
