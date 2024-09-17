import React, { Fragment } from "react";
import Header from "../../components/shop/Header";
import Footer from "../../components/shop/Footer";
import Banner from "../../components/shop/Banner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { orderService } from "../../services/order.service";
import { useAppSelector } from "../../store/hook";
import { error } from "console";
import { useNavigate } from "react-router";

export const Momo = () => {
    const token = useAppSelector(state => state.account.token);
    const navigate = useNavigate();


    const handleClick = () => {
        orderService.postOrder(token ? token: "")
        .then(response => {
            console.log(response);
            toast.success("success");
        })
        .catch(error => {
            if(error.message==="token_expire") {
                navigate("/login");
                return;
            } else {
                toast.error(error.message);
            }
        })
    };

    return (
        <>
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
            <Banner title="Momo" />
            <Fragment>
                <section className="tracking_box_area section_gap">
                    <div className="container">
                        <div className="tracking_box_inner">
                            <img src="https://homepage.momocdn.net/blogscontents/momo-upload-api-220808102122-637955508824191258.png" />
                            <div className="col-md-12 form-group">
                                <button
                                    className="primary-btn"
                                    onClick={() => {
                                        handleClick();
                                    }}
                                >
                                    Pay
                                </button>
                                <button
                                    className="primary-btn"
                                    onClick={() => {
                                        navigate("/cart")
                                    }}
                                >
                                    Backtocart
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
            <Footer />
        </>
    );
};
