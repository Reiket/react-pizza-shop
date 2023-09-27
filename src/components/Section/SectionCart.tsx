import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import CartItem from "./Card/CartItem";
import {clearItem, selectCart} from "../../redux/slices/cart-slice";

function SectionCart() {
    const dispatch = useDispatch();

    const {totalPrice, items} = useSelector(selectCart)
    const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0)

    const onClickRemove = () => {
        if(window.confirm('Are you sure you want to remove?')) {
            dispatch(clearItem())
        }
    }
    return (
        <section className="section section-cart">
            <div className="section-cart__container">
                {items.length > 0 ? (
                    <>
                        <div className="section-cart__top">
                            <h2 className="section-cart__title icon-cart"><span>Кошик</span></h2>
                            <button onClick={onClickRemove} className="section-cart__clear icon-delete">Очистити кошик</button>
                        </div>
                        <div className="section-cart__body">
                            {items.map((obj: any, index: number) => <CartItem key={index} {...obj}/>)}

                            <div className="section-cart__bottom cart-bottom">
                                <div className="cart-bottom__info">
                                    <div className="cart-bottom__title">Всього піц: <span>{totalCount} шт.</span></div>
                                    <div className="cart-bottom__sum">Сума замовлення: <span>{totalPrice} грн.</span></div>
                                </div>
                                <div className="cart-bottom__buttons">
                                    <Link to={"/"} className="cart-bottom__btn gray icon-arrow1">Повернутись назад</Link>
                                    <button className="cart-bottom__btn orange">Оплатити зараз</button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="section-cart__inner">
                        <h2 className="section-cart__title title">Кошик пустий 😕</h2>
                        <div className="section-cart__text">Йморівно ви не замовляли ще піцу. Щоб замовити піцу, перейди на головну сторінку.</div>
                        <div className="section-cart__picture"><img src="assets/images/cart/01.png" alt="Cart-Picture"/></div>
                        <Link to={"/"} className="cart-bottom__btn dark">Повернутись назад</Link>
                    </div>
                )}

            </div>
        </section>
    );
}

export default SectionCart;