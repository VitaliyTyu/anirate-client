import React from "react"
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import './HeaderNotAuthorize.css'



const HeaderNotAuthorize = () => {
    return (
              
            <Navbar bg="light" expand="lg">
                <Container>
                    

                    
                        <Navbar.Brand href="#home">AniRate</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto">
                                        <Nav.Link href="#home">Поиск</Nav.Link>                
                                        <NavDropdown title="Аккаунт" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="#action/3.1">Войти</NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.2">Регистрация</NavDropdown.Item>                   
                                        </NavDropdown>
                                    </Nav>
                                </Navbar.Collapse>
                            
                </Container>
        </Navbar>
      
        
    );
};

export default HeaderNotAuthorize;














