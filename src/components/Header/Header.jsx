import React from 'react';
import {Link, NavLink, useLocation} from "react-router-dom";
import Context from "../../Context/Context";
import debounce from "lodash.debounce";
import {useDispatch, useSelector} from "react-redux";
import {selectCart} from "../../redux/slices/cart-slice";
import {setSearchValue} from "../../redux/slices/filter-slice";

function Header() {
    const [value, setValue] = React.useState('');
    const [isMoving, setIsMoving] = React.useState(false);
    const dispatch = useDispatch();
    const inputRef = React.useRef();
    const {items, totalPrice} = useSelector(selectCart);
    const searchValue = useSelector(state => state.filter.searchValue);
    const totalCount = items.reduce((sum, item) => sum + item.count, 0);
    const {pathname} = useLocation();
    React.useEffect(() => {
        const handleResize = () => {
            setIsMoving(window.innerWidth < 991);
        }
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const onChangeSearchValue = (e) => {
        setValue(e.target.value)
        updateSearchValue(e.target.value)
    }
    const updateSearchValue = React.useCallback(
        debounce((str) => {
            dispatch(setSearchValue(str))
        }, 350),
        [],
    )

    const onClickClear = () => {
        dispatch(setSearchValue(''))
        setValue('');
        inputRef.current.focus();
    }
    return (
        <header className="header">
            <div className="header__container">
                <div  className="header__body">
                    <div className="header__logo">
                        <Link to={'/'} className="header__img">
                            <img src="/assets/images/logo/logo.png" alt="Logo"/>
                        </Link>
                        <div className="header__info">
                            <h1 className="header__title">REACT PIZZA</h1>
                            <div className="header__text">Найсмачніша піца в світі</div>
                        </div>
                    </div>
                    {!isMoving && <form action=""  className="header__form">
                        <button type={"button"} className="header__search icon-search"></button>
                        <input ref={inputRef} value={value} onChange={onChangeSearchValue} placeholder={"Search..."} type="text" className="header__input"/>
                        {searchValue.length > 0 &&   <button onClick={onClickClear} type={"button"} className="header__clear icon-plus"></button>}
                    </form>}
                    {pathname !==  '/cart' &&   <NavLink to={"/cart"} className="header__tools">
                        <div className="header__price">{totalPrice} грн.</div>
                        <div className="header__cart icon-cart">{totalCount}</div>
                    </NavLink>}

                </div>
                {isMoving && <form action="" className="header__form">
                    <button type={"button"} className="header__search icon-search"></button>
                    <input  value={value} onChange={onChangeSearchValue} placeholder={"Search..."} type="text" className="header__input"/>
                    {searchValue.length > 0 &&   <button onClick={onClickClear} type={"button"} className="header__clear icon-plus"></button>}
                </form>}
            </div>
        </header>
    );
}

export default Header;