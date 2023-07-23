import React, { useContext, useEffect, useState } from "react";
import "./singlepost.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";
import { Helmet } from "react-helmet";
import Spinner from "../spinner/Spinner";

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState("");
  const [categories, setCat] = useState([]);
  const [videoLink, setVideoLink] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/posts/` + path
        );
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
        setCat(res.data.categories);
        setPhoto(res.data.photo);
        setVideoLink(res.data.videoLink);
        setLoading(false); // Set loading state to false when data is fetched
      } catch (err) {
        window.location.replace("/not-found");
      }
    };
    getPost();
  }, [path]);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API}/posts`);
      const related = res.data.filter(
        (post) => post.categories.includes(categories[0]) && post.slug !== path
      );
      setRelatedPosts(related);
    };
    fetchRelatedPosts();
  }, [categories, path]);

  useEffect(() => {
    const homeDiv = document.getElementById("singlePost");
    if (!loading && homeDiv) {
      homeDiv.classList.remove("spin");
    }
  }, [loading]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API}/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API}/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
        categories,
        photo,
        videoLink,
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className={`singlePost ${loading ? "spin" : ""}`}>
      {loading ? ( // Render spinner when loading state is true
        <div>
          <Spinner />
        </div>
      ) : (
        <div>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={post.desc} />
            <meta name="robots" content="index, follow" />
          </Helmet>
          <div className="singlePostWrapper">
            {updateMode && (
              <input
                type="text"
                value={videoLink}
                className="singlePostLink"
                onChange={(e) => setVideoLink(e.target.value)}
              />
            )}
            {updateMode && (
              <input
                type="text"
                value={photo}
                className="singlePostImgInput"
                onChange={(e) => setPhoto(e.target.value)}
              />
            )}
          </div>
          <div className="singleImgWrapper">
            {post.photo && (
              <img src={post.photo} alt="" className="singlePostImg"></img>
            )}
          </div>
          <div className="singlePostWrapper">
            {updateMode ? (
              <input
                type="text"
                value={title}
                className="singlePostTitleInput"
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
              />
            ) : (
              <h1 className="singlePostTitle">
                {title}
                {user?.role && (
                  <div className="singlePostEdit">
                    <FaEdit
                      className="singlePostIcon"
                      onClick={() => setUpdateMode(true)}
                    />
                    <FaTrash
                      className="singlePostIcon"
                      onClick={handleDelete}
                    />
                  </div>
                )}
              </h1>
            )}
            <div className="singlePostInfo">
              <span className="singlePostAuthor">
                Author :
                <Link className="link" to={`/?user=${post.username}`}>
                  <b>{post.username}</b>
                </Link>
              </span>
              <span className="singlePostDate">
                {new Date(post.createdAt).toDateString()}
              </span>
            </div>
            {updateMode ? (
              <input
                type="text"
                value={categories}
                className="singlePostTitleInput"
                onChange={(e) => setCat(e.target.value)}
              />
            ) : (
              <div className="singlePostCats">Category : {categories}</div>
            )}
            {updateMode ? (
              <textarea
                className="singlePostDescInput"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            ) : (
              <p className="singlePostDesc">{desc}</p>
            )}
            <div className="singlePostVideoLink">
              {videoLink && (
                <iframe
                  className="singlePostFrame"
                  src={videoLink}
                  title="YouTube Video"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              )}
            </div>
            {updateMode && (
              <button className="singlePostDesc" onClick={handleUpdate}>
                Update
              </button>
            )}
            {relatedPosts.length > 0 && (
              <div className="relatedPosts">
                <h3>Related Posts</h3>
                <div className="relatedPostsContainer">
                  {relatedPosts.map((post) => (
                    <Link
                      to={`/post/${post.slug}`}
                      className="relatedPostLink"
                      key={post.slug}
                    >
                      <img src={post.photo} alt="" className="relatedPostImg" />
                      <div className="relatedPostTitle">{post.title}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
