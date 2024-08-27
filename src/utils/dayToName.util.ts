const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export function dayToName(day: number) {
    if (day > 6 || day < 0) {
        throw Error('Out of bounds')
    }
    return days[day]
}