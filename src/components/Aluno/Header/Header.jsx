const Header = ({
  menuRef,
  title = "Página inicial",
  icon = "/src/assets/images/home-2.svg",
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 sticky top-0 z-10">

      <div className="flex items-center justify-between max-w-md mx-auto lg:hidden">

        <button
          className="p-2 text-gray-600 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
          onClick={() => menuRef.current?.toggleMenu()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 39 39"
            fill="none"
          >
            <path
              d="M4.875 11.375H34.125"
              stroke="#1D2D44"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M4.875 19.5H34.125"
              stroke="#1D2D44"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M4.875 27.625H34.125"
              stroke="#1D2D44"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </button>


        <div className="flex items-center space-x-2 flex-1 justify-center">
          <img
            src={icon}
            alt={title}
            style={{ width: "34px", height: "30px" }}
          />
          <h1
            className="font-bold"
            style={{
              fontSize: "24px",
              fontFamily: "Inter",
              color: "#1D2D44",
            }}
          >
            {title}
          </h1>
        </div>

        <div className="w-10"></div>
      </div>


      <div className="hidden lg:flex items-center justify-start">
        <div className="flex items-center space-x-2">
          <button
            className="p-2 text-gray-600 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
            onClick={() => menuRef.current?.toggleMenu()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 39 39"
              fill="none"
            >
              <path
                d="M4.875 11.375H34.125"
                stroke="#1D2D44"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M4.875 19.5H34.125"
                stroke="#1D2D44"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M4.875 27.625H34.125"
                stroke="#1D2D44"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <img
            src={icon}
            alt={title}
            style={{ width: "34px", height: "30px" }}
          />
          <h1
            className="font-bold"
            style={{
              fontSize: "24px",
              fontFamily: "Inter",
              color: "#1D2D44",
            }}
          >
            {title}
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;