import { useContext, useRef, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import validatePassword from "../../validation/PasswordValidation";
import { AuthContext } from "../../provider/AuthProvider";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const {
    loginUser,
    signInWithGoogle,
    signInWithFacebook,
    logOut,
    resetPassword,
  } = useContext(AuthContext);
  const navigateToHomePage = useNavigate();
  const emailRef = useRef(null);

  //login
  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    const remember = form.get("remember");
    console.log(email, password, remember);
    // Password validation
    if (!validatePassword(password, !null, setRegisterError)) {
      return; // Stop execution if the password is not valid
    }

    // Sign in a user with an email address and password
    loginUser(email, password)
      .then((result) => {
        console.log(result.user);
        if (result.user.emailVerified) {
          setSuccess("You have successfully login");
          navigateToHomePage("/");
          // If "remember me" is checked, store the token in local storage
          if (remember) {
            localStorage.setItem("token", result.user.accessToken);
          } else {
            // Otherwise, store it in session storage
            sessionStorage.setItem("token", result.user.accessToken);
          }
        } else {
          alert("Please Check your email for verifi your account ");
          logOut();
        }
      })
      .catch((error) => {
        console.log(error.message);
        setRegisterError(error.message);
      });
  };
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        setSuccess("You have Successfully Login with google");
        navigateToHomePage("/");
      })
      .catch((error) => {
        console.log(error.message);
        setRegisterError(error.message);
      });
  };
  //facebook login
  const handleFacebookLogin = () => {
    signInWithFacebook()
      .then((result) => {
        console.log(result.user);
        setSuccess("You have Successfully Login with Facebook");
        navigateToHomePage("/");
      })
      .catch((error) => {
        console.log(error.message);
        setRegisterError(error.message);
      });
  };
  //forgot password
  const handleForgotPassword = () => {
    const email = emailRef.current.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      setRegisterError("Please Provide an email");
      return;
    } else if (!emailRegex.test(email)) {
      setRegisterError("Please write a valid email");
      return;
    }
    //send password reset email
    resetPassword(email)
      .then(() => {
        alert("Check Your email for forget Password");
      })
      .catch((error) => {
        setRegisterError(error.message);
      });
  };
  return (
    <div className="max-w-md mx-auto min-h-screen">
      <div className="border max-w-md mx-auto mt-10 rounded-lg shadow bg-slate-50 border border-2">
        <h3 className="capitalize font-bold text-lg px-8 pt-6">login</h3>
        <form onSubmit={handleLogin}>
          <div className="px-8 py-5">
            <input
              type="email"
              name="email"
              id=""
              placeholder="Username or email"
              className="w-full bg-slate-50 outline-none px-2 pb-2 pt-4 rounded focus:border-y border-blue-300"
              ref={emailRef}
              required
            />

            <hr className="border-1 ml-2"></hr>
          </div>
          <div className="px-8 pb-6">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id=""
                placeholder="Password"
                required
                className="w-full bg-slate-50 outline-none px-2 pb-2 pt-4 rounded focus:border-y border-blue-300"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-2 text-2xl"
              >
                {showPassword ? <IoEye></IoEye> : <IoEyeOff></IoEyeOff>}
              </span>
            </div>

            <hr className="border-1 ml-2"></hr>
          </div>
          <div className="px-8 pb-5 flex justify-between text-xs">
            <div className="flex">
              <input type="checkbox" name="remember" id="" />
              <span className="capitalize ml-2">remember me</span>
            </div>
            <button
              onClick={handleForgotPassword}
              className="capitalize underline text-orange-400"
            >
              forgot password
            </button>
          </div>
          <div className="px-8 py-5">
            <input
              className="btn bg-orange-400 w-full hover:bg-orange-500"
              type="submit"
              value="Login"
            />
          </div>
        </form>
        <p className="text-center text-xs pb-6">
          {"Don't have an account? "}
          <Link to={"/register"} className="underline text-orange-400">
            Create an account
          </Link>
        </p>
        {registerError && (
          <p className="mx-8 bg-amber-100 text-amber-600 rounded p-2 mb-3">
            {registerError}
          </p>
        )}
        {success && (
          <p className="mx-8 bg-blue-100 text-blue-600 rounded p-2 mb-3">
            {success}
          </p>
        )}
      </div>
      <div className="flex items-center justify-center mt-6">
        <span className="border border-t-2 w-40"></span>
        <span className="mx-3 capitalize">or</span>
        <span className="border border-t-2 w-40"></span>
      </div>
      <div
        onClick={handleFacebookLogin}
        className="max-w-sm mt-3 mx-auto p-2 border flex items-center rounded-full cursor-pointer hover:bg-blue-100"
      >
        <FaFacebook className="text-blue-600 text-3xl"></FaFacebook>
        <span className="text-sm ml-24">Continue with Facebook</span>
      </div>
      <div
        onClick={handleGoogleLogin}
        className="max-w-sm mt-2 mb-3 mx-auto p-2 border flex items-center rounded-full cursor-pointer hover:bg-blue-100"
      >
        <FcGoogle className="text-blue-600 text-3xl"></FcGoogle>
        <span className="text-sm ml-24">Continue with Google</span>
      </div>
    </div>
  );
};

export default Login;
