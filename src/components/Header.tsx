import Logo from "./Logo";
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import Profile from "./Profile";

const Header = () => {
  return (
    <header>
      <div className="container mx-auto grid grid-cols-12 h-16 px-5 gap-10 font-semibold items-center">
        <div className="col-span-2 ">
          <Logo />
        </div>
        <div className="col-span-2">
          <Navigation />
        </div>
        <div className="col-span-6 flex-grow">
          <SearchBar />
        </div>
        <div className="col-span-2 flex-grow">
          <Profile />
        </div>
      </div>
      <hr className="drop-shadow-md" />
    </header>
  );
};
export default Header;
