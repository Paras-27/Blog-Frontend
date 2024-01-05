import React, { useContext, useEffect, useState } from "react";
import "./singlepost.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";
import { Helmet } from "react-helmet";
import Spinner from "../spinner/Spinner";
import LazyLoad from "react-lazyload";
import InArticleAdComponent from "../gads/inarticle";
import MultiplexAdComponent from "../gads/multiplex";

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
  const handlePlaceholderClick = () => {
    setShowVideo(true);
  };

  return (
    <div className={`singlePost ${loading ? "spin" : ""}`}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={post.desc} data-react-helmet="true" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="category" content={categories} />
        <link rel="preload" as="image" href={post.photo} />

        {/* <!-- canonical tag --> */}
        <link
          rel="canonical"
          href={`https://gunjan-blog.netlify.app/post/${path}`}
        />

        {/* <!-- Open Graph Tags --> */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta
          property="og:url"
          content={`https://gunjan-blog.netlify.app/post/${path}`}
        />
        <meta property="og:site_name" content="Gunjan-Blog" />
        <meta
          property="article:modified_time"
          content="2023-12-14T17:59:22+00:00"
        />
        <meta name="twitter:card" content="summary_large_image" />

        <script type="application/ld+json" className="yoast-schema-graph">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            mainEntityOfPage: {
              "@type": "MusicComposition",
              "@id": `https://gunjan-blog.netlify.app/post/${path}`,
            },
            headline: title,
            image: [post.photo],
            datePublished: post.createdAt,
            dateModified: post.updatedAt,
            author: {
              "@type": "Person",
              name: "Gunjan Upadhyay",
            },
            description: desc,
            publisher: {
              "@type": "Person",
              name: "Gunjan Upadhyay",
            },
          })}
        </script>
      </Helmet>
      {loading ? ( // Render spinner when loading state is true
        <div>
          <Spinner />
        </div>
      ) : (
        <div>
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
            {showVideo ? (
              <div className="singlePostVideoLink ">
                {videoLink ? (
                  <iframe
                    className="singlePostFrame"
                    loading="lazy"
                    src={videoLink}
                    title="YouTube Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <h4>Video will be uploaded soon...</h4>
                )}
              </div>
            ) : (
              <div className="singlePostVideoLink">
                <img
                  className="singlePostFrame"
                  src={post.photo}
                  onClick={handlePlaceholderClick}
                  fetchpriority="high"
                  alt=""
                />
                <img
                  className="play-button"
                  onClick={handlePlaceholderClick}
                  src="/play-icon.svg" // Replace with the actual path to your SVG file
                  alt="Play"
                  width="90"
                  height="90"
                  fetchpriority="high"
                />
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
                        <InArticleAdComponent />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
            <div className="singleRelated related2">
              See All Related {post.categories} Here
            </div>
            {relatedPosts.length > 0 && (
              <div className="relatedPosts">
                <div className="relatedPostsContainer">
                  {relatedPosts.map((post) => (
                    <div>
                      <Link
                        to={`/post/${post.slug}`}
                        className="relatedPostLink"
                        key={post.slug}
                      >
                        <div className="related-post-image-title">
                          <div className="single-related-image">
                            <LazyLoad
                              className="relatedPostLazy"
                              offset={100}
                              once
                            >
                              <img
                                src={post.photo}
                                alt=""
                                className="relatedPostImg"
                                loading="lazy"
                                decoding="async"
                                width={286}
                                height={180}
                              />
                            </LazyLoad>
                          </div>
                          <div className="relatedPostTitle">{post.title}</div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <MultiplexAdComponent />
        </div>
      )}
    </div>
  );
};

export default SinglePost;
