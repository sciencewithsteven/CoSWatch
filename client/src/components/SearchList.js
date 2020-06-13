import React from 'react';

const SearchList = (props) => (
  <div className="search-results-container">
    <h2> Search Results </h2>
    <div className="initial-list">
      {props.initialList.map((item, i) =>
        <div className="police">
        <h3>Officer: {item.fullName}</h3>
       <p>State: {item.state}</p>
       <p>Agency: {item.agency}</p>
      </div>
      )}
    </div>
  </div>
);

export default SearchList;