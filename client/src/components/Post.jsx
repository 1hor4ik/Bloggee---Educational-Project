import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePost } from "../redux/slices/postSlice";
import axios from "../config/axios";
import "../styles/Post.css";

function Post({
  id,
  title,
  imageUrl,
  description,
  author,
  tags,
  createdAt,
  viewsCount,
  isLikedByUser,
  likesCount,
  isOwner,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const cancelRef = useRef();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [likes, setLikes] = useState(likesCount);
  const [isLiked, setIsLiked] = useState(isLikedByUser);

  const handleNavigate = () => navigate(`/posts/${id}`);

  const handleDelete = () => {
    dispatch(deletePost(id));
    toast({
      title: "Post was successfully deleted!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    setIsAlertOpen(false);
  };

  const handleLike = async () => {
    try {
      const response = await axios.patch(`/posts/like/${id}`);
      setLikes(response.data.post.likesCount.length);
      setIsLiked(true);
    } catch (err) {
      toast({
        title: "Failed To Like The Post! Try To Authorize First If You Aren't!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await axios.patch(`/posts/unlike/${id}`);
      setLikes(response.data.post.likesCount.length);
      setIsLiked(false);
    } catch (err) {
      toast({
        title:
          "Failed To Unlike The Post! Try To Authorize First If You Aren't!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const openAlert = () => setIsAlertOpen(true);
  const closeAlert = () => setIsAlertOpen(false);

  return (
    <div className="postWrapper">
      {imageUrl && <img onClick={handleNavigate} src={imageUrl} alt="Image" />}
      <div className="postAuthorArea">
        <p>@{author?.username}</p>
        <p>{createdAt}</p>
      </div>
      <h1 onClick={handleNavigate} className="postTitle">
        {title}
      </h1>
      <p onClick={handleNavigate} className="postDescription">
        {description}
      </p>
      <div className="tagsArea">
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            #{tag}
          </span>
        ))}
      </div>
      <div className="postActivityArea">
        <div className="postViewsAndLikesArea">
          <div className="postViewsCountArea">
            <FaRegEye color="#ccc" />
            <p>{viewsCount}</p>
          </div>
          <div className="postLikesCountArea">
            <Button
              onClick={isLiked ? handleUnlike : handleLike}
              variant="ghost"
              _hover="none"
              padding="0"
              margin="0"
            >
              {isLiked ? (
                <FaHeart className="heart" style={{ color: "red" }} />
              ) : (
                <CiHeart className="heart" style={{ color: "#ccc" }} />
              )}
            </Button>
            <p>{likes}</p>
          </div>
          <div className="commentArea">
            <FaRegComment color="#ccc" />
          </div>
        </div>
        {isOwner && (
          <Menu className="postsSettings">
            <MenuButton variant="outline" as={Button}>
              <BsThreeDotsVertical />
            </MenuButton>
            <MenuList
              display="flex"
              flexDirection="column"
              aria-orientation="vertical"
            >
              <MenuItem
                onClick={() => navigate(`/edit-post/${id}`)}
                icon={<CiEdit fontSize="25px" />}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={openAlert}
                icon={<MdDelete fontSize="25px" color="red" />}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
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
              Delete Post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this post? You can't undo this
              action.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeAlert}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
}

export default Post;
