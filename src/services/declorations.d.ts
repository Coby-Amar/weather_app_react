declare type WeatherSwitch = {
    [key in UnitsOfMesurments]: {
        [key: string]: UnitsOfMesurmentsValues
    }
}

declare interface User {
    name: string
}

declare interface LoginRegister {
    username: string
    password: string 
}

declare interface UserData extends LoginRegister {
    id: string
}