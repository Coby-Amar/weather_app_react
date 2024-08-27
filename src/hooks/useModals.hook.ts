import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { RoutesService } from "../services/routes.service"

const initModalsState = {
    settings: false,
    areYouSure: false,
    loginRegister: false,
    history: false,
}

export function useModals(loggedIn= false): [ModalsState, string] {
    const { hash } = useLocation()
    const [modals, setModals] = useState({ ...initModalsState })
    useEffect(() => {
        const nextModalsState = { ...initModalsState }
            switch (hash) {
                case RoutesService.loginHash:
                case RoutesService.registerHash:
                    nextModalsState.loginRegister = true
                    break
                case !loggedIn && hash: 
                    break 
                case RoutesService.historyHash:
                    nextModalsState.history = true
                    break
                case RoutesService.settingsHash:
                    nextModalsState.settings = true
                    break
                case RoutesService.logoutHash:
                case RoutesService.deleteHash:
                    nextModalsState.areYouSure = true
                    break
            }   
        setModals(nextModalsState)
    }, [hash, loggedIn])
    return [modals, hash]
}