import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import Header from "../../components/shop/Header";
import Footer from "../../components/shop/Footer";
import Banner from "../../components/shop/Banner";
import { Software } from "../../store/software/productSlice";
import { softwareService } from "../../services/software.service";
import { error } from "console";
import { SoftwareDescription } from "./SoftwareDescription";
import { useNavigate, useParams } from "react-router";
import "./softwareDetail.css";
import { SoftwareComent } from "./SoftwareComment";
import { ToastContainer, toast } from "react-toastify";
import { useAppSelector } from "../../store/hook";
import { cartService } from "../../services/cart.service";
import { SoftwareReview } from "./SoftwareReview";

export const SoftwareDetail = () => {
    const pamas = useParams();
    const softwareId = pamas.id;
    const [software, setSoftware] = useState<Software>();
    const [emailActive, setEmailActive] = useState<string>("");
    const [activeTab, setActivetab] = useState<string>("description");
    const token = useAppSelector((state) => state.account.token);
    const navigate = useNavigate();

    const handleTabClick = (tabName: string) => {
        setActivetab(tabName);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmailActive(value);
    };

    const handleClick = async () => {
        if (
            software &&
            software.active_by_email &&
            !emailActive &&
            emailActive === ""
        ) {
            toast.error("Please enter your email");
            return;
        }

        if (!software?.active_by_email) {
            cartService
                .postToCart(
                    token ? token : "",
                    software ? software.id : 0,
                    true
                )
                .then(() => {
                    toast.success("Added successfully");
                })
                .catch((error) => toast.error(error.message));
        } else {
            cartService
                .addToCartWithEmail(
                    software ? software.id : 0,
                    emailActive ? emailActive : "",
                    token ? token : ""
                )
                .then(() => {
                    toast.success("Add successfully");
                })
                .catch((error) => {
                    if (error.message === "token_expire") {
                        navigate("/login");
                    } else {
                        toast.error(error.message);
                    }
                });
        }
    };

    useEffect(() => {
        if (softwareId) {
            const parsedSoftwareId = parseInt(softwareId, 10);
            if (!isNaN(parsedSoftwareId)) {
                softwareService
                    .getSoftwareById(parsedSoftwareId)
                    .then((data) => {
                        setSoftware(data);
                    })
                    .catch((error) => {
                        console.error("Error fetching software:", error);
                    });
            }
        }
    }, []);

    return (
        <div>
            <Header />
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
            <Banner title="Software Detail" />
            <Fragment>
                <div className="product_image_area">
                    <div className="container">
                        <div className="row s_product_inner">
                            <div className="col-lg-6">
                                <div className="s_Product_carousel">
                                    <div className="single-prd-item">
                                        <img
                                            className="img-fluid khanh"
                                            src={software?.image_url}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5 offset-lg-1">
                                <div className="s_product_text">
                                    <h3>{software?.name}</h3>
                                    <h2>{software?.price}</h2>
                                    <ul className="list">
                                        <li>
                                            <a className="active" href="#">
                                                <span>Category</span> :
                                                {software?.category.name}
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <span>Availibility</span> : In
                                                Stock
                                            </a>
                                        </li>
                                    </ul>
                                    <p> </p>

                                    {software?.active_by_email ? (
                                        <>
                                            <div className="form-group">
                                                <label>Your email :</label>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    title="Email:"
                                                    placeholder="Email"
                                                    defaultValue=""
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="product_count">
                                                <label htmlFor="qty">
                                                    Quantity:
                                                </label>
                                                <input
                                                    type="text"
                                                    name="qty"
                                                    id="sst"
                                                    maxLength={12}
                                                    defaultValue={1}
                                                    title="Quantity:"
                                                    className="input-text qty"
                                                />
                                                <button
                                                    className="increase items-count"
                                                    type="button"
                                                >
                                                    <i className="lnr lnr-chevron-up" />
                                                </button>
                                                <button
                                                    className="reduced items-count"
                                                    type="button"
                                                >
                                                    <i className="lnr lnr-chevron-down" />
                                                </button>
                                            </div>
                                        </>
                                    )}

                                    <div className="card_area d-flex align-items-center">
                                        <a
                                            className="primary-btn"
                                            onClick={handleClick}
                                        >
                                            Add to Cart
                                        </a>
                                        <a className="icon_btn" href="#">
                                            <i className="lnr lnr lnr-diamond" />
                                        </a>
                                        <a className="icon_btn" href="#">
                                            <i className="lnr lnr lnr-heart" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
            <Fragment>
                <section className="product_description_area">
                    <div className="container">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${
                                        activeTab === "description"
                                            ? "active"
                                            : ""
                                    }`}
                                    id="shome-tab"
                                    data-toggle="tab"
                                    href="#shome"
                                    role="tab"
                                    aria-controls="home"
                                    aria-selected="true"
                                    onClick={() =>
                                        handleTabClick("description")
                                    }
                                >
                                    Description
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${
                                        activeTab === "warranty" ? "active" : ""
                                    }`}
                                    id="profile-tab"
                                    data-toggle="tab"
                                    href="#profile"
                                    role="tab"
                                    aria-controls="profile"
                                    aria-selected="false"
                                    onClick={() => handleTabClick("warranty")}
                                >
                                    Warranty Policy
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${
                                        activeTab === "question" ? "active" : ""
                                    }`}
                                    id="contact-tab"
                                    data-toggle="tab"
                                    href="#contact"
                                    role="tab"
                                    aria-controls="contact"
                                    aria-selected="false"
                                    onClick={() => handleTabClick("question")}
                                >
                                    Questions
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${
                                        activeTab === "comment" ? "active" : ""
                                    }`}
                                    id="contact-tab"
                                    data-toggle="tab"
                                    href="#contact"
                                    role="tab"
                                    aria-controls="contact"
                                    aria-selected="false"
                                    onClick={() => handleTabClick("comment")}
                                >
                                    Comments
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${
                                        activeTab === "review" ? "active" : ""
                                    }`}
                                    id="review-tab"
                                    data-toggle="tab"
                                    href="#review"
                                    role="tab"
                                    aria-controls="review"
                                    aria-selected="false"
                                    onClick={() => handleTabClick("review")}
                                >
                                    Reviews
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div
                                className="tab-pane fade "
                                id="review"
                                role="tabpanel"
                                aria-labelledby="review-tab"
                            >
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="row total_rate">
                                            <div className="col-6">
                                                <div className="box_total">
                                                    <h5>Overall</h5>
                                                    <h4>4.0</h4>
                                                    <h6>(03 Reviews)</h6>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="rating_list">
                                                    <h3>Based on 3 Reviews</h3>
                                                    <ul className="list">
                                                        <li>
                                                            <a href="#">
                                                                5 Star{" "}
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />{" "}
                                                                01
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                4 Star{" "}
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />{" "}
                                                                01
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                3 Star{" "}
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />{" "}
                                                                01
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                2 Star{" "}
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />{" "}
                                                                01
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                1 Star{" "}
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />{" "}
                                                                01
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="review_list">
                                            <div className="review_item">
                                                <div className="media">
                                                    <div className="d-flex">
                                                        <img src="img/product/review-1.png" />
                                                    </div>
                                                    <div className="media-body">
                                                        <h4>Blake Ruiz</h4>
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                    </div>
                                                </div>
                                                <p>
                                                    Lorem ipsum dolor sit amet,
                                                    consectetur adipisicing
                                                    elit, sed do eiusmod tempor
                                                    incididunt ut labore et
                                                    dolore magna aliqua. Ut enim
                                                    ad minim veniam, quis
                                                    nostrud exercitation ullamco
                                                    laboris nisi ut aliquip ex
                                                    ea commodo
                                                </p>
                                            </div>
                                            <div className="review_item">
                                                <div className="media">
                                                    <div className="d-flex">
                                                        <img src="img/product/review-2.png" />
                                                    </div>
                                                    <div className="media-body">
                                                        <h4>Blake Ruiz</h4>
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                    </div>
                                                </div>
                                                <p>
                                                    Lorem ipsum dolor sit amet,
                                                    consectetur adipisicing
                                                    elit, sed do eiusmod tempor
                                                    incididunt ut labore et
                                                    dolore magna aliqua. Ut enim
                                                    ad minim veniam, quis
                                                    nostrud exercitation ullamco
                                                    laboris nisi ut aliquip ex
                                                    ea commodo
                                                </p>
                                            </div>
                                            <div className="review_item">
                                                <div className="media">
                                                    <div className="d-flex">
                                                        <img src="img/product/review-3.png" />
                                                    </div>
                                                    <div className="media-body">
                                                        <h4>Blake Ruiz</h4>
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                    </div>
                                                </div>
                                                <p>
                                                    Lorem ipsum dolor sit amet,
                                                    consectetur adipisicing
                                                    elit, sed do eiusmod tempor
                                                    incididunt ut labore et
                                                    dolore magna aliqua. Ut enim
                                                    ad minim veniam, quis
                                                    nostrud exercitation ullamco
                                                    laboris nisi ut aliquip ex
                                                    ea commodo
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="review_box">
                                            <h4>Add a Review</h4>
                                            <p>Your Rating:</p>
                                            <ul className="list">
                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-star" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-star" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-star" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-star" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-star" />
                                                    </a>
                                                </li>
                                            </ul>
                                            <p>Outstanding</p>
                                            <form
                                                className="row contact_form"
                                                action="contact_process.php"
                                                method="post"
                                                id="contactForm"
                                            >
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="name"
                                                            name="name"
                                                            placeholder="Your Full name"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            id="email"
                                                            name="email"
                                                            placeholder="Email Address"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="number"
                                                            name="number"
                                                            placeholder="Phone Number"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <textarea
                                                            className="form-control"
                                                            name="message"
                                                            id="message"
                                                            rows={1}
                                                            placeholder="Review"
                                                            defaultValue={""}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12 text-right">
                                                    <button
                                                        type="submit"
                                                        value="submit"
                                                        className="primary-btn"
                                                    >
                                                        Submit Now
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {activeTab === "comment" && (
                                <SoftwareComent
                                    software_id={software ? software.id : 0}
                                    active={true}
                                />
                            )}
                            {activeTab === "description" && (
                                <SoftwareDescription
                                    description={
                                        software ? software.description : ""
                                    }
                                    active={true}
                                />
                            )}

                            {activeTab === "warranty" && (
                                <SoftwareDescription
                                    description={
                                        software ? software.warranty_policy : ""
                                    }
                                    active={true}
                                />
                            )}

                            {activeTab === "question" && (
                                <SoftwareDescription
                                    description={
                                        software
                                            ? software.frequency_question
                                            : ""
                                    }
                                    active={true}
                                />
                            )}

                            {activeTab === "review" && (
                                <SoftwareReview
                                    software_id={software ? software.id : 0}
                                    active={true}
                                />
                            )}
                        </div>
                    </div>
                </section>
            </Fragment>
            <Footer />
        </div>
    );
};
