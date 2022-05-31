import React, { useState } from "react"
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { logout } from "../../../store/actions-creators/auth";
import { useActions } from "../../../hooks/useActions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = () => {
    const { isAuth, } = useTypedSelector(state => state.auth)
    const navigate = useNavigate()
    const { logout, searchTitles } = useActions()
    const [searchString, setSearchString] = useState("")

    const handleValidation = () => {
        let searchStringIsValid = true;

        if (searchString.length < 1) {
            searchStringIsValid = false;
        }

        return searchStringIsValid;
    };

    const search = () => {
        if (handleValidation()) {
            navigate(`search/${searchString}`)
        }
    }

    const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode == 13 && handleValidation()) {
            e.preventDefault();
            navigate(`search/${searchString}`)
        }
        
    }

    return (
        <div style={{ backgroundColor: '#fcc0f2' }}>
            <Navbar expand="lg">
                <Container>

                    <Link style={{ textDecoration: 'none' }} to="/">

                        <Navbar.Brand >
                            AniRate
                        </Navbar.Brand>

                    </Link>

                    <Nav className="me-auto">
                        <form className="d-flex">
                            <input className="form-control ms-5"
                                placeholder="Поиск"
                                aria-label="Search"
                                onChange={(event) => setSearchString(event.target.value)}
                                onKeyDown={(event) => onEnterPress(event)}
                            />
                            <Button
                                variant="outline-dark"
                                className="ms-1"
                                onClick={search}
                            >
                                Поиск
                            </Button>
                        </form>
                    </Nav>


                    <div className='btn-wrapper-end'>
                        {isAuth
                            ?
                            <Button onClick={() => { logout(); navigate("/") }} variant="outline-dark" >
                                Выйти
                            </Button>
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
                    </div>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;














