import React, { useContext, useEffect, useState } from "react";
import "./singlepost.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState("");
  const [categories, setCat] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API}/posts/` + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setCat(res.data.categories);
      setPhoto(res.data.photo);
    };
    getPost();
  }, [path]);

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
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={post.photo} alt="" className="singlePostImg"></img>
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
                <FaTrash className="singlePostIcon" onClick={handleDelete} />
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
        {updateMode && (
          <button className="singlePostDesc" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
