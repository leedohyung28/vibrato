import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex text-gray_dark justify-around">
      <button onClick={() => navigate("/chart")} className="hover:text-coral">
        차트
      </button>
      <button onClick={() => navigate("/artist")} className="hover:text-coral">
        아티스트
      </button>
      <button onClick={() => navigate("/album")} className="hover:text-coral">
        앨범
      </button>
    </nav>
  );
};

export default Navigation;
