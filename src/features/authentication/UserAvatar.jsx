import styled from "styled-components";
import { useGetCurrentUser } from "../../hooks/useGetCurrentUser";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const UserAvatar = () => {
  const { user } = useGetCurrentUser();
  const { avatar, username } = user.user_metadata;

  return (
    <StyledUserAvatar>
      <Avatar src={avatar || "default-user.jpg"} alt={username} />
      <span>{username}</span>
    </StyledUserAvatar>
  );
};

export default UserAvatar;