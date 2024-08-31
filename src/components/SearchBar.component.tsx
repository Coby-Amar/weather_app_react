import { useRef, useState } from "react";
import { Container, Form, InputGroup, Overlay, Spinner } from "react-bootstrap"
import { GeoAltFill, Search } from "react-bootstrap-icons"
import usePlacesAutocompleteService from "react-google-autocomplete/lib/usePlacesAutocompleteService"

export function SearchBarComponent({ onPlaceSelected }: SearchBarComponentProps) {
    const target = useRef(null);
    const [value, setValue] = useState('');
    const [show, setShow] = useState(false);
    const {
        getPlacePredictions,
        placePredictions,
        isPlacePredictionsLoading,
        placesService,
    } = usePlacesAutocompleteService({
        apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
        libraries: ['places'],
        options: { fields: ['geometry.location'] },
        debounce: 700
    })
    return (
        <InputGroup className="mb-12">
            <InputGroup.Text><Search size={20} /></InputGroup.Text>
            <Form.Control
                inputMode="text"
                autoComplete="on"
                ref={target}
                value={value}
                type="text"
                placeholder="Search weather in cities"
                onChange={e => {
                    getPlacePredictions({
                        input: e.target.value,
                        locationBias: 'IP_BIAS',
                        types: ['neighborhood']
                    }), setValue(e.target.value)
                }}
                onFocus={() => setShow(true)}
                onBlur={() => setShow(false)}
            />
            {isPlacePredictionsLoading && <InputGroup.Text><Spinner /></InputGroup.Text>}
            <Overlay target={target.current} show={placePredictions.length > 0 && show} placement="bottom">
                {({
                    style,
                    ref,
                }) => (
                    <div
                        ref={ref}
                        style={{
                            ...style,
                            width: '100%',
                            marginLeft: 'auto'
                        }}
                    >
                        {placePredictions.map((props) =>
                            <GoogleAutoCompleteItem
                                {...props}
                                onSelect={() => {
                                    setValue('')
                                    getPlacePredictions({ input: '' })
                                    placesService?.getDetails({ placeId: props.place_id, fields: ['geometry.location',] },
                                        (result: GooglePlace) => {
                                            onPlaceSelected(result)
                                        })
                                }}
                            />
                        )}
                    </div>
                )}
            </Overlay>
        </InputGroup>
    )
}



function GoogleAutoCompleteItem({ description, onSelect }: GoogleAutoCompleteItem) {
    return (
        <Container className="d-flex align-content-center bg-body border w-100 p-2 btn hightlight" onClick={onSelect}>
            <GeoAltFill color="red" size={20} />
            <span className="ms-3">
                {description}
            </span>
        </Container>
    )
}