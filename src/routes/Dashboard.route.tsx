import { Container, NavLink, Row } from "react-bootstrap";
import { WeatherService } from "../services/weather.service";
import { useCallback, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth.service";
import { ConstsService } from "../services/consts.service";
import { CurrentWeatherComponent } from "../components/CurrentWeather.component";
import { NavigationComponent } from "../components/Navigation.component";
import { LoginRegisterModal } from "../components/modals/LoginRegister.modal";
import { HistoryModal } from "../components/modals/History.modal";
import { ForcastWeatherComponent } from "../components/ForcastWeather.component";
import { AreYouSureModal } from "../components/modals/AreYouSure.modal";
import { SettingsModal } from "../components/modals/Settings.modal";
import { useModals } from "../hooks/useModals.hook";
import { UserService } from "../services/user.service";
import { useSettings } from "../hooks/useSettings.hook";
import { SearchBarComponent } from "../components/SearchBar.component";
import { RoutesService } from "../services/routes.service";

export function DashboardRoute() {
    const [weatherDetails, setWeatherDetails] = useState<WeatherDetails | null>(null)
    const [forcastWeatherDetails, setForcastWeatherDetails] = useState<ForcastWeatherDetails | null>(null)
    const [user, setUser] = useState<User | null>(useLoaderData() as User | null)
    useEffect(() => {
        if (user) {
            if (!forcastWeatherDetails) {
                navigator.geolocation.getCurrentPosition(async ({ coords: { latitude, longitude } }) => {
                    try {
                        const data = await WeatherService.getCurrentWeatherForcast(latitude, longitude)
                        setForcastWeatherDetails(data)
                        setWeatherDetails(data)
                    } catch (error) {
                        console.error('error: ', error)
                    }
                })
            }
        } else if (!weatherDetails) {
            navigator.geolocation.getCurrentPosition(async ({ coords: { latitude, longitude } }) => {
                try {
                    const data = await WeatherService.getCurrentWeather(latitude, longitude)
                    setWeatherDetails(data)
                } catch (error) {
                    console.error('error: ', error)
                }
            })
        }
    }, [forcastWeatherDetails, user, weatherDetails])

    const [modals, locationHash] = useModals(!!user)
    const [settings, settingsSetters] = useSettings(!!user)
    const navigate = useNavigate()
    const handleClose = useCallback(() => {
        navigate('')
    }, [navigate])
    const handleAreYouSure = useCallback(async () => {
        try {
            const isLogout = locationHash === RoutesService.logoutHash
            const apiCall = isLogout ? AuthService.logout : UserService.deleteUser
            await apiCall()
            setForcastWeatherDetails(null)
            settingsSetters.reset()
            setUser(null)
        } catch (error) {
            console.error('error: ', error)
        }
        handleClose()
    }, [handleClose, locationHash, settingsSetters])
    const handleLoginRegisterSubmit = useCallback(async (data: LoginRegister) => {
        const isLogin = locationHash === RoutesService.loginHash
        try {
            const apiCall = isLogin ? AuthService.login : AuthService.register
            const user = await apiCall(data)
            setUser(user)
        } catch (error) {
            console.error('error: ', error)
        }
        handleClose()
    }, [handleClose, locationHash])
    const onPlaceSelected = useCallback<GooglePlacesCallback>(async ({ geometry: { location: { lat, lng } } }) => {
        try {
            const apiCall = user ? WeatherService.getWeatherForcast : WeatherService.getCurrentWeather
            const data = await apiCall(lat(), lng())
            if (user) {
                setForcastWeatherDetails(data as ForcastWeatherDetails)
            }
            setWeatherDetails(data)
        } catch (error) {
            console.error('error: ', error)
        }
    }, [user])

    return (
        <Container className="bg-light-subtle p-0 h-100">
            <Row>
                <NavigationComponent
                    user={user}
                />
            </Row>
            <Row>
                <SearchBarComponent onPlaceSelected={onPlaceSelected} />
                {!user &&
                    <p>
                        *Want weekly forecasts, history and more? <NavLink
                            className="d-inline text-info-emphasis fw-semibold"
                            href={"#" + ConstsService.REGISTER}
                        >
                            Register here
                        </NavLink>
                    </p>
                }
            </Row>
            {weatherDetails &&
                <>
                    <Row>
                        <p className="fs-1">{weatherDetails.location.name}, {weatherDetails.location.region}</p>
                    </Row>
                    <CurrentWeatherComponent settings={settings} {...weatherDetails.current} />
                </>
            }
            {forcastWeatherDetails &&
                <ForcastWeatherComponent settings={settings} {...forcastWeatherDetails} />
            }
            <SettingsModal
                show={modals.settings}
                handleClose={handleClose}
                setting={settings}
                {...settingsSetters}
            />
            <AreYouSureModal
                show={modals.areYouSure}
                handleClose={handleClose}
                handleSubmit={handleAreYouSure}
            />
            <LoginRegisterModal
                show={modals.loginRegister}
                handleClose={handleClose}
                handleSubmit={handleLoginRegisterSubmit}
            />
            <HistoryModal
                show={modals.history}
                handleClose={handleClose}
                settings={settings}
            />
        </Container >
    )
}
