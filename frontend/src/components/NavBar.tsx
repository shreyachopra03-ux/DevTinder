const NavBar = () => {
  return (
    <header className="navbar min-h-16 bg-base-300 px-3 shadow-sm sm:px-6">
      <div className="flex flex-1 items-center gap-2">
        <img
          className="h-9 w-9 object-contain sm:h-10 sm:w-10"
          src="https://static.vecteezy.com/system/resources/previews/023/986/928/non_2x/tinder-app-logo-tinder-app-logo-transparent-tinder-app-icon-transparent-free-free-png.png"
          alt="Dev Tinder logo"
        />

        <a className="btn btn-ghost px-2 text-base sm:text-xl">
          DEV TINDER
        </a>
      </div>

      <div className="dropdown dropdown-end">
        <button
          tabIndex={0}
          type="button"
          className="btn btn-circle btn-ghost avatar"
        >
          <div className="w-9 rounded-full sm:w-10">
            <img
              alt="User profile"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </button>

        <ul
          tabIndex={-1}
          className="menu dropdown-content z-10 mt-3 w-48 rounded-box bg-base-100 p-2 shadow"
        >
          <li>
            <a>Profile</a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <a>Logout</a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default NavBar;