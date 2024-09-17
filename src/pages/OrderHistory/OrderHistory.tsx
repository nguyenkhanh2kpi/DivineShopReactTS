import React, { Fragment, useState, useEffect } from "react";
import Header from "../../components/shop/Header";
import Footer from "../../components/shop/Footer";
import Banner from "../../components/shop/Banner";
import { DrashBoard } from "../../components/nav/DrashBoard";
import { useAppSelector } from "../../store/hook";
import { orderService } from "../../services/order.service";
import { error } from "console";
import { useNavigate } from "react-router";

export interface SoftwareOrderItem {
    id: number;
    name: string;
    price: number;
    active_by_email: boolean;
    is_one_product_per_pay: boolean;
    image_url: string;
}

export interface Order {
    id: number;
    user: string;
    order_date: string;
    status: string;
    account_active: string;
}

export interface Key {
    id: number;
    key_code: string;
    account_active: string;
    email: string;
    software: SoftwareOrderItem;
}

export interface OrderDetail {
    id: number;
    key: Key;
    order: Order;
    quantity: number;
    email_for_active: string;
}

export const OrderHistory = () => {
    const [orderDetails, setOrderDetails] = useState<OrderDetail[]>();
    const token = useAppSelector((state) => state.account.token);
    const navigate = useNavigate();

    useEffect(() => {
        orderService
            .getMyOrderDetail(token ? token : "")
            .then((response) => setOrderDetails(response))
            .catch(error => {
                if(error.message==="token_expire") {
                    navigate('/login')
                }
            })
    }, []);

    function formatDatetime(datetimeString: string): string {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        };
        return new Date(datetimeString).toLocaleDateString("en-US", options);
    }


    return (
        <>
            <Header />
            <Banner title="Order History" />
            <Fragment>
                <section className="blog_area single-post-area section_gap">
                    <div className="container">
                        <div className="row">
                            <DrashBoard tab="order" />
                            <div className="col-lg-8 posts-list">
                                <div className="comments-area">
                                    <div className="container py-2 h-100">
                                        <div className="row d-flex justify-content-center align-items-center h-100">
                                            <div className="col col-lg-12 mb-4 mb-lg-0">
                                                {/*  */}
                                                <div className="row">
                                                    <h3>Your order history</h3>
                                                </div>
                                                <div className="row">
                                                    <p>
                                                        Display information
                                                        about products you have
                                                        purchased at Divine Shop
                                                    </p>
                                                </div>
                                                <hr className="row" />
                                                <div className="progress-table-wrap">
                                                    <div className="progress-table">
                                                        <div className="table-head">
                                                            <div className="percentage">
                                                                Time
                                                            </div>
                                                            <div className="country">
                                                                Id
                                                            </div>
                                                            <div className="percentage">
                                                                Product
                                                            </div>
                                                            <div className="country">
                                                                Total
                                                            </div>
                                                            <div className="country">
                                                                Status
                                                            </div>
                                                            <div className="country">
                                                                Detail
                                                            </div>
                                                        </div>

                                                        {orderDetails?.map(
                                                            (item) => (
                                                                <div className="table-row">
                                                                    <div className="percentage">
                                                                        {
                                                                            formatDatetime(item.order.order_date)
                                                                        }
                                                                    </div>
                                                                    <div className="country">
                                                                        {
                                                                            item.id
                                                                        }
                                                                    </div>
                                                                    <div className="percentage">
                                                                        {
                                                                            item
                                                                                .key
                                                                                .software
                                                                                .name
                                                                        }
                                                                        <a>
                                                                            x
                                                                            {
                                                                                item.quantity
                                                                            }
                                                                        </a>
                                                                    </div>
                                                                    <div className="country">
                                                                        {item.quantity *
                                                                            item
                                                                                .key
                                                                                .software
                                                                                .price}
                                                                    </div>
                                                                    <div className="country">
                                                                        {
                                                                            item
                                                                                .order
                                                                                .status
                                                                        }
                                                                    </div>
                                                                    <div className="country">
                                                                        <a
                                                                            href={`/order-detail/${item.id}`}
                                                                            style={{
                                                                                color:'blue'
                                                                            }}
                                                                        >
                                                                            detail
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>

                                                {/*  */}
                                            </div>
                                        </div>
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
