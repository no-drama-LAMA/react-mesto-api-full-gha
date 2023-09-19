import { NavLink } from "react-router-dom";

function NavBar({ loggedIn, quit, UserEmail }) {
  return (
    <nav className="header__nav">
      {loggedIn ? (
        <>
          <div className="header__menu">
              <p className="header__email">{UserEmail}</p>
              <NavLink to='' onClick={quit} className="header__menu-link">
                  Выйти
              </NavLink>
          </div>
        </>
        ) : (
        <>
          <NavLink to='/sign-in' className={({isActive}) => `header__nav-item ${isActive ? "header__nav-item_active" : ""}`}>Войти</NavLink>
          <NavLink to='/sign-up' className={({isActive}) => `header__nav-item ${isActive ? "header__nav-item_active" : ""}`}>Регистрация</NavLink>
        </>
      )}
    </nav>
  );
}

export default NavBar;