import React, { useState, useEffect } from "react";
import "../../styles/shop/css/linearicons.css";
import "../../styles/shop/css/font-awesome.min.css";
import "../../styles/shop/css/themify-icons.css";
import "../../styles/shop/css/bootstrap.css";
import "../../styles/shop/css/owl.carousel.css";
import "../../styles/shop/css/nice-select.css";
import "../../styles/shop/css/nouislider.min.css";
import "../../styles/shop/css/ion.rangeSlider.css";
import "../../styles/shop/css/ion.rangeSlider.skinFlat.css";
import "../../styles/shop/css/main.css";
import logoImage from "../../styles/shop/img/logo.png";
import "./header.css";
import { useAppSelector, useAppDispatch } from "../../store/hook";
import { UserProfile } from "../../pages/Profile/Profile";
import { userService } from "../../services/user.service";
import { Search } from "./Search";
import { endSearch } from "../../store/search/searchSlice";

export default function Header() {
    const userLastname = useAppSelector((state) =>
        state.account.user ? state.account.user.username : "Customer"
    );
    const dispath = useAppDispatch();
    const token = useAppSelector((state) => state.account.token);
    const [profile, setProfile] = useState<UserProfile>();
    const [avatar, setAvatar] = useState<string>();
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [isShowSearch, setIsShowSearch] = useState<boolean>(false);
    const search = useAppSelector((state) => state.search.is_search);

    const handleSearchClick = () => {
        if (isSearch) {
            dispath(endSearch);
        }
        setIsSearch(!isSearch);
    };

    const initProfiles = () => {
        userService.initProfile(token ? token : "").catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        setIsShowSearch(isSearch);
    }, [isSearch]);

    useEffect(() => {
        if (search) {
            setIsShowSearch(false);
        }
        userService
            .getProfile(token ? token : "")
            .then((response) => {
                setAvatar(response.avatar);
                setProfile(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div>
            <div>
                {/* Start Header Area */}
                <header className="header_area sticky-header">
                    <div className="main_menu">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <div className="container">
                                {/* Brand and toggle get grouped for better mobile display */}
                                <a className="navbar-brand logo_h" href="/home">
                                    <img src={logoImage} />
                                </a>
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#navbarSupportedContent"
                                    aria-controls="navbarSupportedContent"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                </button>
                                {/* Collect the nav links, forms, and other content for toggling */}
                                <div
                                    className="collapse navbar-collapse offset"
                                    id="navbarSupportedContent"
                                >
                                    <ul className="nav navbar-nav menu_nav ml-auto">
                                        <li className="nav-item">
                                            <a
                                                className="nav-link"
                                                href="/home"
                                            >
                                                Home
                                            </a>
                                        </li>
                                        <li className="nav-item submenu dropdown">
                                            <a
                                                href="/blog"
                                                className="nav-link dropdown-toggle"
                                                data-toggle="dropdown"
                                                role="button"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                Blog
                                            </a>
                                        </li>

                                        <li className="nav-item submenu dropdown">
                                            <a
                                                href="/categories"
                                                className="nav-link dropdown-toggle"
                                                data-toggle="dropdown"
                                                role="button"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                Shop
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className="nav-link"
                                                href="/contact"
                                            >
                                                Contact
                                            </a>
                                        </li>

                                        {/* <li className="nav-item">
                                            <a
                                                className="nav-link"
                                                href="whishlist"
                                            >
                                                Whishlist
                                            </a>
                                        </li> */}

                                        <li className="nav-item submenu dropdown">
                                            <a
                                                href="#"
                                                className="nav-link dropdown-toggle"
                                                data-toggle="dropdown"
                                                role="button"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                {token ? (
                                                    <div>
                                                        <img
                                                            src={avatar}
                                                            id="lalala"
                                                        ></img>
                                                        Welcome, {userLastname}
                                                    </div>
                                                ) : (
                                                    <div>
                                                        {" "}
                                                        <span className="lnr lnr-user" />
                                                        Login/Register
                                                    </div>
                                                )}
                                            </a>
                                            <ul className="dropdown-menu">
                                                {!token ? (
                                                    <div>
                                                        <li className="nav-item">
                                                            <a
                                                                className="nav-link"
                                                                href="/login"
                                                            >
                                                                Login
                                                            </a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a
                                                                className="nav-link"
                                                                href="/register"
                                                            >
                                                                Register
                                                            </a>
                                                        </li>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <li className="nav-item">
                                                            <a
                                                                className="nav-link"
                                                                href="/user/account"
                                                                onClick={
                                                                    initProfiles
                                                                }
                                                            >
                                                                Profile
                                                            </a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a
                                                                className="nav-link"
                                                                href="/user/favorite"
                                                            >
                                                                Favorite
                                                            </a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a
                                                                className="nav-link"
                                                                href="/user/history"
                                                            >
                                                                Order history
                                                            </a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a
                                                                className="nav-link"
                                                                href="/logout"
                                                            >
                                                                Logout
                                                            </a>
                                                        </li>
                                                    </div>
                                                )}
                                            </ul>
                                        </li>
                                    </ul>
                                    <ul className="nav navbar-nav navbar-right">
                                        <li className="nav-item">
                                            <a href="/cart" className="cart">
                                                <span className="ti-shopping-cart" />{" "}
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                className="search"
                                                onClick={handleSearchClick}
                                            >
                                                <span
                                                    className="lnr lnr-magnifier"
                                                    id="search"
                                                />
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>

                    {/* o tim kiem */}
                    {isShowSearch ? (
                        <>
                            <Search />
                        </>
                    ) : (
                        <></>
                    )}
                </header>
                {/* End Header Area */}
            </div>
        </div>
    );
}
