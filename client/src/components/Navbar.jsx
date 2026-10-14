import ProfileIcon from "../assets/ProfileIcon.png";
import "../styles/Navbar.css";
import {
  Button,
  useColorMode,
  Tooltip,
  Heading,
  useToast,
  Flex,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import "@fontsource/poppins";
import { Typewriter } from "react-simple-typewriter";
import { useDispatch, useSelector } from "react-redux";
import authSelector from "../redux/selectors/authSelector";
import axios from "../config/axios";
import { CiLogout } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { useRef, useState } from "react";

import Drawer from "./Drawer";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useSelector(authSelector);
  const cancelRef = useRef();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  const isMobile = useBreakpointValue({ base: true, md: false });

  const openAlert = () => setIsAlertOpen(true);
  const closeAlert = () => setIsAlertOpen(false);

  const handleLogout = () => {
    axios.post("/auth/logout").then(() => {
      dispatch(logout());
      toast({
        title: "Successfully logged out!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/login");
    });
  };

  const handleProfile = () => {
    if (!user) {
      toast({
        title: "Please log in first!",
        description: "You need to log in to view the Profile Page.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      {isMobile ? (
        <div className="navbarMobile">
          <Drawer handleProfile={handleProfile} handleLogout={handleLogout} />
        </div>
      ) : (
        <div className="navbar">
          <div className="navbarLogoSection">
            <Heading
              fontFamily="Poppins, sans-serif"
              fontSize="35px"
              className="navbarLogo"
            >
              <Typewriter
                words={["Blog App", "Bloggee"]}
                loop={false}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
              />
            </Heading>
          </div>
          <div className="navbarProfileSection">
            <Tooltip label="Create New Post" aria-label="Create New Post">
              <Button
                onClick={() => navigate("/create-post")}
                backgroundColor="#000"
                width="50px"
                height="50px"
                _hover="none"
                borderRadius="10px"
              >
                <FaPlus color="#fff" fontSize="30px" />
              </Button>
            </Tooltip>
            {user ? (
              <>
                <Tooltip
                  label="Change Color Mode"
                  aria-label="Change Color Mode"
                >
                  <Button
                    onClick={toggleColorMode}
                    height="50px"
                    variant="ghost"
                    display={{ base: "none", lg: "flex" }}
                  >
                    {colorMode === "light" ? (
                      <MdOutlineDarkMode fontSize="30px" />
                    ) : (
                      <MdOutlineLightMode fontSize="30px" />
                    )}
                  </Button>
                </Tooltip>
                <Tooltip label="My Profile" aria-label="My Profile">
                  <Link onClick={handleProfile} to="/dashboard">
                    <img
                      src={ProfileIcon}
                      className="profileImg"
                      alt="Profile"
                    />
                  </Link>
                </Tooltip>
                <Button
                  fontFamily="Poppins, sans-serif"
                  padding="25px 30px"
                  rightIcon={<CiLogout fontSize="23px" />}
                  backgroundColor="#000"
                  fontSize="18px"
                  color="#fff"
                  _hover="none"
                  className="logoutBtn"
                  onClick={openAlert}
                >
                  Logout
                </Button>
              </>
            ) : (
              <div className="lrBtnWrapper">
                <button className="registerBtn">
                  <Link className="registerLink" to="/register">
                    Register
                  </Link>
                </button>
                <button className="loginBtn">
                  <Link className="loginLink" to="/login">
                    Log In
                  </Link>
                </button>
              </div>
            )}
          </div>
          <AlertDialog
            isOpen={isAlertOpen}
            leastDestructiveRef={cancelRef}
            onClose={closeAlert}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Log Out
                </AlertDialogHeader>
                <AlertDialogBody>
                  Are you sure you want to log out?
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={closeAlert}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={handleLogout} ml={3}>
                    Log Out
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </div>
      )}
    </>
  );
}

export default Navbar;
