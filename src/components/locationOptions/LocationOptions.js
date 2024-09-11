import './LocationOptions.css'

const locations = [
    'São Paulo',
    'Rio de Janeiro',
    'Brasília',
    'Nova York',
    'Tokyo',
    'Amsterdam'
];

function LocationOptions({handleSearch}) {
    return (
        <div className='locationOptions'>
            {locations.map(location=>(
                <input className='options' type='button' key={location} value={location} onClick={() => handleSearch(location)}></input>
            ))}
        </div>
    );
}

export default LocationOptions