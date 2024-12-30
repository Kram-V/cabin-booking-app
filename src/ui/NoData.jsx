import React from "react";
import styled from "styled-components";

const NoDataContainer = styled.div`
  text-align: center;
  padding: 20px 0px;
  border-bottom: 1px solid var(--color-grey-100);
`;

const NoData = () => {
  return <NoDataContainer>NO DATA</NoDataContainer>;
};

export default NoData;
