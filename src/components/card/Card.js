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

    useEffect(()=>{
        if (imagesUrl) {
            document.body.style.backgroundImage = `url(${imagesUrl})`;
        }
    }, [imagesUrl]);

    const handleInputChange = (event) => {
        setLocation(event.target.value) //Atualiza o estado 'location' com o valor do input
    }

    const handleSearch = async (location) => {
        try {
            if(!location){ // valida se o campo do input está vazio 
                setweatherData(false);
                setErrorMessage('Por favor, digite o nome de uma cidade ou Pais');
                return; 
            }

            setLocation(location);
            
            const data = await searchLocation(location); //usa location para buscar os dados de clima
            if (data.cod !== 200) { //verifica se a api retornou algo invalido / indica que a cidade ou pais não foram encontrados
                setErrorMessage('Local não encontrado. Por favor tente novamente');
                setLocation('');
                setweatherData(false);
                return; 
            }
            
            const {hits} = await searchImages(location);//usa location para buscar a imagem do local correspondente
            setImagesUrl(hits[0].webformatURL)//armazena a url da imagem

            const dataFlag = await searchFlags(data.sys.country)//usa o codigo do pais para poder buscar na api das bandeiras
            setFlagUrl(dataFlag[0].flags.png);//armazena a url da imagem

            setweatherData(data); //armazena os dados que retornam da função searchLocation
            setErrorMessage('');

            
        } catch (error) {
            setweatherData(false);
            setImagesUrl(defaultBackground)
            setErrorMessage('Ocorreu um erro ao buscar os dados. Tente novamente mais tarde.')
        }
    }

    const handleKeyDown = (event)=>{ //faz a busca com o "enter"
        if (event.key === 'Enter') {
            handleSearch(location)
        }
    }

    const resetState = ()=>{ //Reseta o estado do componente para os valores iniciais
        setErrorMessage('');
        setweatherData(false);
        setLocation('');
        setImagesUrl(defaultBackground)
    }

    return (
        <div className="card">

            <h1>Confira o clima de uma cidade:</h1>
            <SearchInput location={location} handleInputChange={handleInputChange} handleKeyDown={handleKeyDown} handleSearch={handleSearch}/>
            <ErrorMessage errorMessage={errorMessage} resetState={resetState}/>

            {weatherData ? (
                <WeatherData weatherData={weatherData} flagUrl={flagUrl} resetState={resetState} defaultFlag={defaultFlag}/>
            ):( 
                !errorMessage && <LocationOptions handleSearch={handleSearch}/>
            )}
        </div>
    )
}

export default Card