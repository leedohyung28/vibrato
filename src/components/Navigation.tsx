const Navigation = () => {
  return (
    <nav className="flex text-gray_dark justify-around gap-4">
      <a href="chart" className="hover:text-coral">
        차트
      </a>
      <a href="newmusic" className="hover:text-coral">
        최신 트랙
      </a>
      <a href="newmusic" className="hover:text-coral">
        플레이리스트
      </a>
    </nav>
  );
};

export default Navigation;
