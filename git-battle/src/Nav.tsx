import { NavLink } from "react-router-dom";
import { RoutePath } from "./RoutePath";

const capitalizeFirstLetter = (path: string) =>
  path.charAt(0).toUpperCase() + path.slice(1);

const getPathLink = (link: string) =>
  link === "Home" ? "/" : link.toLowerCase();

const navLinks = [
  "Home",
  capitalizeFirstLetter(RoutePath.Popular),
  capitalizeFirstLetter(RoutePath.Battle),
];

export const Nav = () => {
  return (
    <ul className="flex flex-row pb-5">
      {navLinks.map((link, index) => (
        <div key={index} className="pr-2 focus-within:font-bold text-[#d0021b]">
          <NavLink to={getPathLink(link)}>{link}</NavLink>
        </div>
      ))}
    </ul>
  );
};
