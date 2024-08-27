import { useCallback, useEffect, useState } from "react"

const initSettingsState: SettingsState = {
    unit: 'Imperial',
    dateFormat: '',
    timeFormat: '',
}

function addFieldToSettingsJson(field: string, value: unknown, settings: SettingsState) {
    const settingsStringifed = JSON.stringify({
        ...settings,
        [field]: value
    })
    localStorage.setItem('settings', settingsStringifed)
}

export function useSettings(loggedIn= false): SettingsHookResponse {
    const [settings, setSettings] = useState({ ...initSettingsState})
    const setUnit = useCallback((unit: UnitsOfMesurments) => {
        addFieldToSettingsJson('unit', unit, settings)
        setSettings({...settings, unit})
    }, [settings])
    const setTime = useCallback((timeFormat: string) => {
        addFieldToSettingsJson('timeFormat', timeFormat, settings)
        setSettings({...settings, timeFormat})
    }, [settings])
    const setDate = useCallback((dateFormat: string) => {
        addFieldToSettingsJson('dateFormat', dateFormat, settings)
        setSettings({...settings, dateFormat})
    }, [settings])
    const reset = useCallback(() => {
        setSettings({...initSettingsState})
    }, [])
    useEffect(() => {
        if (!loggedIn) {
            return
        }
        const localSettings = localStorage.getItem('settings')
        if (localSettings) {
            const { unit, dateFormat, timeFormat }: SettingsState = JSON.parse(localSettings)
            if (unit) {
                setSettings((prev) => ({...prev, unit}))
            }
            if (dateFormat) {
                setSettings((prev) => ({...prev, dateFormat}))
            }
            if (timeFormat) {
                setSettings((prev) => ({...prev, timeFormat}))
            }
        }
    }, [loggedIn])
    return [settings, {setUnit, setTime, setDate, reset}]
}