import React from 'react';
import './button.css'

function Button({title}) {
    return <button className='btn'>
        {title}
    </button>
}

export default Button;