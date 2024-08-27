export class ConstsService {
    static DASHBOARD= 'dashboard'
    static HISTORY= 'history'
    static LOGIN = 'login'
    static REGISTER = 'register'
    static ARE_YOU_SURE = 'are_you_sure'
    static DELETE = 'delete'
    static LOGOUT = 'logout'
    static SETTINGS = 'settings'
    static CURRENT_WEATHER_SWITCH: WeatherSwitch = {
        'Imperial': {
            dewpoint: '°f',
            feelslike: '°f',
            gust: 'mph',
            heatindex: '°f',
            precip: 'in',
            pressure: 'in',
            temp: '°f',
            vis: 'miles',
            wind: 'mph',
            windchill: '°f'
        },
        'Metric': {
            dewpoint: '°c',
            feelslike: '°c',
            gust: 'kph',
            heatindex: '°c',
            precip: 'mm',
            pressure: 'mb',
            temp: '°c',
            vis: 'km',
            wind: 'kph',
            windchill: '°c'
        },
    }
    static DAY_WEATHER_SWITCH: WeatherSwitch = {
        'Imperial': {
            maxtemp: '°f',
            mintemp: '°f',
            avgtemp: '°f',
            maxwind: 'mph',
            totalprecip: 'in',
            avgvis: 'miles',
        },
        'Metric': {
            maxtemp: '°c',
            mintemp: '°c',
            avgtemp: '°c',
            maxwind: 'kph',
            totalprecip: 'mm',
            avgvis: 'km',
        },
    }
}