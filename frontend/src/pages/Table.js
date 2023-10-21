import React, {useEffect, useState} from 'react';
import ProductTable from "../components/ProductTable";
import {CircularProgress, Container} from "@mui/material";

const fetchProducts = () => {
    return fetch(`/api/product/`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
}

function Table() {
    const [products, setProducts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetchProducts().then(products => setProducts(products))
            .then(() => setIsLoaded(true))
    }, [])

    return (
        <Container sx={{justifyContent: "center", textAlign: "center"}}>
            {isLoaded ? <ProductTable products={products}/> : <CircularProgress/>}
        </Container>
    );
}

export default Table;