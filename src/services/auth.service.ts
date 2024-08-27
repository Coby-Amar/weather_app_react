import { HttpService } from "./http.service"

class AuthAPIService {
    async register(data: LoginRegister): Promise<User>  {
        const response = await HttpService.post('/auth/signup', data)
        return response.data
    }
    async login(data: LoginRegister): Promise<User> {
        const response = await HttpService.post('/auth/login', data)
        return response.data
    }
    async logout(): Promise<boolean> {
        return HttpService.post('/auth/logout')
    }
}

export const AuthService = new AuthAPIService()