interface BaseModalProps {
    show: boolean
    handleClose: VoidFunction
}

interface BaseModalPropsWithSettings extends BaseModalProps {
    settings: SettingsState
}

interface SubmitModalProps<T extends CallableFunction = VoidFunction> extends BaseModalProps {
    handleSubmit: T
}

type LoginFunction = (data: LoginRegister) => void 
type LoginRegisterModalProps =  SubmitModalProps<LoginFunction>

type StringDataFunction = (data: string) => void 
type UnitDataFunction = (data: UnitsOfMesurments) => void 
declare interface SettingsModalProps extends BaseModalProps {
    setting: SettingsState
    setUnit: UnitDataFunction
    setDate: StringDataFunction
    setTime: StringDataFunction
}
declare interface SettingsModalFormData extends FormData {
    formGroupTemp: string
    formGroupTime: string
    formGroupDate: string                    
}

type GooglePlace = google.maps.places.PlaceResult
type GooglePlacesCallback = (places: GooglePlace, ref?: React.RefObject<HTMLInputElement>, autocompleteRef?: React.RefObject<google.maps.places.Autocomplete>) => void
declare interface SearchBarComponentProps {
    onPlaceSelected: GooglePlacesCallback
}

declare interface NavigationComponentProps {
    user: User | null
}

declare interface CurrentWeatherComponentProps extends CurrentWeatherDetails {
    settings: SettingsState
}

declare interface ForcastWeatherComponentProps extends ForcastWeatherDetails {
    settings: SettingsState
}

declare interface GoogleAutoCompleteItem {
    description: string
    onSelect: VoidFunction
}