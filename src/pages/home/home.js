import React, { useEffect, useState } from "react";
import "./home.css";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AiOutlineReload } from "react-icons/ai";
import Spinner from "../../components/spinner/Spinner";
import Pagenotfound from "../Notfound/Pagenotfound";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  const [Button, setButton] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    getTotal();
  }, []);

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  //get all posts
  const fetchPosts = async () => {
    try {
      let res;
      if (search.length) {
        setButton(false);
        res = await axios.get(`${process.env.REACT_APP_API}/posts` + search);
        console.log(`${process.env.REACT_APP_API}/posts` + search);
        if (res.data.length === 0) {
        }
      } else {
        setButton(true);
        if (page === 1) {
          setPosts([]);
        }
        res = await axios.get(
          `${process.env.REACT_APP_API}/posts/post-list/${page}`
        );
      }
      setPosts(res.data);
      setLoading(false); // Set loading state to false when data is fetched
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading state to false in case of an error
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/posts/post-count`
      );
      setTotal(data);
      // console.log(data);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  //load more
  const loadMore = async () => {
    try {
      setLoad(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/posts/post-list/${page}`
      );
      setLoad(false);
      // console.log(data);
      setPosts([...posts, ...data]);
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const homeDiv = document.getElementById("home");
    if (!loading && homeDiv) {
      homeDiv.classList.remove("spinner");
    }
  }, [loading]);

  return (
    <div>
      <Helmet>
        <title>Gunjan's Blog</title>
        <meta name="description" content="" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className={`home ${loading ? "spinner" : ""}`}>
        {loading ? ( // Render spinner when loading state is true
          <div>
            <Spinner />
          </div>
        ) : posts.length === 0 ? (
          // Render the NotFound component if no posts were found
          <Pagenotfound />
        ) : (
          <>
            <Header />
            <div className="homePage">
              <div className="left-container">
                <Posts posts={posts} />
                {Button && posts && posts.length < total && (
                  <button
                    className="btn loadmore"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
                    {load ? (
                      "Loading ..."
                    ) : (
                      <>
                        {" "}
                        More Bhajans... <AiOutlineReload />
                      </>
                    )}
                  </button>
                )}
              </div>
              <Sidebar />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
