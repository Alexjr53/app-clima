import './LocationOptions.css'

function LocationOptions({handleSearch}) {
    return (
        <div className='locationOptions'>
            <input className='options' type='button' value='São Paulo' onClick={() => handleSearch('São paulo')}></input>
            <input className='options' type='button' value='Rio de Janeiro' onClick={() => handleSearch('Rio de Janeiro')}></input>
            <input className='options' type='button' value='Brasília' onClick={() => handleSearch('Brasília')}></input>
            <input className='options' type='button' value='Nova york' onClick={() => handleSearch('Nova york')}></input>
            <input className='options' type='button' value='Tokyo' onClick={() => handleSearch('Tokyo')}></input>
            <input className='options' type='button' value='amsterdam' onClick={() => handleSearch('amsterdam')}></input>
        </div>
    );
}

export default LocationOptions