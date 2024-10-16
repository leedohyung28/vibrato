import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-around">
      <div>
        <a
          href="chart"
          className="font-bold text-gray_dark hover:text-coral whitespace-nowrap truncate"
        >
          차트
        </a>
      </div>
      <div>
        <a
          href="newmusic"
          className="font-bold text-gray_dark hover:text-coral whitespace-nowrap truncate"
        >
          최신 트랙
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
