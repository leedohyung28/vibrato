import Logo from "./Logo";
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import Profile from "./Profile";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center space-x-8">
        <Logo />
        <Navigation />
      </div>

      <div className="flex-grow px-8">
        <SearchBar />
      </div>

      <Profile />
    </header>
  );
};

export default Header;
