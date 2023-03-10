import { Link } from "react-router-dom";
import { RoutePath } from "./RoutePath";

export const Home = () => {
  return (
    <div className="m-5 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">
        GitHub Battle: battle your friends... and stuff
      </h1>
      <Link to={"/" + RoutePath.Battle} className="m-5 w-36 button">
        Battle
      </Link>
    </div>
  );
};
