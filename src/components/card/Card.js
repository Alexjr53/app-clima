// comentar o codigo
// criar outros componentes / reutilizar componentes
// adicionar imagens de fundo que tenha relação com a cidade pesquisada
// arrumar o App.js




import { searchLocation, searchFlags } from '../services/api'
import { useState } from 'react';
import './Card.css'
import defaultFlag from '../../assets/images/bandeira-padrao.png';

function Card() {
    const [location, setLocation] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [weatherData, setweatherData] = useState(null);
    const [flagUrl, setFlagUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    const handleInputChange = (e) => {
        setLocation(e.target.value)
    }

    const handleSearch = async (location) => {
        try {
            if(!location){ // valida se o campo do inputa está vazio
                setweatherData(null);
                setErrorMessage('Por favor, digite o nome de uma cidade ou Pais');
                return; 
            }

            setLocation(location)
            setIsVisible(true);
            const data = await searchLocation(location);

            if (data.cod !== 200) { //valida se o nome da cidade existe
                setErrorMessage('Local não encontrado. Por favor tente novamente')
                setweatherData(null);
                return; 
            }
            setweatherData(data);
            setErrorMessage('');

            const country = data.sys.country
            const dataFlag = await searchFlags(country)
            setFlagUrl(dataFlag[0].flags.png);
            
        } catch (error) {
            setErrorMessage('Ocorreu um erro ao buscar os dados. Tente novamente mais tarde.')
        }
    }

    const handleKeyDown = (event)=>{
        if (event.key === 'Enter') {
            handleSearch(location)
        }
    }

    const resetState = ()=>{
        setErrorMessage('');
        setweatherData(null);
        setLocation('');
    }

    return (
        <div className="card">

            <h1>Confira o clima de uma cidade:</h1>
            
            <div className="formContainer">
                <input className='mainInput' type="text" placeholder="Digite o nome da cidade" onKeyDown={handleKeyDown} onChange={handleInputChange} value={location}></input>
                <button onClick={()=>handleSearch(location)}><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>

            {errorMessage && 
                <div className='errorContainer'>
                    <p className='error'>{errorMessage}</p>
                    <input className='resetButton' type='button' value="voltar" onClick={resetState}></input>
                </div>
            
            }

            {isVisible && weatherData ? (
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
            ):( !errorMessage && (
                <div className='locationOptions'>
                   <input className='options' type='button' value='São Paulo' onClick={()=>handleSearch('São paulo')}></input>
                   <input className='options' type='button' value='Rio de Janeiro' onClick={()=>handleSearch('Rio de Janeiro')}></input>
                   <input className='options' type='button' value='Brasília' onClick={()=>handleSearch('Brasília')}></input>
                   <input className='options' type='button' value='Nova york' onClick={()=>handleSearch('Nova york')}></input>
                   <input className='options' type='button' value='Tokyo' onClick={()=>handleSearch('Tokyo')}></input>
                   <input className='options' type='button' value='amsterdam' onClick={()=>handleSearch('amsterdam')}></input>
                </div>
                )
            )}
        </div>
    )
}

export default Card