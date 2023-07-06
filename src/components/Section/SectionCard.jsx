import React from 'react';
import Card from "./Card/Card";
import CardLoader from "./Card/CardLoader";
import qs from 'qs'
import Sort from "../Sort/Sort";
import Context from "../../Context/Context";
import Pagination from "./Pagination";
import {useDispatch, useSelector} from "react-redux";
import {
    selectFilter,
    selectSort,
    setCategoryId,
    setCurrentPage,
    setFilters,
    setSort
} from "../../redux/slices/filter-slice";
import {useNavigate, useLocation, Link} from 'react-router-dom';
import {fetchItems, selectPizzaData} from "../../redux/slices/pizzas-slice";


function SectionCard() {
    const [conditionSort, setConditionSort] = React.useState(true);

    const {items, status} = useSelector(selectPizzaData)
    const {categoryId, currentPage, searchValue} = useSelector(selectFilter);
    const { sortId, sortCategory } = useSelector(selectSort);

    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const fetchPizzas =  () => {
        dispatch(fetchItems({categoryId, sortCategory, conditionSort, searchValue, currentPage}))
     }

    React.useEffect(() => {
        console.log(location.search)
        if (location.search) {
            const params = qs.parse(location.search.substring(1));
            dispatch(setFilters({...params}));
            isSearch.current = true;
        }
    }, [])

    React.useEffect(() => {
        fetchPizzas();
        isSearch.current = false;
    }, [categoryId, sortCategory, conditionSort, searchValue, currentPage]);

    React.useEffect(() => {
       if (isMounted.current) {
           const queryString    = qs.stringify({
               sortCategory,
               categoryId,
               currentPage,
           });
           navigate(`?${queryString}`);
       }
       isMounted.current = true;
    }, [categoryId, sortCategory, conditionSort, searchValue, currentPage]);

    const onClickCategory = (index) => {
        dispatch(setCategoryId(index));
    };

    const onClickSort = (sortId, sortCategory) => {
        dispatch(setSort({ sortId, sortCategory }));
    };

    const onClickConditionSort = () => {
        setConditionSort(prev => !prev);
    };

    const onChangeCurrentPage = (num) => {
        dispatch(setCurrentPage(num));
    };

    return (
        <>
            <Sort activeId ={categoryId} sortId={sortId} onClickCategory={onClickCategory} conditionSort={conditionSort} onClickConditionSort={ onClickConditionSort }  onClickSort={onClickSort}/>
            <section className="section">
                <div className="section__container">
                    <h2 className="section__title">Всі піци</h2>
                    <div className="section__inner">
                        {status === 'loading' ? [...new Array(10)].map((_, index) => <CardLoader key={index}/>) : items.map((obj) => <Link key={obj.id} to={`/pizza/${obj.id}`}><Card {...obj}/></Link>)}
                    </div>
                   <Pagination currentPage={currentPage} onChangePage = {(num) => onChangeCurrentPage(num)}/>

                </div>
            </section>
        </>

    );
}

export default SectionCard;