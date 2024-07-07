import { useContext, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import validatePassword from "../../validation/PasswordValidation";
import { AuthContext } from "../../provider/AuthProvider";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const { createUser, signInWithGoogle, signInWithFacebook } =
    useContext(AuthContext);

  const navigateToHomePage = useNavigate();

  //register
  const handleRegister = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const firstName = form.get("firstName");
    const lastName = form.get("lastName");
    const email = form.get("email");
    const password = form.get("password");
    const confrimPassword = form.get("confrimPassword");
    const accepted = form.get("terms");
    console.log(
      firstName,
      lastName,
      email,
      password,
      confrimPassword,
      accepted
    );
    // Password validation
    if (!validatePassword(password, accepted, setRegisterError)) {
      return; // Stop execution if the password is not valid
    }

    //password match
    if (password !== confrimPassword) {
      setRegisterError("Your Passwords do not match");
      return;
    }
    //Create a password-based account
    createUser(email, password)
      .then((result) => {
        //reset data
        e.target.reset();

        console.log(result.user);
        setSuccess("You have Successfully Create An Account");
        navigateToHomePage("/");

        //Update a user's profile
        updateProfile(result.user, {
          displayName: "Sajal Hossain",
          photoURL: "https://example.com/jane-q-user/profile.jpg",
        }).then(() => {
          console.log("Profile Updated");
        });

        //Send a user a verification email
        sendEmailVerification(result.user).then(() => {
          alert("Please Check your email for verifi your account ");
        });
      })
      .catch((error) => {
        console.log(error.message);
        setRegisterError(error.message);
      });
  };
  //google login
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        setSuccess("You have Successfully Login with google");
        navigateToHomePage("/");
      })
      .catch((error) => {
        console.error(error);
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
        console.error(error);
        setRegisterError(error.message);
      });
  };
  return (
    <div className="max-w-md mx-auto min-h-screen">
      <ToastContainer />
      <div className="border max-w-md mx-auto mt-10 rounded-lg shadow bg-slate-50 border border-2">
        <h3 className="capitalize font-bold text-lg px-8 pt-6 pb-3">
          create an account
        </h3>
        <form onSubmit={handleRegister}>
          <div className="px-8 py-2">
            <input
              type="text"
              name="firstName"
              id=""
              required
              placeholder="First Name"
              className="w-full bg-slate-50 outline-none px-2 pb-2 pt-4 rounded focus:border-y border-blue-300"
            />

            <hr className="border-1 ml-2"></hr>
          </div>
          <div className="px-8 py-2">
            <input
              type="text"
              name="lastName"
              id=""
              required
              placeholder="Last Name"
              className="w-full bg-slate-50 outline-none px-2 pb-2 pt-4 rounded focus:border-y border-blue-300"
            />

            <hr className="border-1 ml-2"></hr>
          </div>
          <div className="px-8 py-2">
            <input
              type="email"
              name="email"
              required
              id=""
              placeholder="Username or email"
              className="w-full bg-slate-50 outline-none px-2 pb-2 pt-4 rounded focus:border-y border-blue-300"
            />

            <hr className="border-1 ml-2"></hr>
          </div>
          <div className="px-8 py-2">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id=""
                required
                placeholder="Password"
                className="w-full bg-slate-50 outline-none px-2 pb-2 pt-4 rounded focus:border-y border-blue-300"
              />
              <span
                className="absolute top-3 right-2 text-2xl"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEye /> : <IoMdEyeOff />}
              </span>
            </div>

            <hr className="border-1 ml-2"></hr>
          </div>
          <div className="px-8 py-2">
            <div className="relative">
              <input
                type={showCPassword ? "text" : "password"}
                name="confrimPassword"
                id=""
                required
                placeholder="Confrim Password"
                className="w-full bg-slate-50 outline-none px-2 pb-2 pt-4 rounded focus:border-y border-blue-300"
              />
              <span
                onClick={() => setShowCPassword(!showCPassword)}
                className="absolute top-3 right-2 text-2xl"
              >
                {showCPassword ? <IoEye></IoEye> : <IoMdEyeOff></IoMdEyeOff>}
              </span>
            </div>

            <hr className="border-1 ml-2"></hr>
          </div>
          <div className="px-8 py-2">
            <input type="checkbox" name="terms" id="" />
            <span className="ml-2 capitalize">
              accept our terms and conditions
            </span>
          </div>
          <div className="px-8 py-6">
            <input
              className="btn bg-orange-400 w-full hover:bg-orange-500"
              type="submit"
              value="Create an Account"
            />
          </div>
        </form>
        <p className="text-center text-xs  pb-6">
          {"Already have an account? "}
          <Link to={"/login"} className="underline text-orange-400">
            Login
          </Link>
        </p>
        {registerError && (
          <p className="bg-amber-100 rounded mx-8 mb-3 p-2 text-amber-600">
            {registerError}
          </p>
        )}
        {success && (
          <p className="bg-blue-100 rounded mx-8 mb-3 p-2 text-blue-600">
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

export default Register;
