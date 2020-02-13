import React from 'react';

const Input = ({onChange , ...rest}) => {
    return (
        <input onChange={onChange} {...rest} />
    )
};

export default Input;