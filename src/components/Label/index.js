import React from 'react';

const Label = ({children, className}) => {
    return (
        <p className={className}>
            {children}
        </p>
    )
};

export default Label;