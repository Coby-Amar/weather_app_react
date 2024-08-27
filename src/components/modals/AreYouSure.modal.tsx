import { Button, Modal } from "react-bootstrap";

export function AreYouSureModal({ show, handleClose, handleSubmit }: SubmitModalProps) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Are you Sure?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    No
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal >
    )
}