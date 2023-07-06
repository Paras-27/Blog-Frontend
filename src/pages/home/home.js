import React, { useEffect, useState } from "react";
import "./home.css";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import Spinner from "../../components/spinner/Spinner";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/posts` + search
        );
        setPosts(res.data);
        setLoading(false); // Set loading state to false when data is fetched
      } catch (error) {
        console.log(error);
        setLoading(false); // Set loading state to false in case of an error
      }
    };
    fetchPosts();
  }, [search]);

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
        ) : (
          <>
            <Header />
            <div className="homePage">
              <Posts posts={posts} />
              <Sidebar />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
