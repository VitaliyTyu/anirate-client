import React, { useState } from "react"
import { Navbar, Container, Nav, NavDropdown, Button, Dropdown } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { logout } from "../../../store/actions-creators/auth";
import { useActions } from "../../../hooks/useActions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import css from './Header.module.css'

const Header = () => {
    const { isAuth, } = useTypedSelector(state => state.auth)
    const navigate = useNavigate()
    const { logout } = useActions()

    const secondHandle = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
    }

    return (
        <div className={css.header}>
            <Navbar expand="lg">
                <Container>

                    <Link style={{ textDecoration: 'none' }} to="/">

                        <Navbar.Brand >
                            AniRate
                        </Navbar.Brand>

                    </Link>

                    <div>
                        <Button onClick={() => navigate("/animes")} variant="outline-dark" >
                            Аниме
                        </Button>
                        <Button onClick={() => navigate("/collections")} variant="outline-dark" >
                            Коллекции
                        </Button>
                    </div>

                    <div onClick={secondHandle} >
                        <Dropdown>
                            <Dropdown.Toggle variant="outline" id="dropdown-basic">
                                Аккаунт
                            </Dropdown.Toggle>

                            <Dropdown.Menu variant='light'>
                                <Dropdown.Item>
                                    {isAuth
                                        ?
                                        <Dropdown.Item>

                                            <Button onClick={() => { logout(); navigate("/") }} variant="outline-dark" >
                                                Выйти
                                            </Button>
                                        </Dropdown.Item>
                                        :
                                        <div>
                                            <Button
                                                onClick={() => navigate("/login")} variant="outline-dark"
                                                style={{ marginRight: 10 }}
                                            >
                                                Войти
                                            </Button>
                                            <Button
                                                onClick={() => navigate("/register")} variant="outline-dark"
                                            >
                                                Регистрация
                                            </Button>
                                        </div>
                                    }
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














