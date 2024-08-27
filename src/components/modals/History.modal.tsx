import { useEffect, useState } from "react"
import { format, toDate } from "date-fns"
import { Col, Container, ListGroup, Modal, Row } from "react-bootstrap"
import { InfoLg } from "react-bootstrap-icons"

import { UserService } from "../../services/user.service"
import { currentWeatherMesurmentsValues } from "../../utils/weather.util"

export function HistoryModal({ show, handleClose, settings }: BaseModalPropsWithSettings) {
    const [forcasts, setForcasts] = useState<ForcastWeatherDetails[]>([])
    useEffect(() => {
        if (show) {
            UserService.getUserHistory()
                .then(data => setForcasts(data))
                .catch((error) => console.error('error: ', error))
        }
    }, [show])
    const isMetric = settings.unit === 'Metric'
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>History</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {forcasts.length < 1 ?
                        <><span>Nothing to see here</span> <span className="fw-light" >(start searching 😉)</span></>
                        :
                        forcasts.map(({ id, createdAt, location, current: { condition, metric, imperial } }) => {
                            const units = isMetric ? metric : imperial
                            const values = currentWeatherMesurmentsValues(settings.unit)
                            return (
                                <ListGroup.Item className="d-flex" key={id}>
                                    <Container>
                                        <Row>
                                            <Col>
                                                {location.name},{location.region}
                                            </Col>
                                            <Col className="d-flex justify-content-between">
                                                <span>
                                                    {settings.dateFormat ?
                                                        format(createdAt, settings.dateFormat)
                                                        : toDate(createdAt).toLocaleDateString()
                                                    }
                                                </span>
                                                <span>
                                                    {settings.timeFormat ?
                                                        format(toDate(createdAt).toLocaleString(), settings.timeFormat)
                                                        : toDate(createdAt).getUTCDate()
                                                    }
                                                </span>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Container>
                                                <Row>
                                                    <Col>
                                                        Consdition: {condition.text}
                                                    </Col>
                                                    <Col>
                                                        Temp: {units.temp}  {values['temp']}
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        Wind: {units.wind}  {values['wind']}
                                                    </Col>
                                                    <Col>
                                                        Precip: {units.precip}  {values['precip']}
                                                    </Col>
                                                </Row>
                                                Pressure: {units.pressure}  {values['pressure']}
                                            </Container>
                                        </Row>
                                    </Container>
                                    <InfoLg onClick={() => alert('TODO')} />
                                </ListGroup.Item>)
                        })}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal >
    )
}