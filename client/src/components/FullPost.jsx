import axios from "../config/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/FullPost.css";
import { FaRegEye } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import Markdown from "react-markdown";
import { useToast } from "@chakra-ui/react";
import { formatDate } from "../utils/formatDate";
import { io } from "socket.io-client";
import FullPostSkeleton from "./FullPostSkeleton";

function FullPost() {
  const socket = io("https://bloggee-test-app-backend.onrender.com", {
    reconnection: true,
  });
  const toast = useToast();
  const { id } = useParams();
  const [fullPostData, setFullPostData] = useState(null);
  const [fullPostLoading, setFullPostLoading] = useState(false);
  const [comment, setComment] = useState(null);
  const [realTimeComments, setRealTimeComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`posts/comment/${id}`, { comment });
      if (data.success === true) {
        setComment("");
        toast({
          title: "Comment Added Successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        socket.emit("comment", data.post.comments);
      }
    } catch (error) {
      console.log(error);
    }
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

  useEffect(() => {
    setFullPostLoading(true);
    axios
      .get(`posts/getOne/${id}`)
      .then((response) => {
        setFullPostData(response.data);
        setLikes(response.data.likesCount.length);
        setIsLiked(response.data.isLikedByUser);
      })
      .catch((error) => {
        toast({
          title: "Error While Fetching Post!",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        console.error("Error fetching post:", error);
      })
      .finally(() => setFullPostLoading(false));
  }, [id]);

  useEffect(() => {
    socket.on("new-comment", (newComment) => {
      setRealTimeComments(newComment);
    });
  }, []);

  const uiComments =
    realTimeComments.length > 0
      ? realTimeComments
      : fullPostData?.comments || [];

  return (
    <div className="fullPostPageWrapper">
      {fullPostLoading && <FullPostSkeleton />}
      <div className="fullPostWrapper">
        {fullPostData?.image ? (
          <img src={fullPostData.image} alt="Post" />
        ) : (
          <div className="imageNotFoundSection">
            <h2 className="notFoundImgText">Media File Doesn't exist</h2>
          </div>
        )}

        <h1 className="fullPostAuthor">@{fullPostData?.author.username}</h1>
        <p className="fullPostDate">{formatDate(fullPostData?.createdAt)}</p>

        <h1 className="fullPostTitle">{fullPostData?.title}</h1>
        <Markdown>{fullPostData?.description}</Markdown>

        <div className="tagsArea">
          {fullPostData?.tags.map((tag, index) => (
            <span key={index} className="tag">
              #{tag}
            </span>
          ))}
        </div>

        <div className="fullPostActivityArea">
          <div className="fullPostViewsCountArea">
            <FaRegEye color="#ccc" />
            <p>{fullPostData?.viewsCount}</p>
          </div>
          <div className="fullPostLikesCountArea">
            <button
              onClick={isLiked ? handleUnlike : handleLike}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              {isLiked ? (
                <FaHeart style={{ color: "red" }} />
              ) : (
                <CiHeart style={{ color: "#ccc" }} />
              )}
            </button>
            <p>{likes}</p>
          </div>
        </div>
      </div>
      <div className="commentariesWrapper">
        <p>Commentaries:</p>
        <div className="commentariesSection">
          {uiComments.map((uiComment, index) => (
            <div key={index} className="commentWrapper">
              <div className="profileIconWrapper">
                <img
                  src={
                    uiComment.commentedBy?.profilePic ||
                    "/images/anonymous-profile-icon.png"
                  }
                  alt="Profile"
                  className="profileIcon"
                />
              </div>
              <div className="commentContent">
                <p className="commentAuthor">
                  {uiComment.commentedBy?.username || "Anonymous"}
                </p>
                <p className="commentText">{uiComment.comment}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="writeACommentSection">
          <h2 className="writeACommentHeading">Add Your Commentary Here!</h2>
          <textarea
            onChange={(e) => setComment(e.target.value)}
            placeholder="Your Comment..."
            className="commentsTextArea"
          ></textarea>
          {comment ? (
            <button onClick={handleComment} className="writeACommentButton">
              Publish
            </button>
          ) : (
            <button disabled className="writeACommentButton">
              Publish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FullPost;
