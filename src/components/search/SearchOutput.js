import React from "react";
import { useSearch } from "./search";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "./search.css";
const SearchOutput = () => {
  const [values] = useSearch();
  // eslint-disable-next-line
  return (
    <div className="search-main">
      <Helmet>
        <title>Search For Bhajans</title>
        <meta name="description" content="" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="text-center">
        <h1 className="search-result">
          {values?.results.length < 1
            ? "No Posts Found"
            : `Found ${values?.results.length} Related Posts`}
        </h1>
        <div className="d-flex flex-wrap mt-4">
          {values?.results.map((post) => (
            <div className="search-post">
              {post.photo && (
                <div className="search-post-image">
                  <a href={`/post/${post.slug}`} class="link">
                    <img
                      className="search-postImg"
                      src={post.photo}
                      alt=""
                      width={369}
                      height={207}
                    />
                  </a>
                </div>
              )}
              <div className="search-postInfo">
                <div className="search-postCats">
                  {post.categories.map((c) => (
                    <span className="search-postCat">{c}</span>
                  ))}
                </div>
                <Link to={`/post/${post.slug}`} className="link">
                  <span className="search-postTitle">{post.title}</span>
                </Link>
                <span className="search-postDate">
                  {new Date(post.createdAt).toDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchOutput;
