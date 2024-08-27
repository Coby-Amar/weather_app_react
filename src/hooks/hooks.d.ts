declare interface ModalsState {
    settings: boolean
    areYouSure: boolean
    loginRegister: boolean
    history: boolean
}


type UnitsOfMesurments = 'Imperial' | 'Metric'
type UnitsOfMesurmentsValues = 'kph' | 'mph' | 'in' | 'mm' | 'mb' | 'km' | 'miles' | '°f' | '°c'

declare interface SettingsState {
    unit: UnitsOfMesurments
    dateFormat: string
    timeFormat: string
}

declare interface SettingsHookFunction {
    setUnit(unit: UnitsOfMesurments): void
    setTime(timeFormat: string): void
    setDate(dateFormat: string): void
    reset(): void
    
} 
declare type SettingsHookResponse = [SettingsState, SettingsHookFunction]