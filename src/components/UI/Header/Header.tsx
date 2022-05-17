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
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            <form className="d-flex">
                                <input className="form-control ms-5" type="search" placeholder="Поиск" aria-label="Search" />
                                <button className="btn btn-outline-success ms-1" type="submit">Поиск</button>
                            </form>
                                                      

                        </Nav>
                    </Navbar.Collapse>

                    <div className='btn-wrapper-end'>
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
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;














