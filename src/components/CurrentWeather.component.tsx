import { Col, Container, Row } from "react-bootstrap";
import { currentWeatherMesurmentsValues } from "../utils/weather.util";

export function CurrentWeatherComponent({
    condition,
    settings,
    metric,
    imperial,
}: CurrentWeatherComponentProps) {
    const units = settings.unit === 'Metric' ? metric : imperial
    const values = currentWeatherMesurmentsValues(settings.unit)
    return (
        <Container>
            <Row style={{ backgroundColor: "whitesmoke" }} className="p-2">
                <Col className="d-flex flex-row align-items-center">
                    <img
                        src={condition.icon}
                        alt={condition.text}
                        className="img-fluid"
                    />
                    <span className="fs-2">{condition.text}</span>
                </Col>
                <Col sm="auto" className="d-flex align-items-center">
                    <span className="fs-2">{units.temp} {values['temp']}</span>
                </Col>
                <Col sm="auto" className="d-flex flex-column justify-content-center align-items-center">
                    <span className="fs-6">Wind: {units.wind} {values['wind']}</span>
                    <span className="fs-6">Precip: {units.precip} {values['precip']}</span>
                    <span className="fs-6">Pressure: {units.pressure} {values['pressure']}</span>
                </Col>
            </Row>
        </Container >
    )
}
