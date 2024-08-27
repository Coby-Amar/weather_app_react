import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import { RoutesService } from "../services/routes.service";

export function NavigationComponent({ user }: NavigationComponentProps) {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand> Welcome to the weather app</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        {user ?
                            <>
                                <NavDropdown title={
                                    <>
                                        <PersonCircle size={25} className="me-1" />
                                        <span className="fs-6">
                                            {user.name}
                                        </span>
                                    </>
                                }>
                                    <NavDropdown.Item href={RoutesService.historyHash}>History</NavDropdown.Item>
                                    <NavDropdown.Item href={RoutesService.settingsHash}>Settings</NavDropdown.Item>
                                    <NavDropdown.Item href={RoutesService.logoutHash}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </>
                            :
                            <>
                                <Nav.Link href={RoutesService.loginHash}>Login</Nav.Link>
                                <Nav.Link href={RoutesService.registerHash}>Register</Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
