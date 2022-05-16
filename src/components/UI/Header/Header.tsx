import React from "react"
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { logout } from "../../../store/actions-creators/auth";
import { useActions } from "../../../hooks/useActions";

const Header = () => {
    const { isAuth, } = useTypedSelector(state => state.auth)
    const navigate = useNavigate()
    const { logout } = useActions()
    return (
        <div style={{ backgroundColor: '#fcc0f2' }}>
            <Navbar expand="lg">
                <Container>
                    <Link to="/">
                        <Navbar.Brand >
                            AniRate
                        </Navbar.Brand>
                    </Link>
                    <div>
                        {isAuth
                            ?
                            <Button onClick={() => { logout(); navigate("/") }}>
                                Выйти
                            </Button>
                            :
                            <Button onClick={() => navigate("/login")}>
                                Войти
                            </Button>
                        }

                    </div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Поиск" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Поиск</button>
                            </form>

                            <NavDropdown title="Аккаунт" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Войти</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Регистрация</NavDropdown.Item>
                            </NavDropdown>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;














