import {
  Button,
  Heading,
  Flex,
  useDisclosure,
  Drawer as ChakraDrawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  useColorMode,
  DrawerBody,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import authSelector from "../redux/selectors/authSelector";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "@fontsource/poppins";
import { Typewriter } from "react-simple-typewriter";
import { CiLogout } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { IoReorderThreeOutline } from "react-icons/io5";

function Drawer({ handleProfile, handleLogout }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useSelector(authSelector);
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  return (
    <>
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
      <Button outline="none" variant="ghost" onClick={onOpen}>
        <IoReorderThreeOutline fontSize="40px" />
      </Button>
      <ChakraDrawer
        isOpen={isOpen}
        placement="right"
        size="full"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Navigation</DrawerHeader>
          <DrawerBody>
            <Flex
              direction="column"
              height="100%"
              justifyContent="space-between"
            >
              <Flex direction="column" gap={4}>
                <Button
                  onClick={() => {
                    navigate("/");
                    onClose();
                  }}
                >
                  Home
                </Button>

                {!user ? (
                  <>
                    <Button
                      onClick={() => {
                        navigate("/login");
                        onClose();
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => {
                        navigate("/register");
                        onClose();
                      }}
                    >
                      Register
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      leftIcon={<FaPlus fontSize="20px" />}
                      onClick={() => {
                        navigate("/create-post");
                        onClose();
                      }}
                    >
                      Create Post
                    </Button>
                    <Button
                      leftIcon={<IoPersonCircleOutline fontSize="20px" />}
                      onClick={() => {
                        handleProfile();
                        onClose();
                      }}
                    >
                      My Profile
                    </Button>
                  </>
                )}
              </Flex>

              <Flex direction="column" gap={4}>
                {!user ? null : (
                  <Button
                    colorScheme="red"
                    leftIcon={<CiLogout />}
                    onClick={() => {
                      handleLogout();
                      onClose();
                    }}
                  >
                    Logout
                  </Button>
                )}
                <Button
                  leftIcon={
                    colorMode === "light" ? (
                      <MdOutlineDarkMode fontSize="30px" />
                    ) : (
                      <MdOutlineLightMode fontSize="30px" />
                    )
                  }
                  onClick={toggleColorMode}
                  variant="ghost"
                >
                  Change Mode
                </Button>
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </ChakraDrawer>
    </>
  );
}

export default Drawer;
