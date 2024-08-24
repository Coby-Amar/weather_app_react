import { Col, Container, Nav, Row } from "react-bootstrap";
import { WeatherService } from "../services/weather.service";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { useCallback, useEffect, useState } from "react";
import { LoginModal } from "../components/Login.modal";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth.service";


export function DashboardRoute() {
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async ({ coords: { latitude, longitude } }) => {
            const data = await WeatherService.getCurrentWeather(latitude, longitude)
            setWeatherDetails(data)
        })
    }, [])
    const location = useLocation()
    const [showLogin, setShowLogin] = useState(false)
    useEffect(() => {
        const hash = location.hash
        if (hash.includes('login') || hash.includes('register')) {
            setShowLogin(true)
        }
    }, [location.hash])
    const [weatherDetails, setWeatherDetails] = useState<WeatherDetails | null>(null)
    const navigate = useNavigate()
    const handleClose = useCallback(() => {
        setShowLogin(false)
        navigate('')
    }, [navigate])
    const handleLogin = useCallback((data: LoginRegister) => {
        console.log('data: ', data)
        // const isLogin = location.hash.includes('login')
        // if (isLogin) {
        //     AuthService.login(data)
        // } else {
        //     AuthService.register(data)
        // }
        handleClose()
    }, [handleClose, location.hash])
    return (
        <Container>
            <Row>
                <header className="d-flex justify-content-between">
                    Welcome to the weather app
                    <LoginModal show={showLogin} handleClose={handleClose} handleLogin={handleLogin} />
                    <Nav >
                        <Nav.Link href="#login">Login</Nav.Link>
                        <Nav.Link href="#register">Register</Nav.Link>
                    </Nav>
                </header>
            </Row>
            <Row>
                <ReactGoogleAutocomplete
                    placeholder="Search cities"
                    apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
                    libraries={['places']}
                    options={{ fields: ['geometry.location'] }}
                    onPlaceSelected={async ({ geometry: { location: { lat, lng } } }) => {
                        const data = await WeatherService.getCurrentWeather(lat(), lng())
                        console.log('data: ', data)
                        setWeatherDetails(data)
                    }}
                />
            </Row>
            <Row>
                <p className="fs-1">{weatherDetails?.location.name}, {weatherDetails?.location.region}</p>
            </Row>
            <Row style={{ backgroundColor: "whitesmoke" }} className="p-2">
                <Col className="d-flex flex-row align-items-center">
                    <img
                        src={weatherDetails?.current.condition.icon}
                        alt={weatherDetails?.current.condition.text}
                        className="img-fluid"
                    />
                    <span className="fs-2">{weatherDetails?.current.condition.text}</span>
                </Col>
                <Col sm="auto" className="d-flex align-items-center">
                    <span className="fs-2">{weatherDetails?.current.temp_f}  °f</span>
                </Col>
                <Col sm="auto" className="d-flex flex-column justify-content-center align-items-center">
                    <span className="fs-6">Wind: {weatherDetails?.current.wind_mph} mph</span>
                    <span className="fs-6">Precip: {weatherDetails?.current.precip_in} in</span>
                    <span className="fs-6">Pressure: {weatherDetails?.current.pressure_in} in</span>
                </Col>
            </Row>
        </Container>
    )
}
