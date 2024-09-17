import React, { Fragment, useState, useEffect } from "react";
import Header from "../../components/shop/Header";
import Footer from "../../components/shop/Footer";
import Banner from "../../components/shop/Banner";
import { CartItem } from "../Cart/Cart";
import { useAppSelector } from "../../store/hook";
import { cartService } from "../../services/cart.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import logoPayment from "../../styles/shop/img/logo.png";

export const Checkout = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>();
    const token = useAppSelector((state) => state.account.token);
    const navigate = useNavigate();

    const getTotal = () => {
        return cartItems?.reduce(
            (total, item) => total + item.software.price * item.quantity,
            0
        );
    };

    useEffect(() => {
        cartService
            .getCart(token ? token : "")
            .then((data) => setCartItems(data))
            .catch((error) => {
                if (error.message == "Token is invalid or has expired") {
                    navigate("/login");
                }
            });
    }, []);

    return (
        <>
            <Header />
            <Banner title="Checkout" />
            <Fragment>
                <section className="checkout_area section_gap">
                    <div className="container">
                        <div className="billing_details">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="order_box">
                                        <h2>Your Order</h2>
                                        <ul className="list">
                                            <li>
                                                <a>
                                                    Software <span>Total</span>
                                                </a>
                                            </li>

                                            {cartItems?.map((item) => (
                                                <>
                                                    <li>
                                                        <a>
                                                            {item.software.name}{" "}
                                                            <span className="middle">
                                                                x{" "}
                                                                {item.quantity}
                                                            </span>{" "}
                                                            <span className="last">
                                                                {
                                                                    item
                                                                        .software
                                                                        .price
                                                                }{" "}
                                                                Đ
                                                            </span>
                                                        </a>
                                                    </li>
                                                </>
                                            ))}
                                        </ul>
                                        <ul className="list list_2">
                                            <li>
                                                <a>
                                                    Subtotal{" "}
                                                    <span>{getTotal()} Đ</span>
                                                </a>
                                            </li>

                                            <li>
                                                <a>
                                                    Total{" "}
                                                    <span>{getTotal()} Đ</span>
                                                </a>
                                            </li>
                                        </ul>

                                        <div className="payment_item active">
                                            <div className="radion_btn">
                                                <input
                                                    type="radio"
                                                    id="f-option6"
                                                    name="selector"
                                                />
                                                <label htmlFor="f-option6">
                                                    Momo{" "}
                                                </label>
                                                <img src="https://developers.momo.vn/v3/vi/img/logo.svg" />
                                                <div className="check" />
                                            </div>
                                        </div>

                                        <a className="primary-btn" href="/momo">
                                            Proceed to Momo
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
            <Footer />
        </>
    );
};
