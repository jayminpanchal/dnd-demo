import React, {useRef} from 'react'
import {useDrag, useDrop} from 'react-dnd';

import Label from '../Label';
import Button from '../Button';
import Input from '../Input';
import Star from '../Star';
import componentTypes from '../../utils/componentTypes';

const ComponentWrapper = ({id, text, index, moveCard, type}) => {
    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: componentTypes.CARD,
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex
        },
    });
    const [{isDragging}, drag] = useDrag({
        item: {type: componentTypes.CARD, id, index},
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    const renderComponent = () => {
        switch (type) {
            case componentTypes.SMALL_LABEL:
                return <Label className='small'>
                    (ניתן להסיר את המייל מרשימת התפוצה בכל עת)
                </Label>;
            case componentTypes.LARGE_LABEL:
                return <Label className='large'>
                    רוצה לקבל ממנ עדכון <br/>
                    כל פעם שיש משהו חדש?
                </Label>;
            case componentTypes.BUTTON:
                return <Button>
                    להרשמה
                </Button>;
            case componentTypes.INPUT:
                return <Input placeholder='מייל:'/>;
            case componentTypes.STAR:
                return <Star/>;
        }
    };

    return (
        <div ref={ref} style={{opacity}}>
            {renderComponent()}
        </div>
    )
};

export default ComponentWrapper;