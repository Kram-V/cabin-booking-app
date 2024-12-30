import styled, { css } from "styled-components";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: black;
      color: white;
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: black;
    color: white;
  }
`;

const Filter = ({ queryName, options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentQueryValue = searchParams.get(queryName) || options.at(0).value;

  function handleClick(value) {
    if (searchParams.get(queryName) === value) return;

    if (queryName !== "last") {
      searchParams.set("sortBy", "id-desc");
      searchParams.set("page", 1);
      searchParams.set("rowsPerPage", 10);
    }

    searchParams.set(queryName, value);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.title}
          onClick={() => handleClick(option.value)}
          active={currentQueryValue === option.value}
        >
          {option.title}
        </FilterButton>
      ))}
    </StyledFilter>
  );
};

Filter.propTypes = {
  queryName: PropTypes.string,
  options: PropTypes.array,
};

export default Filter;
