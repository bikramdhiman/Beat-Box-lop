import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import ReactDOM from 'react-dom';

import { Icon } from "@iconify/react";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers"; // necessary for making call to the APIs at backend
import { useCookies } from "react-cookie"; // necessary to access token from cookies

import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";

export default function LoginComponent() {
  //⭐ lets create some states to store input field's data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [cookie, setCookie] = useCookies(["token"]); // state for cookies
  const navigate = useNavigate(); // state for navigation i.e for eg to navigate to home page ones user is logged in successfully

  const [displayLoading, setDisplayLoading] = useState(false);

  // this fuction will run whenever 'login' button is clicked
  const login = async () => {
    if (email.trim() === "" || password.trim() === "") {
      alert("fields should not be empty");
      return;
    }
    setDisplayLoading(true);
    const data = { email, password }; // fetch the data stored in useState

    // now we have the data in json format, so lets send it to the fun 'makeUnauthenticatedPOSTRequest' which will later send it to the API at backend
    const response = await makeUnauthenticatedPOSTRequest("/auth/login", data); //
    setDisplayLoading(true);

    if (response && !response.err) {
      // if we did got a response ,and response does not have a 'err' key or error key that we send in the backend code
      // user exists and user credentials are stored in response (sent by the backend api of /auth/login)
      // console.log(response);

      // lets store the token of user into cookies for smooth authentication purpose (login)
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30); // set date to 30 days later coz we need to store cookies for 30 days only
      setCookie("token", token, { path: "/", expires: date }); // to store token in cookies we need to install "npm i react-cookie" package, using this "setCookies(key, value, {options})" we can set cookies, note: path is the cookies path where to store it
      alert("log in successful");
      setDisplayLoading(false);
      navigate("/home"); // go to home page when user acc is created, used from 'useNavigate' hook state
    } else {
      setDisplayLoading(false);
      alert(response.err);
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="flex justify-center w-full p-2 space-x-5 border border-gray-300 bg-app-purple bg-opacity-5 border-app-purple-80 logo ">
        {/* <Icon icon="logos:spotify" width='130' /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            fill="#050516"
            d="M18.65.226A16 16 0 0 0 16 0C7.16 0 0 7.16 0 16c0 3.394 1.067 6.53 2.86 9.131c1.1-1.616 3.637-2.731 6.578-2.731c2.02 0 3.847.533 5.156 1.39zm8.502 4.315c2.763 6.11.339 9.374.339 9.374c-1.875-5.64-7.305-6.464-7.305-6.464s-3.572 19.248-3.572 19.49c0 2.085-2.214 3.847-5.22 4.38A16.01 16.01 0 0 0 16 32c8.84 0 16-7.16 16-16c0-4.493-1.859-8.55-4.848-11.459"
          />
        </svg>
        <div className="flex items-center justify-center text-2xl font-bold text-app-purple-light">
          GrooveUp
        </div>
      </div>

      <div className="w-1/3 py-10 inputRegion ">
        {/* will have 2 inputs email and pass and have my signup button */}
        <div className="mb-8 font-bold">Log In Here</div>
        <TextInput
          label="Email ID or username"
          placeholder="Email ID or username"
          className="my-3"
          value={email}
          setValue={setEmail}
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          className="my-3"
          value={password}
          setValue={setPassword}
        />
        <div className="flex justify-end w-full my-5 buttonContainer">
          <button
            className="w-full px-10 py-3 font-semibold text-white transition delay-100 rounded bg-app-purple-light bg-opacity-70 hover:bg-opacity-90"
            onClick={(e) => {
              e.preventDefault(); // by default form buttons have some default behaviour, so this is how we prevent that
              login(); // call login function when one clicks the button
            }}
          >
            LOG IN
          </button>
        </div>

        <div className="w-full border border-gray-300"></div>

        <div className="my-5 font-semibold">Don't have an account ?</div>

        <div className="w-full py-3 text-gray-700 transition delay-100 border-2 border-gray-400 rounded cursor-pointer hover:bg-app-purple-light hover:text-white hover:bg-opacity-80 hover:border-white">
          <Link to="/signup">
            {" "}
            {/* note : anchor is not efficient, link is efficient as it will load only those components that are changed, those unchanged will not be reloaded */}
            Create New Account
          </Link>
        </div>
        {displayLoading ? (
          <div className="flex justify-center pt-5">
            <Icon icon="line-md:loading-loop" fontSize={40} />
          </div>
        ) : (
          <div className="flex justify-center pt-5">
            {/* <Icon icon="line-md:loading-loop"  fontSize={40}/> */}
          </div>
        )}
      </div>
    </div>
  );
}
