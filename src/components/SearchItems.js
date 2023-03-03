import { useState } from "react";

const SearchItems= ({ getFilterSearch }) => {
  const [searchText, setSearchtext] = useState("");

  const filterRestaurants = (e) => {
    if (e.keyCode === 13) {
      getFilterSearch(searchText);
    }
  };

  return (
    <div className="search-container">
      <input
        placeholder="🔎 &nbsp;Search for restaurant, cusinie or a dish"
        className="search-input"
        onChange={(e) => setSearchtext(e.target.value)}
        onKeyDown={filterRestaurants}
      />
    </div>
  );
};

export default SearchItems;
