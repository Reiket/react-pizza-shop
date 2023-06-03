import React from "react";
function App() {
  return (
    <div className="wrapper">
      <header className="header">
        <div className="header__container">
          <div className="header__body">
            <div className="header__logo">
              <a href={'/'} className="header__img">
                <img src="/assets/images/logo/logo.png" alt="Logo"/>
              </a>
              <div className="header__info">
                <h1 className="header__title">REACT PIZZA</h1>
                <div className="header__text">Найсмачніша піца в світі</div>
              </div>
            </div>
            <div className="header__tools">
              <div className="header__price">520 грн.</div>
              <div className="header__cart icon-cart">3</div>
            </div>
          </div>
        </div>
      </header>
      <div className="sort">
        <div className="sort__container">
          <div className="sort__buttons">
            <button className="sort__btn">Всі</button>
            <button className="sort__btn">Мясні</button>
            <button className="sort__btn">Вегетеріанські</button>
            <button className="sort__btn">Гриль</button>
            <button className="sort__btn">Гострі</button>
            <button className="sort__btn">Закриті</button>
          </div>
          <div className="sort__category">
            <div className="sort__text icon-arrow">Сортування по: <span>популярності</span></div>
            <ul className="sort__list">
              <li className="sort__item"><span>популярності</span></li>
              <li className="sort__item"><span>ціні</span></li>
              <li className="sort__item"><span>алфавіту</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
