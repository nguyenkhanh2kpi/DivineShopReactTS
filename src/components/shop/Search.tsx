import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { startSearch } from "../../store/search/searchSlice";
import "./search.css";
import { Software } from "../../store/software/productSlice";

export const Search = () => {
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [filteredSoftwareList, setFilteredSoftwareList] = useState<
        Software[]
    >([] as Software[]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setInput(value);
    };

    const softwareList = useAppSelector((state) =>
        state.software ? state.software.softwares : []
    );

    useEffect(() => {
        const filteredList = softwareList?.filter((product) =>
            product.name.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredSoftwareList(filteredList ? filteredList : []);
    }, [input, softwareList]);

    return (
        <div className="search_input" id="search_input_box">
            <div className="container">
                <form className="d-flex justify-content-between">
                    <input
                        type="text"
                        className="form-control"
                        id="search_input"
                        name="text"
                        value={input}
                        onChange={handleChange}
                        placeholder="Search Here"
                    />
                </form>
            </div>
            <div className="b-item">
                {filteredSoftwareList?.map((product) => (
                    <div className="product">
                        <div className="product-image">
                            <img src={product.image_url} alt="Product Image" />
                        </div>
                        <div className="product-details">
                            <h2>{product.name}</h2>
                            <button
                                className="button"
                                onClick={() =>
                                    navigate(`/detail/${product.id}`)
                                }
                            >
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
