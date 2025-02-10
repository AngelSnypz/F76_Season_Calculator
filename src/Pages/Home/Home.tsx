import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      Welcome to AngelSnypz Fallout76 Tools
      <div>
        <Link to="/scoreCalc">Go to Score Calculator</Link>
      </div>
      <div>
        <Link to="/builder">Go to Builder</Link>
      </div>
    </>
  );
};
