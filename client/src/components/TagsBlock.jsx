import { FaHashtag } from "react-icons/fa";
import "../styles/TagsBlock.css";

function TagsBlock({ tags }) {
  return (
    <div className="tagsBlockWrapper">
      <h2 className="tagsBlockHeading">Tags</h2>
      {tags.map((tag) => (
        <div className="tagsList" key={tag}>
          <FaHashtag fontSize="20px" />
          <p>{tag}</p>
        </div>
      ))}
    </div>
  );
}

export default TagsBlock;
