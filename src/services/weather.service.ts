import { HttpService } from "./http.service"

class WeatherAPIService {
    async getCurrentWeather(lat:number, lon:number): Promise<WeatherDetails>  {
        const result = await HttpService.post('/current', {
            lat,
            lon
        })
        return result.data as WeatherDetails
    }
    async getWeatherDetails(lat:number, lon:number)  {
        const result = await HttpService.post('/weather', {
            lat,
            lon
        })
        console.log('result: ', result)
    }
}

export const WeatherService = new WeatherAPIService()