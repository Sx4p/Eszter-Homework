import React, {useEffect, useState} from 'react';
import ProductTable from "../components/ProductTable";
import {CircularProgress, Container} from "@mui/material";
import {useNavigate} from "react-router-dom";

const getKeysFromProducts = (products) => {
    if (products.length > 0) {
        return Object.keys(products[0])
    }
}

function Table() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [keys, setKeys] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchProducts = () => {
        return fetch(`/api/product/`, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    setIsLoaded(true);
                    return res.json();
                } else {
                    localStorage.clear();
                    navigate("/login");
                    return {};
                }
            })
    }
    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/login");
        } else {
            fetchProducts().then(products => {
                setProducts(products);
                setKeys(getKeysFromProducts(products))
            })
        }
    }, [])

    return (
        <Container sx={{justifyContent: "center", textAlign: "center"}}>
            {isLoaded ? <ProductTable products={products} keys={keys}/> : <CircularProgress/>}
        </Container>
    );
}

export default Table;