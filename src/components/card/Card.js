import './Card.css'
import { searchLocation, searchFlags, searchImages } from '../services/api'
import { useEffect, useState } from 'react';
import defaultFlag from '../../assets/images/bandeira-padrao.png';
import defaultBackground from '../../assets/images/background-padrao.jpg'
import SearchInput from '../searchInput/SearchInput';
import ErrorMessage from '../errorMessage/ErrorMessage';
import WeatherData from '../weatherData/WeatherData';
import LocationOptions from '../locationOptions/LocationOptions';

function Card() {
    const [location, setLocation] = useState('');
    const [weatherData, setweatherData] = useState(false);
    const [flagUrl, setFlagUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [imagesUrl, setImagesUrl] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if (imagesUrl) {
            document.body.style.backgroundImage = `url(${imagesUrl})`;
        }
    }, [imagesUrl]);

    const handleInputChange = (event) => {
        setLocation(event.target.value) //Atualiza o estado 'location' com o valor do input
    }

    const handleSearch = async (location) => {
        if(!location){ 
            setweatherData(false);
            setErrorMessage('Por favor, digite o nome de uma cidade ou Pais');
            return; 
        }

        setLocation(location);
        setLoading(true);
        
        try {
            const data = await searchLocation(location); //usa location para buscar os dados de clima
            if (data.cod !== 200) { 
                setErrorMessage('Local não encontrado. Por favor tente novamente');
                setLocation('');
                setweatherData(false);
                setLoading(false); 
                return; 
            }
            
            const {hits} = await searchImages(location);//usa location para buscar a imagem do local correspondente
            setImagesUrl(hits[0].webformatURL)//armazena a url da imagem

            const dataFlag = await searchFlags(data.sys.country)//usa o codigo do pais para poder buscar na api das bandeiras
            setFlagUrl(dataFlag[0].flags.png);//armazena a url da imagem

            setweatherData(data);
            setErrorMessage('');
            
        } catch (error) {
            setweatherData(false);
            setImagesUrl(defaultBackground)
            setErrorMessage('Ocorreu um erro ao buscar os dados. Tente novamente mais tarde.')
        } finally {
            setLoading(false); // Finaliza o carregamento independentemente do resultado
        }
    }

    const handleKeyDown = (event)=>{ //faz a busca com o "enter"
        if (event.key === 'Enter') {
            handleSearch(location)
        }
    }

    const resetState = ()=>{ //Reseta o estado do componente para os valores iniciais
        setLoading(true); 
        setTimeout(() => {
            setLoading(false); 
            setErrorMessage('');
            setweatherData(false);
            setLocation('');
            setImagesUrl(defaultBackground)
        }, 500);
    }

    return (
        <div className="card">

            <h1>Confira o clima de uma cidade:</h1>
            <SearchInput location={location} handleInputChange={handleInputChange} handleKeyDown={handleKeyDown} handleSearch={handleSearch}/>
            <ErrorMessage errorMessage={errorMessage} resetState={resetState}/>

            {loading && <div className="loading"><p>Carregando...</p></div>}
            {loading && <div className="overlay"></div>}

            {weatherData ? (
                <WeatherData weatherData={weatherData} flagUrl={flagUrl} resetState={resetState} defaultFlag={defaultFlag}/>
            ):( 
                !errorMessage && <LocationOptions handleSearch={handleSearch}/>
            )}
        </div>
    )
}

export default Card