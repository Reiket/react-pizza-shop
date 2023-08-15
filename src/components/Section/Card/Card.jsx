import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addItem, selectCartItem} from "../../../redux/slices/cart-slice";
import {Link} from "react-router-dom";

const typeName = ["Тонка", "Традиційна"];
function Card({id, title, price, sizes, imageUrl, types}) {
    const dispatch = useDispatch();
    const [typeId, setTypeId] = React.useState(null);
    const [sizeId, setSizeId] = React.useState(null);
    const cartItem = useSelector(selectCartItem(id));
    const addedCount = cartItem ? cartItem.count : 0
    const onClickAdd = () => {
        const item = {
            id,
            title,
            price,
            imageUrl,
            type: typeName[typeId],
            size: sizes[sizeId],

        };
        dispatch(addItem(item));
    }

    function onClickToType(index) {
       if (typeId !== index) {
           setTypeId(index);
       } else {
           setTypeId(null);
       }
    }

    function onClickToSize(index) {
        if (sizeId !== index) {
            setSizeId(index);
        } else {
            setSizeId(null);
        }
    }

    return (
        <div className="section__card card-item">
            <div className="card-item__body">
                <div className="card-item__image"><Link to={`/pizza/${id}`}><img src={imageUrl} alt="Pizza-Card"/></Link>
                </div>
                <h3 className="card-item__title">{title}</h3>
                <div className="card-item__bar">
                    <div className="card-item__category">
                        {types.map((value, index) => <li key={value} onClick={() => onClickToType(index)} className={typeId === index ? "card-item__button active" : "card-item__button"}>{typeName[value]}</li>)}
                    </div>
                    <ul className="card-item__category">
                        {sizes.map((size, index) => <li key={size} onClick={() => onClickToSize(index)} className={sizeId === index ? "card-item__button active" : "card-item__button"}>{size} см.</li>)}
                    </ul>
                </div>
                <div className="card-item__content">
                    <div className="card-item__price">Від {price} грн.</div>
                    <button onClick={onClickAdd} className="card-item__add icon-plus">Добавити{addedCount > 0  &&  <span>{addedCount}</span>}</button>
                </div>
            </div>
        </div>
    );
}

export default Card;