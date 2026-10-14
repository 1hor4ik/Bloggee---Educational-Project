import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import authSelector from "../redux/selectors/authSelector";
import axios from "../config/axios";
import "../styles/Dashboard.css";
import ProfileIcon from "../assets/ProfileIcon.png";

function Dashboard() {
  const navigate = useNavigate();
  const { user, loading, error } = useSelector(authSelector);

  useEffect(() => {
    axios.post("/auth/verify").then((res) => {
      if (res.data.status) {
        console.log("You are registered!");
      } else {
        navigate("/");
      }
    });
  }, []);
  return (
    <>
      {user && (
        <div className="dashboardWrapper">
          <div className="profileImgWrapper">
            <img src={ProfileIcon} className="profileImage" />
          </div>
          <div className="userInfoWrapper">
            <h2 className="usernameText">{user.username}</h2>
            <p className="usernameEmail">{user.email}</p>
          </div>
        </div>
      )}
    </>
  );
}
export default Dashboard;
