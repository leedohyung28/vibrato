import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Link to="/">
        <img
          src={logo}
          alt="Vibrato Logo"
          className="w-full h-auto max-w-[150px] max-h-[75px]"
        />
      </Link>
    </div>
  );
};

export default Logo;
