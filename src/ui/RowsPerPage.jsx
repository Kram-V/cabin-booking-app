import PropTypes from "prop-types";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";

const RowsPerPage = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentValue = +searchParams.get("rowsPerPage") || 10;

  function handleChange(e) {
    const { value } = e.target;

    searchParams.set("rowsPerPage", value);
    searchParams.set("page", 1);
    searchParams.set("sortBy", "id-desc");
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

RowsPerPage.propTypes = {
  options: PropTypes.array,
};

export default RowsPerPage;
