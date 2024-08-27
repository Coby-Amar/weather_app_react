import { ConstsService } from "./consts.service"

export class RoutesService {
    static dashboardRoute = '/' + ConstsService.DASHBOARD
    static loginHash = '#' + ConstsService.LOGIN
    static registerHash = '#' + ConstsService.REGISTER
    static historyHash = '#' + ConstsService.HISTORY
    static settingsHash = '#' + ConstsService.SETTINGS
    static logoutHash = '#' + ConstsService.ARE_YOU_SURE + '#' + ConstsService.LOGOUT
    static deleteHash = '#' + ConstsService.ARE_YOU_SURE + '#' + ConstsService.DELETE
}