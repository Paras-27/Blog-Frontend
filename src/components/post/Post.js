import "./post.css";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function Post({ post, title }) {
  return (
    <div className="post">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={post.desc} />
        <meta name="robots" content="index, follow" />
      </Helmet>
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
      {/* <p className="postDesc">{post.desc}</p> */}
    </div>
  );
}
