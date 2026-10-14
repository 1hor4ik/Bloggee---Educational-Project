import Post from "./Post";
import { useEffect } from "react";
import { formatDate } from "../utils/formatDate";
import { useSelector } from "react-redux";
import authSelector from "../redux/selectors/authSelector";
import "../styles/PostsList.css";

function PostsList({ posts }) {
  const userData = useSelector(authSelector);

  if (posts.length === 0) {
    return <p>No posts found</p>;
  }

  return (
    <div className="postsListWrapper">
      {posts.map((post) => {
        const isLikedByUser =
          userData?.user?.id && post.likesCount.includes(userData.user.id);

        return (
          <Post
            id={post._id}
            key={post._id}
            title={post.title}
            imageUrl={post.image}
            description={post.description}
            author={post.author}
            tags={post.tags}
            createdAt={formatDate(post.createdAt)}
            viewsCount={post.viewsCount}
            likesCount={post.likesCount.length}
            isLikedByUser={isLikedByUser}
            comments={post.comments}
            isOwner={userData?.user?.id === post?.author?._id}
          />
        );
      })}
    </div>
  );
}

export default PostsList;
