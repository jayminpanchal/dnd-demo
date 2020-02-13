import React, {useState, useCallback} from 'react';
import update from 'immutability-helper';
import {SketchPicker} from 'react-color';
import {CodeBlock} from 'react-code-blocks';

import ComponentWrapper from '../ComponentWrapper';
import componentTypes from '../../utils/componentTypes';

const style = {
    width: '470px',
    height: '470px',
    borderRadius: '50%',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    display: 'flex'
};
const InnerStyle = {
    width: '450px',
    height: '450px',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    border: '2px solid #FFF'
};
const popover = {
    position: 'absolute',
    zIndex: '2',
};
const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
};
const color = {
    width: '36px',
    height: '14px',
    borderRadius: '2px',
};
const swatch = {
    padding: '5px',
    background: '#fff',
    borderRadius: '1px',
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    display: 'inline-block',
    cursor: 'pointer',
    marginLeft: '20px'
};

const Container = () => {
    const [background, setBackground] = useState('#E8795B');
    const [showPicker, setShowPicker] = useState(false);
    const [cards, setCards] = useState([
        {
            id: 1,
            type: componentTypes.STAR

        },
        {
            id: 2,
            type: componentTypes.LARGE_LABEL

        },
        {
            id: 3,
            type: componentTypes.INPUT
        },
        {
            id: 4,
            type: componentTypes.BUTTON
        },
        {
            id: 5,
            type: componentTypes.SMALL_LABEL
        },
    ]);
    const moveCard = useCallback(
        (dragIndex, hoverIndex) => {
            const dragCard = cards[dragIndex];
            setCards(
                update(cards, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragCard],
                    ],
                }),
            )
        },
        [cards],
    );
    const renderComponent = (type) => {
        switch (type) {
            case componentTypes.SMALL_LABEL:
                return `<Label className='small'>
                    (ניתן להסיר את המייל מרשימת התפוצה בכל עת)
                </Label>\n`;
            case componentTypes.LARGE_LABEL:
                return `<Label className='large'>
                    רוצה לקבל ממנ עדכון <br/>
                    כל פעם שיש משהו חדש?
                </Label>\n`;
            case componentTypes.BUTTON:
                return `<Button>
                    להרשמה
                </Button>\n`;
            case componentTypes.INPUT:
                return `<Input placeholder='מייל:'/>\n`;
            case componentTypes.STAR:
                return `<Star/>\n`;
        }
    };
    const renderCard = (card, index) => {
        return (
            <ComponentWrapper
                key={card.id}
                index={index}
                id={card.id}
                text={card.text}
                moveCard={moveCard}
                type={card.type}
            />
        )
    };

    const code = `
import React from 'react';
        
const style = {
    width: '470px',
    height: '470px',
    borderRadius: '50%',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    display: 'flex',
    background: '${background}'
};
const InnerStyle = {
    width: '450px',
    height: '450px',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    border: '2px solid #FFF',
    background: '${background}'
};
        
const Modal = () => {
    return(
        <div style={style}>
            <div style={InnerStyle}>
                ${cards.map(card => renderComponent(card.type)).join('')}
            </div>
        <div>
    )
}
        
export const Modal;
    `;

    return (
        <div>
            <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
                <div style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{...style, backgroundColor: background}}>
                        <div style={{...InnerStyle, backgroundColor: background}}>
                            {cards.map((card, i) => renderCard(card, i))}
                        </div>
                    </div>
                </div>
                <div style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{display: 'inline-block'}}>
                        <p className='appLabel'>
                            Background Color : {'  '}
                            <div style={swatch} onClick={() => setShowPicker(true)}>
                                <div style={{...color, backgroundColor: background}}/>
                            </div>
                        </p>
                        {showPicker && <div style={popover}>
                            <div style={cover} onClick={() => setShowPicker(false)}/>
                            <SketchPicker
                                color={background}
                                onChangeComplete={(color) => {
                                    setBackground(color.hex);
                                    setShowPicker(false);
                                }}
                            />
                        </div>}

                    </div>
                </div>
            </div>
            <div style={{textAlign: 'left'}}>
                <p>Code:</p>
                <CodeBlock
                    text={code}
                    showLineNumbers
                    language='jsx'

                />
            </div>
        </div>
    )
};

export default Container;