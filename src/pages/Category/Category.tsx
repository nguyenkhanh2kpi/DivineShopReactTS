import React, { Fragment, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hook";
import { getSoftwares } from "../../store/software/productSlice";
import Header from "../../components/shop/Header";
import Banner from "../../components/shop/Banner";
import "../Category/style.css";
import Footer from "../../components/shop/Footer";
import { Software } from "../../store/software/productSlice";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { homeService } from "../../services/home.service";
import { Favorite } from "../Favorite/Favorite";
import { favoriteService } from "../../services/favorite.service";
import { error } from "console";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { endSearch } from "../../store/search/searchSlice";

interface Category {
    category_id: number;
    category_name: string;
    software_count: number;
}

interface Keyword {
    id: number;
    name: string;
}

export const Category = () => {
    const token = useAppSelector((state) => state.account.token);
    const softwareSeletor = useAppSelector((state) => state.software.softwares);
    const [softwares, setSoftware] = useState<Software[]>(
        softwareSeletor ? softwareSeletor : []
    );
    const [categories, setCategories] = useState<Category[]>([]);
    const [favorite, setFavorites] = useState<Favorite>();
    const [cateFilter, setCatefilter] = useState<string>();
    const dispatch = useAppDispatch();
    const [softwareFilter, setSoftwareFilter] = useState<Software[]>(
        softwareSeletor ? softwareSeletor : []
    );
    const [keywords, setkeyword] = useState<Keyword[]>();
    const [keywordFilter, setkeywordFilter] = useState<number>();
    const [priceFilter, setPriceFilter] = useState<number>();

    const search = useAppSelector(state => state.search);
    const [searchFilter, setSearchFilter] = useState<boolean>();

    const handlePriceFilter= (num: number) => {
        setPriceFilter(num);
    }

    const handleCateFilter = (category: string) => {
        setCatefilter(category);
    };

    const handleKeyWordFilter = (id: number) => {
        setkeywordFilter(id);
    };

    // useEffect(() => {
    //     if (searchFilter) {
    //         const ft_software = softwares.filter((software) =>
    //             software.category.name.toLowerCase().includes(search.search?.text.toLowerCase() || "")
    //         );
    //         setSoftwareFilter(ft_software);
    //     }
    //     dispatch(endSearch());
    // }, [searchFilter, search.search?.text]);
    
    

    useEffect(() => {
        if (cateFilter) {
            const ft_software = softwares.filter(
                (software) => software.category.name === cateFilter
            );
            setSoftwareFilter(ft_software);
        }
    }, [cateFilter]);

    useEffect(() => {
        if (keywordFilter) {
            const ft_software = softwares.filter(
                (software) => software.key_word===keywordFilter
            );
            setSoftwareFilter(ft_software);
        }
    }, [keywordFilter]);

    useEffect(() => {
        if (priceFilter) {
            const ft_software = softwares.filter(
                (software) => {
                    if(priceFilter===1) {
                        return software.price<100000
                    }
                    if(priceFilter===2) {
                        return software.price>100000 && software.price<200000
                    }
                    if(priceFilter===3) {
                        return software.price >200000
                    }
                    return false;
                }
            );
            setSoftwareFilter(ft_software);
        }
    }, [priceFilter]);

    // bam nut like
    const handleClickLike = async (id: number) => {
        await favoriteService
            .postFavorite(token ? token : "", id)
            .then((response) => toast.success(response.message))
            .catch((error) => toast.error(error));
        favoriteService
            .getFavorite(token ? token : "")
            .then((response) => {
                setFavorites(response);
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    useEffect(() => {
        homeService
            .getCategory()
            .then((data) => setCategories(data))
            .catch((e) => console.log(e));
        dispatch(getSoftwares());
        favoriteService
            .getFavorite(token ? token : "")
            .then((response) => {
                setFavorites(response);
            })
            .catch((error) => {
                toast.error(error);
            });
        homeService.getKeyword().then((response) => setkeyword(response));
        setSearchFilter(search.is_search);
    }, []);

    const handleDislike = async (id: number) => {
        await favoriteService
            .removeFavorite(token ? token : "", id)
            .then((response) => toast.success(response.message))
            .catch((error) => toast.error(error));
        favoriteService
            .getFavorite(token ? token : "")
            .then((response) => {
                setFavorites(response);
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    // panigate
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 9;
    const pageCount = Math.ceil(softwareFilter.length / itemsPerPage);
    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };
    const displayItems = softwareFilter.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );
    // end panigate

    return (
        <div>
            <Header />
            <Banner title="Category" />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-4 col-md-5">
                            <div className="sidebar-categories">
                                <div className="head">Categories</div>
                                <ul className="main-categories">
                                    <li className="main-nav-list">
                                        {categories?.map((category) => (
                                            <div key={category.category_id}>
                                                <a
                                                    data-toggle="collapse"
                                                    aria-expanded="false"
                                                    aria-controls="fruitsVegetable"
                                                    onClick={() =>
                                                        handleCateFilter(
                                                            category.category_name
                                                        )
                                                    }
                                                >
                                                    <span className="lnr lnr-arrow-right" />
                                                    {category.category_name}
                                                    <span className="number">
                                                        (
                                                        {
                                                            category.software_count
                                                        }
                                                        )
                                                    </span>
                                                </a>
                                            </div>
                                        ))}
                                    </li>
                                </ul>
                            </div>
                            <div className="sidebar-filter mt-50">
                                <div className="top-filter-head">
                                    Product Filters
                                </div>
                                <div className="common-filter">
                                    <div className="head">
                                        Featured keywords
                                    </div>
                                    <form action="#">
                                        <ul>
                                            {keywords?.map((item) => (
                                                <li className="filter-list">
                                                    <input
                                                        className="pixel-radio"
                                                        type="radio"
                                                        id="apple"
                                                        name="brand"
                                                        onClick={() => handleKeyWordFilter(item.id)}
                                                    />
                                                    <label htmlFor="apple">
                                                        {item.name}<span></span>
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    </form>
                                </div>
                                <div className="common-filter">
                                    <div className="head">Price</div>
                                    <form action="#">
                                        <ul>
                                            <li className="filter-list">
                                                <input
                                                    className="pixel-radio"
                                                    type="radio"
                                                    id="black"
                                                    name="color"
                                                    onClick={() => handlePriceFilter(1)}
                                                />
                                                <label htmlFor="black">
                                                    <span>Dưới 100.000</span>
                                                </label>
                                            </li>
                                            <li className="filter-list">
                                                <input
                                                    className="pixel-radio"
                                                    type="radio"
                                                    id="black"
                                                    name="color"
                                                    onClick={() => handlePriceFilter(2)}
                                                />
                                                <label htmlFor="black">
                                                    <span>Từ 100.000 - 200.000</span>
                                                </label>
                                            </li>
                                            <li className="filter-list">
                                                <input
                                                    className="pixel-radio"
                                                    type="radio"
                                                    id="black"
                                                    name="color"
                                                    onClick={() => handlePriceFilter(3)}
                                                />
                                                <label htmlFor="black">
                                                    <span>trên 200.000</span>
                                                </label>
                                            </li>
                                        </ul>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-8 col-md-7">
                            {/* Start Filter Bar */}
                            <div className="filter-bar d-flex flex-wrap align-items-center">
                                <div className="khanh-head">Softwares</div>
                                <ReactPaginate
                                    className="khanh-panigate"
                                    pageCount={pageCount}
                                    onPageChange={handlePageChange}
                                    previousLabel="<"
                                    nextLabel=">"
                                    breakLabel="..."
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    containerClassName="pagination justify-content-center"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    activeClassName="active"
                                />
                            </div>
                            {/* End Filter Bar */}

                            <section className="lattest-product-area pb-40 category-list">
                                <div className="row">
                                    {/* single product */}
                                    {displayItems.map((software) => (
                                        <div
                                            className="col-lg-4 col-md-6"
                                            key={software.id}
                                        >
                                            <div className="single-product">
                                                <img
                                                    className="img-fluid"
                                                    src={software.image_url}
                                                />
                                                <div className="product-details">
                                                    <h6>{software.name}</h6>
                                                    <div className="price">
                                                        <h6>
                                                            {software.price}
                                                        </h6>
                                                        <h6 className="l-through">
                                                            {software.old_price}
                                                        </h6>
                                                    </div>
                                                    <div className="prd-bottom">
                                                        <a className="social-info">
                                                            {favorite?.favorite_softwares.some(
                                                                (i) =>
                                                                    i.id ===
                                                                    software.id
                                                            ) ? (
                                                                <span
                                                                    className="lnr lnr-heart like"
                                                                    onClick={() =>
                                                                        handleDislike(
                                                                            software.id
                                                                        )
                                                                    }
                                                                />
                                                            ) : (
                                                                <span
                                                                    className="lnr lnr-heart"
                                                                    onClick={() =>
                                                                        handleClickLike(
                                                                            software.id
                                                                        )
                                                                    }
                                                                />
                                                            )}

                                                            <p className="hover-text">
                                                                Wishlist
                                                            </p>
                                                        </a>
                                                        <a
                                                            className="social-info"
                                                            href={`detail/${software.id}`}
                                                        >
                                                            <span className="lnr lnr-move" />
                                                            <p className="hover-text">
                                                                view more
                                                            </p>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </Fragment>
            <Footer />
        </div>
    );
};
