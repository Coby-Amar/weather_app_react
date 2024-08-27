import { Form, InputGroup } from "react-bootstrap"
import { Search } from "react-bootstrap-icons"
import { usePlacesWidget } from "react-google-autocomplete"

export function SearchBarComponent({ onPlaceSelected }: SearchBarComponentProps) {
    const { ref } = usePlacesWidget<HTMLInputElement>({
        apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
        libraries: ['places'],
        options: { fields: ['geometry.location'] },
        onPlaceSelected
    })
    return (
        <InputGroup className="mb-12">
            <InputGroup.Text><Search /></InputGroup.Text>
            <Form.Control
                inputMode="text"
                autoComplete="on"
                ref={ref}
                type="text"
                placeholder="Search weather in cities"
            />
        </InputGroup>
    )
}
