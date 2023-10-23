import React, {useEffect, useState} from 'react';
import ProductTable from "../components/ProductTable";
import {CircularProgress, Container} from "@mui/material";
import SearchBar from "../components/SearchBar";
import {useNavigate} from "react-router-dom";

const getKeysFromProducts = (products) => {
    if (products.length > 0) {
        return Object.keys(products[0])
    }
}

function Table() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [keys, setKeys] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchLabel, setSearchLabel] = useState("");

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
                setFilteredProducts(products)
                setKeys(getKeysFromProducts(products))
            })
        }
    }, [])

    function searchByLabel(searchText, label) {
        setFilteredProducts([...products].filter((product) =>
            product[label].toString().toLowerCase().includes(searchText.toLowerCase())));

        setSearchText(searchText);
        setSearchLabel(label);
    }

    return (
            <Container sx={{justifyContent: "center", textAlign: "center"}}>
                {isLoaded && <SearchBar keys={keys} handleSearchByLabel={searchByLabel}/>}
                {isLoaded ? <ProductTable products={filteredProducts} keys={keys} searchText={searchText}
                                          searchLabel={searchLabel}/> : <CircularProgress/>}
            </Container>
    );
}

export default Table;