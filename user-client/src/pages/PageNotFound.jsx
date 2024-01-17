import { Link } from "react-router-dom";

export function PageNotFound() {
  return (
    <div className="">
      <h1 className="text-center text-md font-medium">
        Page you are tyring to access does not exists.{" "}
        <span className="text-blue-400">
          <Link to={"/"}>Visit our home page.</Link>
        </span>
      </h1>
    </div>
  );
}
