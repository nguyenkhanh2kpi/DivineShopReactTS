import React, { Fragment, useState, useEffect } from "react";
import Header from "../../components/shop/Header";
import Banner from "../../components/shop/Banner";
import Footer from "../../components/shop/Footer";
import { cartService } from "../../services/cart.service";
import { Software } from "../../store/software/productSlice";
import { useAppSelector } from "../../store/hook";
import { error } from "console";
import "./cart.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface CartItem {
    id: number;
    software: Software;
    quantity: number;
    created_at: string;
    email_for_active: string;
    cart: number;
}

export const Cart = () => {
    const [cartsItems, setCartItem] = useState<CartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const token = useAppSelector((state) => state.account.token);

    // ham tinh tong tien
    const getTotal = () => {
        return cartsItems.reduce(
            (total, item) => total + item.software.price * item.quantity,
            0
        );
    };

    // ham xu ly tang, giam item
    const handeChangeItemClick = async (
        itemId: number,
        add: boolean,
        email: string,
        is_one_product_per_pay: boolean
    ) => {
        if (email != "") {
            toast.info(
                "The maximum quantity that can be purchased is 1 product"
            );
            return;
        }
        if (is_one_product_per_pay) {
            toast.info(
                "The maximum quantity that can be purchased is 1 product"
            );
            return;
        } else {
            await cartService
                .postToCart(token ? token : "", itemId, add)
                .then(() => {
                    cartService
                        .getCart(token ? token : "")
                        .then((data) => {
                            setCartItem(data);
                            toast.success("Success");
                        })
                        .catch((error) => toast.error(error));
                })
                .catch((error) => toast.error(error));
        }
    };

    // ham xu ly remove
    const handleRemove = async (itemId: number) => {
        await cartService
            .delOutCart(token ? token : "", itemId)
            .then(() => {
                cartService
                    .getCart(token ? token : "")
                    .then((data) => {
                        setCartItem(data);
                        toast.success("Success");
                    })
                    .catch((error) => toast.error(error));
            })
            .catch((error) => toast.error(error));
    };

    useEffect(() => {
        cartService
            .getCart(token ? token : "")
            .then((data) => setCartItem(data))
            .catch((error) => {
                if (error.message === "Token is invalid or has expired") {
                    window.location.href = "/login";
                } else {
                    console.log(error);
                }
            });
    }, []);

    console.log(cartsItems);
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
            <Banner title="Cart" />
            <Fragment>
                <section className="cart_area">
                    <div className="container">
                        <div className="cart_inner">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Product</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Email Account</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartsItems?.map((item) => (
                                            <>
                                                <tr key={item.id}>
                                                    <td>
                                                        <div className="media">
                                                            <div className="d-flex item-cart-k">
                                                                <img
                                                                    src={
                                                                        item
                                                                            .software
                                                                            .image_url
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="media-body">
                                                                <p>
                                                                    {
                                                                        item
                                                                            .software
                                                                            .name
                                                                    }
                                                                </p>
                                                                <button className="del-button"
                                                                    onClick={() =>
                                                                        handleRemove(
                                                                            item
                                                                                .software
                                                                                .id
                                                                        )
                                                                    }
                                                                >
                                                                    X
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <h5>
                                                            {
                                                                item.software
                                                                    .price
                                                            }
                                                        </h5>
                                                    </td>
                                                    <td>
                                                        <div className="product_count">
                                                            <input
                                                                disabled={true}
                                                                type="text"
                                                                name="qty"
                                                                id="sst"
                                                                maxLength={12}
                                                                value={
                                                                    item.quantity
                                                                }
                                                                title="Quantity:"
                                                                className="input-text qty"
                                                            ></input>
                                                            <button
                                                                onClick={() =>
                                                                    handeChangeItemClick(
                                                                        item
                                                                            .software
                                                                            .id,
                                                                        true,
                                                                        item.email_for_active,
                                                                        item
                                                                            .software
                                                                            .is_one_product_per_pay
                                                                    )
                                                                }
                                                                className="increase items-count"
                                                                type="button"
                                                            >
                                                                <i className="lnr lnr-chevron-up" />
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handeChangeItemClick(
                                                                        item
                                                                            .software
                                                                            .id,
                                                                        false,
                                                                        item.email_for_active,
                                                                        item
                                                                            .software
                                                                            .is_one_product_per_pay
                                                                    )
                                                                }
                                                                className="reduced items-count"
                                                                type="button"
                                                            >
                                                                <i className="lnr lnr-chevron-down" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <h5>
                                                            {
                                                                item.email_for_active
                                                            }
                                                        </h5>
                                                    </td>
                                                    <td>
                                                        <h5>
                                                            {item.quantity *
                                                                item.software
                                                                    .price}
                                                            VND
                                                        </h5>
                                                    </td>
                                                </tr>
                                            </>
                                        ))}

                                        <tr className="bottom_button">
                                            <td>Counpon</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>
                                                <div className="cupon_text d-flex align-items-center">
                                                    <input
                                                        type="text"
                                                        placeholder="Coupon Code"
                                                    />
                                                    <a
                                                        className="gray_btn"
                                                        href="#"
                                                    >
                                                        Apply
                                                    </a>
                                                    <a
                                                        className="primary-btn"
                                                        href="#"
                                                    >
                                                        Close
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr className="bottom_button">
                                            <td>Gift Friend</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>
                                                <div className="cupon_text d-flex align-items-center">
                                                    <input
                                                        type="text"
                                                        placeholder="Email Friend"
                                                    />
                                                    <a
                                                        className="gray_btn"
                                                        href="#"
                                                    >
                                                        Apply
                                                    </a>
                                                    <a
                                                        className="primary-btn"
                                                        href="#"
                                                    >
                                                        Close
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>
                                                <h5>Subtotal</h5>
                                            </td>
                                            <td>
                                                <h5>
                                                    {getTotal()}
                                                    VND
                                                </h5>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>
                                                <h5>Total value to be paid</h5>
                                            </td>
                                            <td>
                                                <h5>
                                                    {getTotal()}
                                                    VND
                                                </h5>
                                            </td>
                                        </tr>
                                        <tr className="out_button_area">
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>
                                                <div className="checkout_btn_inner d-flex align-items-center">
                                                    <a
                                                        className="gray_btn"
                                                        href="#"
                                                    >
                                                        Continue Shopping
                                                    </a>
                                                    <a
                                                        className="primary-btn"
                                                        href="/checkout"
                                                    >
                                                        Proceed to checkout
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
            <Footer />
        </div>
    );
};
