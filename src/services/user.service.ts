import { HttpService } from "./http.service"

class UserAPIService {
    async getUser()  {
        const response = await HttpService.get('/user')
        return response.data as User
    }
    async deleteUser()  {
        return HttpService.delete('/user')
    }
    async getUserHistory()  {
        const response = await HttpService.get('/forcast')
        return (response.data as ForcastWeatherDetails[]).reverse()
    }
}

export const UserService = new UserAPIService()