import {useState, useEffect} from 'react';
import { foodFact } from '../services/tools';


const Products = () => {

    return (
        <div>
            <button
                onClick={() => {
                    foodFact.searchProduct('search_terms=cheese')
                }}
            >
                Search
            </button>
        </div>
    );
}

export default Products;