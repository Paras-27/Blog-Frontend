import React from "react";
import { useSearch } from "./search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (values.keyword.trim().length === 0) {
        return;
      }
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/posts/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
      // console.log(data);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div>
      <form
        className="d-flex search-form"
        role="search"
        onSubmit={handleSubmit}
        id="form"
      >
        <div className="search-input-container">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search For Bhajans"
            aria-label="Search"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
            name="search"
          />
          <button type="submit" className="submit">
            <img src="/svg/search.svg" alt="" className="icon" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
