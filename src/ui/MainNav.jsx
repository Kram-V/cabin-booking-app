import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCalendar,
  HiOutlineChartPie,
  HiOutlineCog6Tooth,
  HiOutlineHomeModern,
  HiOutlineStar,
} from "react-icons/hi2";
import { HiOutlineChat, HiOutlineUserAdd } from "react-icons/hi";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: white;
    background-color: var(--color-black-700);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const nonAdminLinks = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: <HiOutlineChartPie />,
  },
  {
    path: "/bookings",
    title: "Bookings",
    icon: <HiOutlineCalendar />,
  },
  {
    path: "/cabins",
    title: "Cabins",
    icon: <HiOutlineHomeModern />,
  },
  {
    path: "/guest-ratings",
    title: "Guest Ratings",
    icon: <HiOutlineStar />,
  },
  {
    path: "/testimonials",
    title: "Testimonials",
    icon: <HiOutlineChat />,
  },
  {
    path: "/settings",
    title: "Settings",
    icon: <HiOutlineCog6Tooth />,
  },
];

const adminLinks = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: <HiOutlineChartPie />,
  },
  {
    path: "/bookings",
    title: "Bookings",
    icon: <HiOutlineCalendar />,
  },
  {
    path: "/cabins",
    title: "Cabins",
    icon: <HiOutlineHomeModern />,
  },
  {
    path: "/guest-ratings",
    title: "Guest Ratings",
    icon: <HiOutlineStar />,
  },
  {
    path: "/testimonials",
    title: "Testimonials",
    icon: <HiOutlineChat />,
  },
  {
    path: "/users",
    title: "Users",
    icon: <HiOutlineUserAdd />,
  },
  {
    path: "/settings",
    title: "Settings",
    icon: <HiOutlineCog6Tooth />,
  },
];

const MainNav = () => {
  const { user } = useGetCurrentUser();
  const user_metadata = user?.user_metadata;

  return (
    <nav>
      <NavList>
        {!user_metadata?.isAdmin
          ? nonAdminLinks.map((link) => (
              <li key={link.title}>
                <StyledNavLink to={link.path}>
                  {link.icon} <span>{link.title}</span>
                </StyledNavLink>
              </li>
            ))
          : adminLinks.map((link) => (
              <li key={link.title}>
                <StyledNavLink to={link.path}>
                  {link.icon} <span>{link.title}</span>
                </StyledNavLink>
              </li>
            ))}
      </NavList>
    </nav>
  );
};

export default MainNav;
