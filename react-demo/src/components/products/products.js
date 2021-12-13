import React, { useState } from 'react'
import Store from './store';
import Product_list from './product_list';
import './products.css';

const PAGE_PRODUCTS = 'products';
const PAGE_STORE = 'store';

export default function Products() {
    // const [store, setStore] = useState([]);
    // const [page, setPage] = useState(PAGE_PRODUCTS);
    // const navigateTo = (nextPage) => {
    //     setPage(nextPage);
    // };
    return (
        <div>
            <div className="buttton_store">
                {/*<button className="btn me-3" onClick={() => navigateTo(PAGE_STORE)}>*/}
                {/*    Go to Store*/}
                {/*</button>*/}
                {/*<button className="btn" onClick={() => navigateTo(PAGE_PRODUCTS)}>*/}
                {/*    View Products*/}
                {/*</button>*/}
            </div>
            {/*{page === PAGE_PRODUCTS && (*/}
            {/*    <Product_list store={store} setStore={setStore} />*/}
            {/*)}*/}
            {/*{page === PAGE_STORE && (*/}
            {/*    <Store store={store} setStore={setStore} />*/}
            {/*)}*/}
        </div>
    )
}
