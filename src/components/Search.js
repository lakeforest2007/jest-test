import React, { useState, useEffect } from 'react'
import '../styles/search.css'

function Search() {

    const [val, setVal] = useState('');

    function onInputChange(e) {

        setVal(e.target.value);
    }

    return (
        <div>  
            <form data-test='form'>
                <input className='input' data-test='testInput' value={val} onChange={onInputChange}  placeholder='type here'></input>
                <button data-test='testButton'>Submit</button>
            </form>
        </div>
    )
}

export default Search

