import { toDate } from "date-fns";
import { Col, Container, Row } from "react-bootstrap";
import { dayToName } from "../utils/dayToName.util";
import { dayWeatherMesurmentsValues } from "../utils/weather.util";

export function ForcastWeatherComponent({
    forecast: {
        forecastday
    },
    settings
}: ForcastWeatherComponentProps) {
    return (
        <Container>
            <Row style={{ backgroundColor: "whitesmoke" }} className="p-2">
                {forecastday.map(({ date, day }) => {
                    const dayUnits = settings.unit === 'Metric' ? day.metric : day.imperial
                    const dayUnitsValues = dayWeatherMesurmentsValues(settings.unit)
                    return (
                        <Col key={'forecastday_' + date} className="d-flex flex-column align-items-center">
                            <span>
                                {dayToName(toDate(date).getUTCDay())}
                            </span>
                            <span>
                                <img src={day.condition.icon} alt={day.condition.text} />
                            </span>
                            <span>
                                {dayUnits.avgtemp} {dayUnitsValues['avgtemp']}
                            </span>
                        </Col>
                    )
                })}
            </Row>
        </Container >
    )
}
