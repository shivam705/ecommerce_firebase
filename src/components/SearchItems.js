import { useState } from "react";

const SearchItems= ({ getFilterSearch }) => {
  const [searchText, setSearchtext] = useState("");

  const filterItems = (e) => {
    //e.preventDefault();
    //console.log(e);
    //getFilterSearch(searchText);
    if (e.keyCode) {
      getFilterSearch(searchText);
    }
  };

  return (
    <div className="search-container" >
      <input
        placeholder="🔎 &nbsp;Search for items, Category or a Product"
        className="search-input"
        onChange={(e) => setSearchtext(e.target.value)}
        onKeyUp={filterItems}
        style={{marginLeft:"33%"}}
      />
    </div>
  );
};

export default SearchItems;
