import search from "../assets/search.png";

const SearchBar = () => {
  return (
    <div className="relative">
      <img
        src={search}
        alt="Search Icon"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
      />
      <input
        type="text"
        placeholder="검색"
        className="bg-gray-200 rounded-full pl-12 py-2 w-96 focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
