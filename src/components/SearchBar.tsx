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
        className="bg-searchBar rounded-full w-full pl-9 py-1.5 focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
