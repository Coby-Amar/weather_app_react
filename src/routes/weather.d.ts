declare interface WeatherCondition {
    text: string,
    icon: string,
    code: number
}

declare interface WeatherAstro {
    sunrise: string
    sunset: string
    moonrise: string
    moonset: string
    moon_phase: string
    moon_illumination: number
}

declare interface WeatherAlert {
    headline: string
    msgtype: string
    severity: string
    urgency: string
    areas: string
    category: string
    certainty: string
    event: string
    note: string
    effective: string | Date
    expires: string | Date
    desc: string
    instruction: string
}

declare interface CurrentWeatherDetailsMeasurements {
    dewpoint: number
    feelslike: number
    gust: number
    heatindex: number
    precip: number
    pressure: number
    temp: number
    vis: number
    wind: number
    windchill: number
}
declare interface CurrentWeatherDetails {
    cloud: number
    condition: WeatherCondition
    uv: number
    wind_degree: number
    wind_dir: string
    humidity: number
    is_day: number
    last_updated: string
    last_updated_epoch: number
    imperial: CurrentWeatherDetailsMeasurements
    metric: CurrentWeatherDetailsMeasurements
}
declare interface HourlyWeatherDetails extends CurrentWeatherDetails {
    time_epoch: number
    time: string | Date
    will_it_rain: number
    chance_of_rain: number
    will_it_snow: number
    chance_of_snow: number
}

declare interface WeatherDetailLocation {
    country: string
    lat: number
    lon: number
    localtime: string
    localtime_epoch: number
    name: string
    region: string
    tz_id: string
}

declare interface WeatherDetails {
    location: WeatherDetailLocation
    current: CurrentWeatherDetails
}

declare interface DayWeatherDetailsMesurments {
    maxtemp: number
    mintemp: number
    avgtemp: number
    maxwind: number
    totalprecip: number
    avgvis: number
}
declare interface DayWeatherDetails {
    avghumidity: number
    daily_will_it_rain: number
    daily_chance_of_rain: number
    daily_will_it_snow: number
    daily_chance_of_snow: number
    condition: WeatherCondition
    uv: number
    imperial: DayWeatherDetailsMesurments
    metric: DayWeatherDetailsMesurments
}

declare interface ForcastWeatherDetails {
    id: string
    createdAt: string
    location: WeatherDetailLocation
    current: CurrentWeatherDetails
    forecast: {
        forecastday: [{
            date: string
            date_epoch: number
            day: DayWeatherDetails,
            astro: WeatherAstro
            hour: HourlyWeatherDetails[]
        }]
    }
    alerts: {
        alert: WeatherAlert[]
    }
}