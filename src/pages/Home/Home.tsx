import React, { Fragment, useEffect, useState } from "react";
import Header from "../../components/shop/Header";
import Banner from "../../components/shop/Banner";
import Footer from "../../components/shop/Footer";
import HomeBanner from "../../components/shop/HomeBanner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router";
import img1 from "../../styles/shop/img/features/f-icon1.png";
import img2 from "../../styles/shop/img/features/f-icon2.png";
import img3 from "../../styles/shop/img/features/f-icon3.png";
import img4 from "../../styles/shop/img/features/f-icon4.png";
import img5 from "../../styles/shop/img/category/c5.jpg";
import "./home.css";
import { Software } from "../../store/software/productSlice";
import { homeService } from "../../services/home.service";
import { softwareService } from "../../services/software.service";
import { useAppSelector } from "../../store/hook";

export const Home = () => {
    const param = useParams();
    const [softwares, setSoftwares] = useState<Software[]>([] as Software[]);
    const softwareList = useAppSelector((state) =>
        state.software ? state.software.softwares : []
    );

    useEffect(() => {
        toast.success(param.message);
    }, []);
    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <HomeBanner />
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
                <section className="features-area section_gap">
                    <div className="container">
                        <div className="row features-inner">
                            {/* single features */}
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="single-features">
                                    <div className="f-icon">
                                        <img src={img1} />
                                    </div>
                                    <h6>Free Delivery</h6>
                                    <p>Free Shipping on all order</p>
                                </div>
                            </div>
                            {/* single features */}
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="single-features">
                                    <div className="f-icon">
                                        <img src={img2} />
                                    </div>
                                    <h6>Return Policy</h6>
                                    <p>Free Shipping on all order</p>
                                </div>
                            </div>
                            {/* single features */}
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="single-features">
                                    <div className="f-icon">
                                        <img src={img3} />
                                    </div>
                                    <h6>24/7 Support</h6>
                                    <p>Free Shipping on all order</p>
                                </div>
                            </div>
                            {/* single features */}
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="single-features">
                                    <div className="f-icon">
                                        <img src={img4} />
                                    </div>
                                    <h6>Secure Payment</h6>
                                    <p>Free Shipping on all order</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>

            <Fragment>
                <section className="category-area">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 col-md-12">
                                <div className="row">
                                    <div className="col-lg-8 col-md-8">
                                        <div className="single-deal">
                                            <div
                                                className="overlay"
                                                onClick={() =>
                                                    navigate("/categories")
                                                }
                                            />
                                            <img
                                                className="img-fluid w-100 img1"
                                                src="https://cdn.divineshop.vn/image/catalog/Banner/Steam%20(2)-66159.png?hash=1697765954"
                                            />
                                            <a
                                                className="img-pop-up"
                                                target="_blank"
                                            >
                                                <div className="deal-details">
                                                    <h6 className="deal-title">
                                                        Steam code
                                                    </h6>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4">
                                        <div className="single-deal">
                                            <div
                                                className="overlay"
                                                onClick={() =>
                                                    navigate("/categories")
                                                }
                                            />
                                            <img
                                                className="img-fluid w-100 img2"
                                                src="https://cdn.divineshop.vn/image/catalog/Discord%20Nitro%203%20thang-71170.jpg?hash=1672370038"
                                            />
                                            <a
                                                className="img-pop-up"
                                                target="_blank"
                                            >
                                                <div className="deal-details">
                                                    <h6 className="deal-title">
                                                        Discord Nitro
                                                    </h6>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4">
                                        <div className="single-deal">
                                            <div
                                                className="overlay"
                                                onClick={() =>
                                                    navigate("/categories")
                                                }
                                            />
                                            <img
                                                className="img-fluid w-100 img3"
                                                src="https://cdn.divineshop.vn/image/catalog/Anh-SP/Kh%C3%A1c/Divine-Shop-Grammarly-Premium-1-Nam-35103.jpg?hash=1658742859"
                                            />
                                            <a
                                                className="img-pop-up"
                                                target="_blank"
                                            >
                                                <div className="deal-details">
                                                    <h6 className="deal-title">
                                                        Grammaly
                                                    </h6>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-8 col-md-8">
                                        <div className="single-deal">
                                            <div
                                                className="overlay"
                                                onClick={() =>
                                                    navigate("/categories")
                                                }
                                            />
                                            <img
                                                className="img-fluid w-100 img4"
                                                src="https://cdn.divineshop.vn/image/catalog/Banner/gmail%20(2)-32092.png?hash=1697765976"
                                            />
                                            <a
                                                className="img-pop-up"
                                                target="_blank"
                                            >
                                                <div className="deal-details">
                                                    <h6 className="deal-title">
                                                        Email
                                                    </h6>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-deal">
                                    <div className="overlay" />
                                    <img
                                        className="img-fluid w-100 img5"
                                        src={img5}
                                    />
                                    <a
                                        href="img/category/c5.jpg"
                                        className="img-pop-up"
                                        target="_blank"
                                    >
                                        <div className="deal-details">
                                            <h6 className="deal-title">
                                                Flash Sale
                                            </h6>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>

            <Fragment>
                <section className="related-product-area section_gap_bottom">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 text-center">
                                <div className="section-title">
                                    <h1>Deals of the Week</h1>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="row">
                                    {softwareList?.slice(0,6).map((item) => (
                                        <>
                                            <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
                                                <div className="single-related-product d-flex">
                                                    <a href="#">
                                                        <img
                                                            className="item-flash"
                                                            src={item.image_url}
                                                        />
                                                    </a>
                                                    <div className="desc">
                                                        <a
                                                            href={`/detail/${item.id}`}
                                                            className="title"
                                                        >
                                                            {item.name}
                                                        </a>
                                                        <div className="price">
                                                            <h6>
                                                                {item.price}
                                                            </h6>
                                                            <h6 className="l-through">
                                                                {item.old_price}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ))}
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="ctg-right">
                                    <a href="#" target="_blank">
                                        <img
                                            className="img-fluid d-block mx-auto"
                                            src={img5}
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>

            <Footer />
        </div>
    );
};
