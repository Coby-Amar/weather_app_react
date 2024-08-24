import ReactGoogleAutocomplete from 'react-google-autocomplete'
import './App.css'
import { WeatherService } from './services/weather.service'

function App() {
  return (
    <>

      <ReactGoogleAutocomplete
        placeholder="Enter city"
        apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
        libraries={['places']}
        options={{ fields: ['geometry.location'] }}
        onPlaceSelected={({ geometry: { location: { lat, lng } } }) => {
          WeatherService.getWeatherDetails(lat(), lng())

        }}

      />
    </>
  )
}

export default App
