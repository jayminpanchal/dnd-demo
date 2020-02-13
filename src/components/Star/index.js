import React from 'react';
import {IoIosStar} from 'react-icons/io';

const Star = () => {
    return (
        <div className='starContainer'>
            <span className='star smallStar'>
                <IoIosStar />
            </span>
            <span className='star largeStar'>
                <IoIosStar />
            </span>
            <span className='star smallStar'>
                <IoIosStar />
            </span>
        </div>
    )
};

export default Star;