import React, { useContext, useEffect, useState } from "react";
import "./singlepost.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";
import { Helmet } from "react-helmet";
import Spinner from "../spinner/Spinner";
// import LazyLoad from "react-lazyload";
import AdComponent from "../gads/gadscomp";

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
  const [showVideo, setShowVideo] = useState(false);

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
      const res = await axios.get(`${process.env.REACT_APP_API}/posts`, {
        params: { cat: categories, slug: path },
      });
      setRelatedPosts(res.data);
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

  const handlePlaceholderClick = () => {
    setShowVideo(true);
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

  const isMultipleOf3 = (number) => number % 2 === 0;

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
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Helmet>
          <div className="singlePostWrapper">
            {updateMode && (
              <input
                type="text"
                value={videoLink}
                className="singlePostLink"
                placeholder="Add Video Link"
                onChange={(e) => setVideoLink(e.target.value)}
              />
            )}
            {updateMode && (
              <input
                type="text"
                value={photo}
                className="singlePostImgInput"
                placeholder="Add Image Link"
                onChange={(e) => setPhoto(e.target.value)}
              />
            )}
          </div>
          <div className="singleImgWrapper">
            {post.photo && (
              <div className="single-post-image">
                <img className="singlePostImg" src={post.photo} alt="" />
              </div>
            )}
          </div>
          <div className="singlePostWrapper">
            {updateMode ? (
              <input
                type="text"
                value={title}
                className="singlePostTitleInput"
                autoFocus
                placeholder="Add Post Title"
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
              <div className="singlePostCats">
                Category :
                <Link className="link" to={`/?cat=${post.categories}`}>
                  <b>{post.categories}</b>
                </Link>
              </div>
            )}
            {updateMode && (
              <button className="singlePostDesc" onClick={handleUpdate}>
                Update
              </button>
            )}
            {updateMode ? (
              <textarea
                className="singlePostDescInput"
                value={desc}
                placeholder="Update the Post"
                onChange={(e) => setDesc(e.target.value)}
              />
            ) : (
              <div className="singlePostDesc">
                {desc.split(/\n\n/).map((paragraph, index) => (
                  <React.Fragment key={index}>
                    <p className="descpara singlePostDesc">{paragraph}</p>
                    {index % 2 === 1 && (
                      <div className="googleAdContainer">
                        <AdComponent />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
            <div className="singleRelated related">
              Listen To The Bhajan Here
            </div>
            <div className="singlePostVideoLink">
              {showVideo ? (
                <iframe
                  className="singlePostFrame"
                  loading="lazy"
                  src={videoLink}
                  title="YouTube Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="center-container">
                  <div className="single-post-youtube">
                    <img
                      className="single-post-youtube-img"
                      src={post.photo} // Replace with the URL of your placeholder image
                      alt="Video Placeholder"
                    />
                    <img
                      className="play-button"
                      onClick={handlePlaceholderClick}
                      src="/play-icon.svg" // Replace with the actual path to your SVG file
                      alt="Play"
                      width="90"
                      height="90"
                    />
                  </div>
                </div>
              )}
            </div>
            {relatedPosts.length > 0 && (
              <div className="relatedPosts">
                <div
                  className="singleRelated related2"
                  style={{ margin: "10px 0px 40px 0px" }}
                >
                  See All Related {post.categories} Here
                </div>
                <div className="relatedPostsContainer">
                  {relatedPosts.map((post, index) => (
                    <div>
                      <Link
                        to={`/post/${post.slug}`}
                        className="relatedPostLink"
                        key={post.slug}
                      >
                        <div>
                          <div className="single-related-image">
                            <img
                              src={post.photo}
                              alt=""
                              className="relatedPostImg"
                              width={286}
                              height={160}
                            />
                          </div>
                          <div className="relatedPostTitle">{post.title}</div>
                        </div>
                      </Link>
                      <div className="googleAdContainer none">
                        {isMultipleOf3(index + 1) && <AdComponent />}
                      </div>
                    </div>
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
