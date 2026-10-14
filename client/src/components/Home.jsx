import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postSelector, tagsSelector } from "../redux/selectors/postSelector";
import PostsList from "./PostsList";
import TagsBlock from "./TagsBlock";
import TagsBlockSkeleton from "./TagsBlockSkeleton";
import PostSkeleton from "./PostSkeleton";
import ScrollToTop from "react-scroll-to-top";
import SearchBar from "./SearchBar";
import { getAllPosts, getLatestTags } from "../redux/slices/postSlice";
import "../styles/Home.css";

function Home() {
  const dispatch = useDispatch();
  const posts = useSelector(postSelector);
  const tags = useSelector(tagsSelector);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("newest");
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getLatestTags());
  }, [dispatch]);

  const handleSearch = (val) => {
    setSearch(val);
  };

  const handleSort = (type) => {
    setSortType(type);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const filteredPosts = Array.isArray(posts.posts.items)
    ? posts.posts.items
        .filter((post) =>
          post.title.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
          if (sortType === "newest") {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
          if (sortType === "popular") {
            return b.viewsCount - a.viewsCount;
          }
          return 0;
        })
    : [];

  return (
    <div className="homeWrapper">
      <ScrollToTop
        smooth
        color="#000"
        style={{
          backgroundColor: "#fff",
          borderRadius: "20%",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "opacity 0.3s ease-in-out",
          opacity: showScroll ? 1 : 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
        }}
      />
      <Navbar />
      <SearchBar onSearch={handleSearch} />
      <div className="sortButtons">
        <button
          className={sortType === "newest" ? "active" : ""}
          onClick={() => handleSort("newest")}
        >
          Newest
        </button>
        <button
          className={sortType === "popular" ? "active" : ""}
          onClick={() => handleSort("popular")}
        >
          Most Popular
        </button>
      </div>
      <div className="contentWrapper">
        {posts.posts.status === "loading" && (
          <div className="skeletonWrapper">
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </div>
        )}
        {posts.posts.status === "loaded" && (
          <div className="postsSection">
            <PostsList posts={filteredPosts} />
          </div>
        )}
        <div className="tagsSection">
          {tags.status === "loading" && (
            <div className="skeletonWrapper">
              <TagsBlockSkeleton />
            </div>
          )}
          {tags.status === "loaded" && <TagsBlock tags={tags.items} />}
        </div>
      </div>
      <div className="authors-tag-block">
        <h2>Bloggee</h2>
        <p>
          <span>&copy;</span>Copyright. All rights are reserved
        </p>
        <p>Lysak Ihor | &#127482;&#127462;</p>
      </div>
    </div>
  );
}

export default Home;
