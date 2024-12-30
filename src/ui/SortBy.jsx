import PropTypes from "prop-types";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";

const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentValue = searchParams.get("sortBy") || "id-desc";

  function handleChange(e) {
    const { value } = e.target;

    searchParams.set("sortBy", value);
    searchParams.set("page", 1);

    setSearchParams(searchParams);
  }

  return (
    <Select
      type="white"
      options={options}
      onChange={handleChange}
      value={currentValue}
    />
  );
};

SortBy.propTypes = {
  options: PropTypes.array,
};

export default SortBy;
