import Logo from "./Logo";
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import Profile from "./Profile";

const Header = () => {
  return (
    <header>
      <div className="container mx-auto grid grid-cols-12 h-16 px-5 gap-10 font-semibold items-center border-b drop-shadow-md">
        <div className="col-span-4 flex items-center gap-8">
          <Logo />
          <span className="mr-auto">
            <Navigation />
          </span>
        </div>
        <div className="col-span-5 flex-grow">
          <SearchBar />
        </div>
        <div className="col-span-3 flex-grow">
          <Profile />
        </div>
      </div>
    </header>
  );
};
export default Header;
