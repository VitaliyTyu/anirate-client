import React, { useState } from "react";
import {
    Navbar,
    Container,
    Nav,
    NavDropdown,
    Button,
    Dropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { logout } from "../../../store/actions-creators/auth";
import { useActions } from "../../../hooks/useActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import css from "./Header.module.css";

const Header = () => {
    const { isAuth } = useTypedSelector((state) => state.auth);
    const navigate = useNavigate();
    const { logout } = useActions();

    const secondHandle = (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
    };

    return (
        <div className={css.header}>
            <Navbar expand="lg">
                <Container className={css.header_inner}>
                    <Link style={{ textDecoration: "none" }} to="/">
                        <Navbar.Brand style={{ color: "#bcbedc" }}>AniRate</Navbar.Brand>
                    </Link>

                    <div className={css.linkPlace}>
                        <Link to={"/animes"} className={css.button}>
                            Аниме
                        </Link>
                        <Link to={"/collections"} className={css.button}>
                            Коллекции
                        </Link>
                    </div>

                    <div onClick={secondHandle} className={css.buttonAuth}>
                        <Dropdown>
                            <Dropdown.Toggle className={css.button} >Аккаунт</Dropdown.Toggle>

                            <Dropdown.Menu variant="dark">
                                <Dropdown.Item>
                                    {isAuth ? (
                                        <Dropdown.Item >
                                            <div
                                                className={css.dropDiv}
                                                onClick={() => {
                                                    logout();
                                                    navigate("/");
                                                }}
                                            >
                                                Выйти
                                            </div>
                                        </Dropdown.Item>
                                    ) : (
                                        <div >
                                            <Dropdown.Item >
                                                <div
                                                    onClick={() => navigate("/login")}
                                                    className={css.dropDiv}
                                                >
                                                    Войти
                                                </div>
                                            </Dropdown.Item>
                                            <Dropdown.Item >
                                                <div onClick={() => navigate("/register")} className={css.dropDiv}>
                                                    Регистрация
                                                </div>
                                            </Dropdown.Item>
                                        </div>
                                    )}
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;
