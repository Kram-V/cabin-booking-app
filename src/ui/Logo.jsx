import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
  margin-bottom: 24px;
  font-size: 20px;
  font-weight: 600;
`;

// const Img = styled.img`
//   height: 9.6rem;
//   width: auto;
//   margin-bottom: 2rem;
// `;

function Logo() {
  return <StyledLogo>Cabin Booking App</StyledLogo>;
}

export default Logo;
