import logo from '../../images/logo.svg'
import NavBar from '../NavBar/NavBar';

function Header({loggedIn, quit, UserEmail}) {

    return (
        <header className="header">
            <img
                src={logo}
                alt="Логотип"
                className="header__logo"
            />
            <NavBar loggedIn={loggedIn} quit={quit} UserEmail={UserEmail}/>
        </header>
    )
}

export default Header;