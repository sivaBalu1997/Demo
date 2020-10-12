import React from "react";
import searchIcon from "../../assets/images/search.png";
import ReactSearchBox from "react-search-box";

const Search = () => {
  return (
    <div className="search-sec">
      <ReactSearchBox
        placeholder="Search"
        // value="Doe"
        // data={data}
        callback={(record) => console.log(record)}
      />
      <img src={searchIcon} alt="search" />
    </div>
  );
};

export default Search;
