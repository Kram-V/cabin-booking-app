import { useState } from "react";
import Input from "./Input";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

const InputSearch = ({ placeholder }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const page = +searchParams.get("page") || 1;

  function handleSearch(e) {
    e.preventDefault();

    if (page > 1) {
      searchParams.set("page", 1);
    }

    searchParams.set("search", search);
    setSearchParams(searchParams);
  }

  return (
    <form onSubmit={handleSearch}>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        type="text"
        id="cabinName"
      />
    </form>
  );
};

InputSearch.propTypes = {
  placeholder: PropTypes.string,
};

export default InputSearch;
