import { ConstsService } from "../services/consts.service"

export function currentWeatherMesurmentsValues(unit: UnitsOfMesurments) {
    const result = ConstsService.CURRENT_WEATHER_SWITCH[unit]
    if (result) {
        return result
    }
    throw Error('missing unit mesurments values')
}

export function dayWeatherMesurmentsValues(unit: UnitsOfMesurments) {
    const result = ConstsService.DAY_WEATHER_SWITCH[unit]
    if (result) {
        return result
    }
    throw Error('missing unit mesurments values')

}