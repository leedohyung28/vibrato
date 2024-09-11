import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Link to="/">
        <img src={logo} alt="Vibrato Logo" className="w-100 h-10" />
      </Link>
    </div>
  );
};

export default Logo;
