import { useState } from "react";
import { Button, Form, InputGroup, Modal, NavLink } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";

interface LoginModalProps {
    show: boolean
    handleClose: VoidFunction
    handleLogin(data: LoginRegister): void
}

const initalFormState = { username: '', password: '', confirmPassword: '', showPassword: false, showConfirmPassword: false }

export function LoginModal({ show, handleClose, handleLogin }: LoginModalProps) {
    const location = useLocation()
    const [formState, setFormState] = useState({ ...initalFormState })
    const name = location.hash.slice(1) ?? ''
    const isLogin = name === 'login'
    const isRegister = !isLogin
    const title = name.charAt(0).toLocaleUpperCase() + name.slice(1)
    return (
        <Modal show={show} onHide={handleClose}>
            <Form className="justify-content-md-center" onSubmit={(e) => {
                e.preventDefault()
                handleLogin(formState)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter username"
                            aria-describedby="usernameHelpBlock"
                            value={formState.username}
                            onChange={(e) => {
                                e.preventDefault()
                                const username = e.target.value
                                setFormState({ ...formState, username })
                            }}
                        />
                        {isRegister &&
                            <Form.Text id="usernameHelpBlock">
                                Your username <span className="fw-bold text-success">must</span> be a <span className="fw-bold text-info">valid</span> email address.
                            </Form.Text>
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                            <Form.Control
                                placeholder="Password"
                                aria-describedby="passwordHelpBlock"
                                type={formState.showPassword ? 'text' : 'password'}
                                value={formState.password}
                                onChange={(e) => {
                                    e.preventDefault()
                                    const password = e.target.value
                                    setFormState({ ...formState, password })
                                }}
                            />
                            <InputGroup.Text onClick={() => setFormState(prev => ({ ...prev, showPassword: !prev.showPassword }))}>
                                {formState.showPassword ? <EyeFill /> : <EyeSlashFill />}
                            </InputGroup.Text>
                        </InputGroup>
                        {isRegister &&
                            <Form.Text id="passwordHelpBlock">
                                Your password <span className="fw-bold text-success">must</span> be 8-20 characters long, contain lower and capital letters, numbers, and special characters.
                                It should <span className="fw-bold text-danger">not</span> contain spaces or emojis.
                            </Form.Text>
                        }
                    </Form.Group>
                    {isRegister &&
                        <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
                            <Form.Label>Confirm password</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Confirm password"
                                    aria-describedby="confirmPasswordHelpBlock"
                                    type={formState.showConfirmPassword ? 'text' : 'password'}
                                    value={formState.confirmPassword}
                                    onChange={(e) => {
                                        e.preventDefault()
                                        const confirmPassword = e.target.value
                                        setFormState({ ...formState, confirmPassword })
                                    }}
                                />
                                <InputGroup.Text onClick={() => setFormState(prev => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }))}>
                                    {formState.showConfirmPassword ? <EyeFill /> : <EyeSlashFill />}
                                </InputGroup.Text>
                            </InputGroup>
                            <Form.Text id="confirmPasswordHelpBlock">
                                Re-enter password
                            </Form.Text>
                        </Form.Group>
                    }
                    {isLogin ?
                        <em>
                            Don't have an account? <NavLink
                                className="d-inline text-info-emphasis fw-semibold"
                                href="#register" onClick={() => setFormState({ ...initalFormState })}
                            >
                                Register here
                            </NavLink>
                        </em>
                        :
                        <em>
                            Have an account? <NavLink
                                className="d-inline text-info-emphasis fw-semibold"
                                href="#login"
                                onClick={() => setFormState({ ...initalFormState })}
                            >
                                Login here
                            </NavLink>
                        </em>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}