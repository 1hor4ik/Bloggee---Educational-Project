import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "../config/axios";
import "../styles/CreatePost.css";

function CreatePost() {
  const navigate = useNavigate();
  const toast = useToast();
  const inputRef = useRef(null);
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setImageUrl(data.url);
    } catch (err) {
      console.error("File upload failed:", err);
      toast({
        title: "File upload failed",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const onClickRemoveImage = () => setImageUrl("");

  const onChange = useCallback((value) => setDescription(value), []);

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Enter the text...",
      status: false,
    }),
    []
  );

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.post("/auth/verify");
        if (!data.status) navigate("/login");
      } catch {
        toast({
          title: "Error! Please log in.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        navigate("/login");
      }
    };
    verifyUser();
  }, [navigate]);

  useEffect(() => {
    if (id) {
      axios
        .get(`/posts/getOne/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setDescription(data.description);
          setImageUrl(data.image);
          setTags(data.tags.join(" "));
        })
        .catch((err) => console.error("Failed to fetch post:", err));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fields = { title, image: imageUrl, description, tags };

    try {
      if (isEditing) {
        await axios.patch(`/posts/update/${id}`, fields);
        toast({ title: "Post updated!", status: "success", duration: 2000 });
        navigate(`/posts/${id}`);
      } else {
        const { data } = await axios.post("/posts/create", fields);
        toast({ title: "Post created!", status: "success", duration: 2000 });
        navigate(`/posts/${data._id}`);
      }
    } catch (err) {
      toast({
        title: "Failed to submit post",
        description: err.message,
        status: "error",
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post">
      <h2 className="create-post-heading">
        {isEditing ? "Edit Post" : "Create a New Post"}
      </h2>
      <form className="create-post-form" onSubmit={handleSubmit}>
        <div className="add-remove-btn-section">
          <button
            type="button"
            className="create-post-btn"
            onClick={() => inputRef.current.click()}
          >
            Upload Image
          </button>
          <input
            type="file"
            id="fileInput"
            ref={inputRef}
            onChange={handleChangeFile}
          />
          {imageUrl && (
            <div className="image-preview">
              <img src={imageUrl} alt="Preview" />
              <button
                className="remove-image-btn"
                type="button"
                onClick={onClickRemoveImage}
              >
                Remove
              </button>
            </div>
          )}
        </div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Post Title"
          className="title-input"
        />
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          type="text"
          placeholder="Post Tags"
          className="tags-input"
        />
        <SimpleMDE value={description} onChange={onChange} options={options} />
        <button className="create-post-btn" type="submit" disabled={isLoading}>
          {isEditing ? "Update Post" : "Create Post"}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
