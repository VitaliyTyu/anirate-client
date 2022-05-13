import React from "react"
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import './HeaderNotAuthorize.css'



const HeaderNotAuthorize = () => {
    return (
        <div style={{backgroundColor: '#fcc0f2'}}>     
            <Navbar     expand="lg">
                <Container>
                    

                    
                        <Navbar.Brand href="#home">AniRate</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto">
                                        
                                        <form className="d-flex">
                                            <input className="form-control me-2" type="search" placeholder="Поиск" aria-label="Search"/>
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

export default HeaderNotAuthorize;














