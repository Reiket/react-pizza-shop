import React from 'react';
import {useDispatch} from "react-redux";
import {addItem, minusItem, removeItem} from "../../../redux/slices/cart-slice";

const CartItem = ({id, title, price, count, size, imageUrl, type}) => {
    const dispatch = useDispatch();
    const onClickPlus = () => {
        dispatch(addItem({
            id,
        }));
    }
    const onClickMinus = () => {
      dispatch(minusItem(id))
    }
    const onClickRemove = () => {
        if(window.confirm('Are you sure you want to remove?')) {
            dispatch(removeItem(id))
        }
    }
    return (
        <div className="section-cart__item">
            <div className="section-cart__image"><img src={imageUrl} alt="Pizza-item"/></div>
            <div className="section-cart__content">
                <h3 className="section-cart__name">{title}</h3>
                <div className="section-cart__description">{type}, {size}см</div>
            </div>
            <div className="section-cart__amount">
                <button onClick={onClickMinus} disabled={count === 0} className="section-cart__button">-</button>
                <span className="section-cart__count">{count}</span>
                <button onClick={onClickPlus} className="section-cart__button">+</button>
            </div>
            <div className="section-cart__price">{price * count} грн.</div>
            <button onClick={onClickRemove} className="section-cart__delete">x</button>
        </div>
    );
};

export default CartItem;