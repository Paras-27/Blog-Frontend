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

  const isMultipleOf3 = (number) => number % 2 === 0;

  return (
    <div className={`singlePost ${loading ? "spin" : ""}`}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={post.desc} data-react-helmet="true" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
              name: post.username,
            },
            description: post.desc,
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
            <div className="singlePostVideoLink ">
              <iframe
                className="singlePostFrame"
                src={videoLink}
                title="YouTube Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
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
            <div className="singleRelated related2">
              See All Related {post.categories} Here
            </div>
            {relatedPosts.length > 0 && (
              <div className="relatedPosts">
                <div className="relatedPostsContainer">
                  {relatedPosts.map((post, index) => (
                    <div>
                      <Link
                        to={`/post/${post.slug}`}
                        className="relatedPostLink"
                        key={post.slug}
                      >
                        <div className="related-post-image-title">
                          <div className="single-related-image">
                            <img
                              src={post.photo}
                              alt=""
                              className="relatedPostImg"
                              width={286}
                              height={180}
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
