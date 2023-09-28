import { Link } from "react-router-dom";
function Header() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-100 p-6">
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <Link to="/" className="font-semibold text-xl tracking-tight">
          Funny Movie
        </Link>
      </div>
      <div className="flex lg:flex lg:items-center lg:w-auto gap-2">
        <div>
          <Link
            to="register"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-blue-400 border-blue-400 hover:text-blue-500 mt-4 lg:mt-0"
          >
            Register
          </Link>
        </div>
        <div>
          <Link
            to="login"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent bg-blue-400 hover:bg-blue-500 mt-4 lg:mt-0"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
