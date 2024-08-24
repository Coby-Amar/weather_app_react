import { HttpService } from "./http.service"

class AuthAPIService {
    userId: string | null = null
    async register(data: LoginRegister)  {
        const result = await HttpService.post('/auth/register', data)
        this.userId = result.data.id 
    }
    async login(data: LoginRegister)  {
        const result = await HttpService.post('/auth/login', data)
        this.userId = result.data.id 
    }
}

export const AuthService = new AuthAPIService()