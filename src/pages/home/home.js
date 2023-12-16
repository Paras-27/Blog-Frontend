import React, { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Spinner from "../../components/spinner/Spinner";
import Pagenotfound from "../Notfound/Pagenotfound";
import "../../components/header/Header.js";
import Header from "../../components/header/Header.js";
import ReactPaginate from "react-paginate";
import AdComponent from "../../components/gads/gadscomp.js";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [initialPage, setInitialPage] = useState(0);

  useEffect(() => {
    const homeDiv = document.getElementById("home");
    if (!loading && homeDiv) {
      homeDiv.classList.remove("spinner");
    }
  }, [loading]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const pageParam = params.get("page");
    if (pageParam) {
      const pageValue = parseInt(pageParam, 10);
      setInitialPage(pageValue - 1);
      handlePageClick({ selected: pageValue - 1 }); // Call your function to fetch data based on the page
      window.scrollTo(0, 300);
    } else {
      fetchPosts();
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const fetchPosts = async () => {
    try {
      let res;
      if (search.length) {
        res = await axios.get(`${process.env.REACT_APP_API}/posts` + search);
        if (res.data.length === 0) {
        }
      } else {
        res = await axios.get(`${process.env.REACT_APP_API}/posts/post-list`);
      }
      setPosts(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handlePageClick = async (val) => {
    const currpage = val.selected + 1;
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/posts/post-list?page=${currpage}`
      );
      setPosts(data);
      navigate(`?page=${currpage}`);
      setLoading(false);
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/posts/post-count`
      );
      setTotalPages(Math.ceil(data / 9));
      // console.log(data);
    } catch (error) {
      // console.log(error);
    }
  };

  const isMultipleOf3 = (number) => number % 3 === 0;

  return (
    <div>
      <Helmet>
        <title>Bhajan Sangeet</title>
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
              <div className="posts">
                {posts.map((post, index) => {
                  return (
                    <div className="post">
                      {post.photo && (
                        <div className="post-image">
                          <a href={`/post/${post.slug}`} class="link">
                            <img
                              className="postImg"
                              src={post.photo}
                              alt=""
                              width={369}
                              height={207}
                            />
                          </a>
                        </div>
                      )}
                      <div className="postInfo">
                        <div className="postCats">
                          {post.categories.map((c) => (
                            <span className="postCat">{c}</span>
                          ))}
                        </div>
                        <Link to={`/post/${post.slug}`} className="link">
                          <span className="postTitle">{post.title}</span>
                        </Link>
                        <span className="postDate">
                          {new Date(post.createdAt).toDateString()}
                        </span>
                      </div>
                      {isMultipleOf3(index + 1) && <AdComponent />}
                    </div>
                  );
                })}
                <div className="post-pages">
                  {posts.length > 0 && (
                    <ReactPaginate
                      previousLabel={"<"}
                      nextLabel={">"}
                      breakLabel={"..."}
                      pageCount={totalPages}
                      pageRangeDisplayed={2}
                      marginPagesDisplayed={1}
                      onPageChange={handlePageClick}
                      containerClassName={"pagination"}
                      activeClassName={"active"}
                      forcePage={initialPage}
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
