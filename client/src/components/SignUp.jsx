import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css";
import BackgroundImg from "../assets/backgroundchat.jpg";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { useToast } from "@chakra-ui/react";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister(e) {
    e.preventDefault();

    try {
      dispatch(registerUser({ username, email, password }));

      toast({
        title: "Successfully registered!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      navigate("/login");
    } catch (error) {
      toast({
        title: "Registration failed! Please try again later.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  return (
    <div className="sign-up-wrapper">
      <div className="sign-up-container-img-wrapper">
        <div className="sign-up-container">
          <h2 className="sign-up-heading">Sign Up</h2>
          <form className="sign-up-form" onSubmit={handleRegister}>
            <label htmlFor="username">Username</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username..."
            />

            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email..."
            />

            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password..."
            />

            <button className="sign-up-btn" type="submit">
              Sign Up
            </button>

            <p className="have-an-account-text">
              Already Have An Account? <a href="/login">Login</a>
            </p>
          </form>
        </div>
        <div className="img-wrapper">
          <img className="bg-img" src={BackgroundImg} alt="Background" />
        </div>
      </div>
    </div>
  );
}
export default SignUp;
