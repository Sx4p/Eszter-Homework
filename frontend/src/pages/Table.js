import React, {useEffect, useState} from 'react';
import ProductTable from "../components/ProductTable";
import {CircularProgress, Container} from "@mui/material";
import SearchBar from "../components/SearchBar";

const fetchProducts = () => {
    return fetch(`/api/product/`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
}

const getKeysFromProducts = (products) => {
    if (products.length > 0) {
        return Object.keys(products[0])
    }
}

function Table() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [keys, setKeys] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchLabel, setSearchLabel] = useState("");

    useEffect(() => {
        fetchProducts().then(products => {
            setProducts(products);
            setFilteredProducts(products)
            setKeys(getKeysFromProducts(products))
        })
            .then(() => setIsLoaded(true))
    }, [])

    function searchByLabel(searchText, label) {
        setFilteredProducts([...products].filter((product) =>
            product[label].toString().toLowerCase().includes(searchText.toLowerCase())));

        setSearchText(searchText);
        setSearchLabel(label);
    }

    return (
        <Container sx={{justifyContent: "center", textAlign: "center"}}>
            <SearchBar keys={keys} handleSearchByLabel={searchByLabel}/>
            {isLoaded ? <ProductTable products={filteredProducts} keys={keys} searchText={searchText}
                                      searchLabel={searchLabel}/> : <CircularProgress/>}
        </Container>
    );
}

export default Table;