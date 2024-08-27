import { Button, Col, Container, Form, Offcanvas, Row } from "react-bootstrap"
import { Trash3Fill } from "react-bootstrap-icons"
import { RoutesService } from "../../services/routes.service"

export function SettingsModal({ show, handleClose, setting, ...settingsSetters }: SettingsModalProps) {
    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Settings</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form>
                    <Container className="d-grid row-gap-4">
                        <Row className="justify-content-between">
                            <Col>
                                <Form.Label>
                                    Units of measurement:
                                </Form.Label>
                            </Col>
                            <Col className="d-flex justify-content-between">
                                <Form.Group onChange={(e) => {
                                    const value = (e.target as HTMLInputElement).value
                                    settingsSetters.setUnit(value as UnitsOfMesurments)
                                }}>
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="Imperial"
                                        name="formGroupTemp"
                                        value="Imperial"
                                        defaultChecked={setting.unit === 'Imperial'}
                                    />
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="Metric"
                                        value="Metric"
                                        name="formGroupTemp"
                                        defaultChecked={setting.unit === 'Metric'}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>
                                    Date Format:
                                </Form.Label>
                            </Col>
                            <Col>
                                <Form.Group onChange={(e) => {
                                    const value = (e.target as HTMLInputElement).value
                                    settingsSetters.setDate(value)
                                }}>
                                    <Form.Check
                                        type="radio"
                                        label="Default"
                                        name="formGroupDate"
                                        value=""
                                        defaultChecked={!setting.dateFormat}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Month-Day-Year (01/31/2000)"
                                        name="formGroupDate"
                                        value="MM/dd/yyyy"
                                        defaultChecked={setting.dateFormat === 'MM/dd/yyyy'}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Day-Month-Year (31/01/2000)"
                                        name="formGroupDate"
                                        value="dd/MM/yyyy"
                                        defaultChecked={setting.dateFormat === 'dd/MM/yyyy'}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>
                                    Time Format:
                                </Form.Label>
                            </Col>
                            <Col>
                                <Form.Group onChange={(e) => {
                                    const value = (e.target as HTMLInputElement).value
                                    settingsSetters.setTime(value)
                                }}>
                                    <Form.Check
                                        type="radio"
                                        label="Default"
                                        name="formGroupTime"
                                        value=""
                                        defaultChecked={!setting.timeFormat}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="12 hours (1:00 pm)"
                                        name="formGroupTime"
                                        value="hh:mm aaa"
                                        defaultChecked={setting.timeFormat === 'hh:mm aaa'}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="24 hours (13:00)"
                                        name="formGroupTime"
                                        value="HH:mm"
                                        defaultChecked={setting.timeFormat === 'HH:mm'}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Button className="w-100" variant="danger" href={RoutesService.deleteHash}><Trash3Fill /> Delete Account</Button>
                        </Row>
                    </Container>
                </Form>
            </Offcanvas.Body>
        </Offcanvas >
    )
}