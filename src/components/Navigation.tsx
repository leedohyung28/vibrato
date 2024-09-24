const Navigation = () => {
  return (
    <nav className="flex space-x-4 text-gray-600">
      <a href="chart" className="hover:text-red-500">
        차트
      </a>
      <a href="artist" className="hover:text-red-500">
        아티스트
      </a>
      <a href="album" className="hover:text-red-500">
        앨범
      </a>
    </nav>
  );
};

export default Navigation;
