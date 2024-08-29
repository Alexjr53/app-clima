const apiKey = process.env.REACT_APP_API_KEY;
const lang = 'pt_br'

export const searchLocation = async (location) =>{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}&lang=${lang}`
    const response = await fetch(url)
    const data = response.json()
    return data;

}


export const searchFlags = async (country) =>{
    try {
        const flagUrl = `https://restcountries.com/v3.1/alpha/${country}`;
        const response = await fetch(flagUrl)
        if (!response.ok) {
            throw new Error('Failed to fetch flag data');
        }

        const flagsData = response.json()
        return flagsData;
    } catch (error) {
        console.error('Error fetching flag:', error);
        return '';
    }
}