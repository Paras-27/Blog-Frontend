// write.js
import React, { useContext, useState, useEffect } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { Helmet } from "react-helmet";

const Write = () => {
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [desc, setDesc] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [categories, setCat] = useState([]);
  const { user } = useContext(Context);
  const [cats, setCats] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("Categories");

  useEffect(() => {
    const savedContent = localStorage.getItem("writeContent");
    if (savedContent) {
      const { title, photo, desc, videoLink, categories } =
        JSON.parse(savedContent);
      setTitle(title);
      setPhoto(photo);
      setDesc(desc);
      setVideoLink(videoLink);
      setCat(categories);
    }
    const getCats = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API}/categories`);
      setCats(res.data);
    };
    getCats();
  }, []);

  const handleSaveContent = () => {
    const content = JSON.stringify({
      title,
      photo,
      desc,
      videoLink,
      categories,
    });
    localStorage.setItem("writeContent", content);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSaveContent(); // Save content before submitting

    const newPost = {
      username: user.username,
      title,
      desc,
      categories: selectedCategories,
      photo,
      videoLink,
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/posts`,
        newPost
      );
      localStorage.removeItem("writeContent");
      window.location.replace("/post/" + res.data.slug);
    } catch (err) {
      // Handle error
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    handleSaveContent();
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.value);
    handleSaveContent();
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
    handleSaveContent();
  };

  const handleVideoLinkChange = (e) => {
    setVideoLink(e.target.value);
    handleSaveContent();
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategories(categoryName);
  };

  return (
    <div className="write" onSubmit={handleSubmit}>
      <Helmet>
        <title>Write</title>
        <meta name="description" content="" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      {photo && <img className="writeImg" src={photo} alt="" />}
      <form className="writeForm">
        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Image Url"
            id="fileInput"
            className="writeInput"
            value={photo}
            onChange={handlePhotoChange}
          />
        </div>
        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="VideoLink"
            className="writeInput"
            value={videoLink}
            onChange={handleVideoLinkChange}
          />
        </div>

        <div className="writeFormGroup">
          <div className="dropdown">
            <button
              className="writeInput togg dropdown-toggle"
              type="button"
              id="categoryDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {selectedCategories}
            </button>
            <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
              {cats.map((c, index) => (
                <li key={index}>
                  <div
                    className={`categoryItem ${
                      selectedCategories === c.name ? "selected" : ""
                    }`}
                    onClick={() => handleCategoryClick(c.name)}
                  >
                    {c.name}{" "}
                    {selectedCategories === c.name && <span>(Selected)</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            value={desc}
            onChange={handleDescChange}
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
