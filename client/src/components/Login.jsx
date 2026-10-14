import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import BackgroundImg from "../assets/backgroundchat.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authSelector from "../redux/selectors/authSelector";
import { useToast } from "@chakra-ui/react";
import { loginUser } from "../redux/slices/authSlice";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(authSelector);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (error) {
      toast({
        title: "Log in Operation failed! Try later",
        description: "Check all the credentials",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }

    if (user) {
      navigate("/");
    }
  }, [error, user, navigate]);

  function handleLogin(e) {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    toast({
      title: "Successfuly logined!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }

  return (
    <div className="login-wrapper">
      <div className="login-container-img-wrapper">
        <div className="img-wrapper">
          <img className="bg-img" src={BackgroundImg} alt="Background" />
        </div>
        <div className="login-container">
          <h2>Login</h2>
          <form className="login-form" onSubmit={handleLogin}>
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

            <button type="submit">Login</button>

            <p className="dhave-an-account-text">
              Don't Have An Account? <a href="/register">Register</a>
            </p>
            <Link to="/forgot-password">Forgot Password?</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
