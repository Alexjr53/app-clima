import './SearchInput.css'

function SearchInput({handleKeyDown, handleInputChange, handleSearch, location}){
    return(
        <div className="formContainer">
            <input className='mainInput' type="text" placeholder="Digite o nome da cidade" onKeyDown={handleKeyDown} onChange={handleInputChange} value={location}></input>
            <button onClick={()=>handleSearch(location)}><i className="fa-solid fa-magnifying-glass"></i></button>
        </div>
    );
};

export default SearchInput