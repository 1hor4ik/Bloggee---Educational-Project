import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "../config/axios";
import "../styles/SignUp.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/auth/forgot-password", {
        email,
      })
      .then((res) => {
        if (res.data.status) {
          alert("Email was sent! Check your email");
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="sign-up-wrapper">
      <div className="sign-up-container">
        <h2 className="sign-up-heading">Forgot Password?</h2>
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email..."
          />

          <button className="sign-up-btn" type="submit">
            Send Reset Code On Email
          </button>
        </form>
      </div>
    </div>
  );
}
export default ForgotPassword;
