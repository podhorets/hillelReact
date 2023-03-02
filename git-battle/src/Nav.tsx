import { NavLink, useLocation } from "react-router-dom";
import { RoutePath } from "./RoutePath";

const navLinks = [RoutePath.Home, RoutePath.Popular, RoutePath.Battle];

const getTabName = (link: string) =>
  link === "/" ? "Home" : capitalizeFirstLetter(link);

const capitalizeFirstLetter = (path: string) =>
  path.charAt(0).toUpperCase() + path.slice(1);

const isActiveTab = (link: string, pathname: string): boolean => {
  if (link === "/") {
    return link === pathname;
  } else {
    return "/" + link === pathname;
  }
};

export const Nav = () => {
  const location = useLocation();

  return (
    <ul className="flex flex-row pb-5">
      {navLinks.map((link, index) => (
        <div
          key={index}
          style={{
            fontWeight: isActiveTab(link, location.pathname)
              ? "bold"
              : "normal",
          }}
          className="pr-2 text-[#d0021b]"
        >
          <NavLink to={link}>{getTabName(link)}</NavLink>
        </div>
      ))}
    </ul>
  );
};
