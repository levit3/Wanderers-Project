import React from "react";

function Search({ handleSearch }) {
  return (
    <div className="container">
      <div className="row">
        <div class="col-md-5 mx-auto">
          <div class="input-group">
            <input
              class="form-control border-end-0 border rounded-pill"
              type="search"
              placeholder="search"
              onChange={handleSearch}
              id="example-search-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
