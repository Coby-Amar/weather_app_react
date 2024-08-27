import { HttpService } from "./http.service"

class WeatherAPIService {
    async getCurrentWeather(lat:number, lon:number): Promise<WeatherDetails>  {
        const result = await HttpService.post('/current', {
            lat,
            lon
        })
        return result.data as WeatherDetails
    }
    async getCurrentWeatherForcast(lat:number, lon:number): Promise<ForcastWeatherDetails>  {
        const result = await HttpService.get('/forcast/current', {
            params: {
                lat,
                lon
            }
        })
        return result.data as ForcastWeatherDetails
    }
    async getWeatherForcast(lat:number, lon:number)  {
        const result = await HttpService.post('/forcast', {
            lat,
            lon
        })
        return result.data as ForcastWeatherDetails
    }
}

export const WeatherService = new WeatherAPIService()