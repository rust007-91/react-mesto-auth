import { NavLink } from "react-router-dom";
import logo from "../images/mesto-logo.svg";

function Header({ loggedIn, email, logOut }) {
    return (
        <header className="header">
            <>
                <img
                    src={logo}
                    alt="Логотип_название 'Место Россия"
                    className="header__logo"
                />

                {!loggedIn ? (
                    <>
                        <NavLink
                            to="/sign-in"
                            className={({ isActive }) => {
                                return `auth__header ${!isActive ? "auth__header_active" : ""}`;
                            }}
                        >
                            Войти
                        </NavLink>

                        <NavLink
                            to="/sign-up"
                            className={({ isActive }) => {
                                return `auth__header ${!isActive ? "auth__header_active" : ""}`;
                            }}
                        >
                            Регистрация
                        </NavLink>
                    </>
                ) : (
                    <NavLink
                        to="/main"
                        className={({ isActive }) => {
                            return `auth__header ${isActive ? "auth__header_active" : ""}`;
                        }}
                    >
                        <p className="auth__header_email">{email.email}</p>
                        <button className="auth__header_btn" onClick={logOut}>Выйти</button>
                    </NavLink>
                )}
            </>
        </header>
    );
}

export default Header;
