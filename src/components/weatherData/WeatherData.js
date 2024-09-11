import './WeatherData.css'

function WeatherData({weatherData, flagUrl, resetState, defaultFlag}) {
    return (
        <div className='weatherData'>
            <h2 className='locationName'>
                <i className="fa-solid fa-location-dot"></i>
                <span className='margin-span'>{weatherData.name}</span>
                <img className='country' src={flagUrl || defaultFlag} id="country" alt="Bandeira do pais"></img>
            </h2>
            <p className='currentTemp'>
                <span className='margin-span'>{parseInt(weatherData.main.temp)}</span>&deg;C
            </p>
            <div className='tempComtainer'>
                <p>Max / Min</p>
                <p className='tempMax'><span>{parseInt(weatherData.main.temp_max)}</span>&deg;/<span>{parseInt(weatherData.main.temp_min)}</span>&deg;</p>
            </div>
            <div className='descriptionContainer'>
                <p>{weatherData.weather[0].description}</p>
                <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="Condições do tempo"></img>
            </div>

            <div className='detailsContainer'>
                <p className='humidity'>
                    <i className="fa-solid fa-droplet"></i>
                    <span className='margin-span'>{weatherData.main.humidity} %</span>
                </p>
                <p>
                    <i className="fa-solid fa-wind"></i>
                    <span className='margin-span'>{(weatherData.wind.speed * 3.6).toFixed(1)} km/h</span>
                </p>
            </div>
            <input className='resetButton' type='button' value="voltar" onClick={resetState}></input>
        </div>
    );
};

export default WeatherData