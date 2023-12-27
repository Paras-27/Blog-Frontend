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
    } else {
      fetchPosts();
    }
    window.scrollTo(0, 0);
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

  const isMultipleOf3 = (number) => number % 2 === 0;

  return (
    <div>
      <Helmet>
        <title>Bhajan Sangeet</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="Gunjan's Blog - A blog website for sharing bhajan lyrics and video song."
        />
        <meta name="keywords" content="blog, travel, bhajan, recipe, story" />
        <meta name="category" content="travel, bhajan, recipe, story" />

        {/* <!-- canonical tag --> */}
        <link rel="canonical" href="https://gunjan-blog.netlify.app/" />

        {/* <!-- Open Graph Tags --> */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Gunjan-Blog - Find All Bhajan Lyrics In Hindi"
        />
        <meta
          property="og:description"
          content="Find lyrics of every regional bhajan in Hindi as well as in English."
        />
        <meta property="og:url" content="https://gunjan-blog.netlify.app/" />
        <meta property="og:site_name" content="Gunjan-Blog" />
        <meta
          property="article:modified_time"
          content="2023-12-14T17:59:22+00:00"
        />
        <meta name="twitter:card" content="summary_large_image" />

        <script type="application/ld+json" class="yoast-schema-graph">
          {`{
            "@context": "https://schema.org",
            "@type": "MusicComposition",
            "@id": "https://gunjan-blog.netlify.app/",
            "url": "https://gunjan-blog.netlify.app/",
            "name": "Gunjan-Blog - Find All Bhajan Lyrics In Hindi",
            "datePublished": "2023-07-21T12:39:28+00:00",
            "dateModified": "2023-12-14T17:59:22+00:00",
            "description": "Find lyrics of every regional bhajan in Hindi as well as in English.",
            "inLanguage": ["en-US", "hi"],
            "potentialAction": {
              "@type": "ReadAction",
              "target": ["https://gunjan-blog.netlify.app/"]
            },
            "author": {
              "@type": "Person",
              "name": "Gunjan Upadhyay"
            },
            "lyricist": {
              "@type": "Person",
              "name": "Gunjan Upadhyay"
            },
            "keywords": "Bhajan, Shree, Mata Rani, Mata ji, Maiya, Ganpati, Ganesh, Gajanan, Krishna, Radhe Krishna, Kanha, Kanhaiya, Krishan, Kishan, Bajan, bhjn, Bajrang Bali, Hanuman, Balaji, Bageshwar Dham Sarkar, Pashupatinath, Shiv, Bholenath, Bhole baba, Vishnu, Radha Rani"
          }`}
        </script>
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
                              loading="lazy"
                              decoding="async"
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
                      {isMultipleOf3(index + 1) && (
                        <div className="googleAdContainer none">
                          <AdComponent />
                        </div>
                      )}
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
