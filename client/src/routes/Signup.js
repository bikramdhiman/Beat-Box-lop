import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie"; // this is a 'state' hook will be used for storing token in cookies

import { Icon } from "@iconify/react";

import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";

export default function SignupComponent() {
  //⭐ lets create some states to store input field datas
  const [email, setEmail] = useState(""); // empty string means initially set their values to ""
  const [confirmEmail, setConfirmEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [cookie, setCookie] = useCookies(["token"]); // use cookies state returns there 2 things
  const navigate = useNavigate(); // import this {hook} from react-router-dom to navigate from 1 route to another

  const [displayLoading, setDisplayLoading] = useState(false);

  // ERROR FIXING STEPS :-
  // console.log(email); // we can see that as we change value in email field,  the new value gets saved in value of that field
  // console.log(setEmail);

  const isValidEmail = (email) => {
    // Define the email regex pattern
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Check if the email matches the pattern
    return emailPattern.test(email);
  };

  // this fuction will run whenever 'signup' button is clicked
  const signUp = async () => {
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      username.trim() === "" ||
      firstName.trim() === "" ||
      lastName.trim() === ""
    ) {
      alert("empty fields not allowed");
      return;
    }

    // valid email check
    if (!isValidEmail(email)) {
      alert("email is not valid");
      return;
    }

    if (email !== confirmEmail) {
      // do not sign up
      alert("Email and confirm email must have same value");
      return;
    }

    setDisplayLoading(true);
    const data = { email, password, username, firstName, lastName }; // fetch the data stored in useState

    // now we have the data in json format, so lets send it to the fun 'makeUnauthenticatedPOSTRequest' which will later send it to the API at backend
    const response = await makeUnauthenticatedPOSTRequest(
      "/auth/register",
      data
    ); //

    if (response && !response.err) {
      // if we did got a response ,and response does not have a 'err' key or error key that we send in the backend code
      // user created and user credentials are stored in response
      // console.log(response);

      // lets store the token of response into cookies for authentication purpose (login)
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30); // set date to 30 days later coz we need to store cookies for 30 days only
      setCookie("token", token, { path: "/", expires: date }); // to store token in cookies we need to install "npm i react-cookie" package, using this "setCookies(key, value, {options})" we can set cookies, note: path is the cookies path where to store it
      alert("new account created");
      setDisplayLoading(false);
      navigate("/home"); // go to home page when user acc is created, used from 'useNavigate' hook state
    } else {
      setDisplayLoading(false);
      alert(response.err);
      // alert("failure");
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      {/* <div className="flex justify-center w-full p-2 border-b border-gray-300 border-solid logo ">
                <Icon icon="logos:spotify" width='130' />
            </div>      */}
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
        <div className="mb-8 text-2xl font-bold">Create New Account</div>
        <TextInput
          label="Email address"
          placeholder="Enter your email"
          className="my-3"
          value={email} // using there we are passing state 'email' as prop to the component TextInpt
          setValue={setEmail} // whever value changes it will update it
        />
        <TextInput
          label="Confirm Email address"
          placeholder="Enter your email again"
          className="my-3"
          value={confirmEmail} // storing states
          setValue={setConfirmEmail}
        />
        <PasswordInput
          label="Create Password"
          placeholder="Enter a strong password"
          className="my-3"
          value={password} // storing states
          setValue={setPassword}
        />
        <TextInput // todo: for later make sure that in the backend  we generate uniq username for each user
          label="Username"
          placeholder="Enter ur username"
          className="my-3"
          value={username} // storing states
          setValue={setUsername}
        />
        <div className="flex w-full space-x-4">
          <TextInput
            label="First Name"
            placeholder="First Name"
            className="my-3"
            value={firstName} // storing states
            setValue={setFirstName}
          />
          <TextInput
            label="Last Name"
            placeholder="Last Name"
            className="my-3"
            value={lastName} // storing states
            setValue={setLastName}
          />
        </div>

        <div className="flex justify-center w-full my-5 buttonContainer">
          {/* <button className='w-full p-3 px-10 font-semibold text-white rounded cursor-pointer bg-app-purple-light bg-opacity-70 hover:border-white' onClick={(e) => { */}
          <button
            className="w-full py-3 font-semibold text-white transition delay-100 rounded cursor-pointer bg-app-purple-light bg-opacity-70 hover:bg-opacity-90"
            onClick={(e) => {
              e.preventDefault(); // by default buttons have some default behaviour, so prevent that
              signUp(); // call the signup function when this button is clicked
            }}
          >
            SIGN UP
          </button>
        </div>
        {displayLoading ? (
          <div className="flex justify-center">
            <Icon icon="line-md:loading-twotone-loop" fontSize={35} />
          </div>
        ) : (
          <div></div>
        )}

        <div className="w-full border border-gray-300"></div>

        <div className="my-5 font-semibold">Already have an account ?</div>

        <div className="w-full py-3 text-gray-700 transition delay-100 border-2 border-gray-400 rounded cursor-pointer hover:bg-app-purple-light hover:text-white hover:bg-opacity-70 hover:border-white">
          <Link to="/login">LOG IN INSTEAD</Link>
        </div>
      </div>
    </div>
  );
}
