import './ErrorMessage.css'


function ErrorMessage({errorMessage, resetState}){
    return(
        (errorMessage && 
            <div className='errorContainer'>
                <p className='error'>{errorMessage}</p>
                <input className='resetButton' type='button' value="voltar" onClick={resetState}></input>
            </div>
        )
    );
};

export default ErrorMessage