import React, { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

const Write = () => {
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [desc, setDesc] = useState("");
  const [categories, setCat] = useState([]);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories,
      photo,
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/posts`,
        newPost
      );
      console.log(res);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  return (
    <div className="write" onSubmit={handleSubmit}>
      {photo && <img className="writeImg" src={photo} alt="" />}
      <form className="writeForm">
        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Image Url"
            id="fileInput"
            className="writeInput"
            onChange={(e) => setPhoto(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Category"
            className="writeInput"
            onChange={(e) => setCat(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default Write;
