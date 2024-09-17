import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Header from "../../components/shop/Header";
import Footer from "../../components/shop/Footer";
import Banner from "../../components/shop/Banner";
import { DrashBoard } from "../../components/nav/DrashBoard";
import { useAppSelector } from "../../store/hook";
import { orderService } from "../../services/order.service";
import { OrderDetail } from "./OrderHistory";
import { error } from "console";
import { toast } from "react-toastify";

export const OrderDetailHistory = () => {
    const pamas = useParams<{ id?: string }>();
    const orderId: number = pamas.id ? parseInt(pamas.id, 10) : 0;
    const token = useAppSelector((state) => state.account.token);
    const [orderDetail, setOrderDetail] = useState<OrderDetail>();
    const navigate = useNavigate();

    useEffect(() => {
        orderService
            .getOrderDetailByID(token ? token : "", orderId)
            .then((response) => {
                setOrderDetail(response);
            })
            .catch((error) => {
                if (error.message === "token_expire") {
                    navigate("/login");
                } else {
                    toast.error(error.message);
                }
            });
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
            <Banner title="Detail-Order" />
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
                                                    <h3>
                                                        Order details #{" "}
                                                        {orderDetail?.id}{" "}
                                                    </h3>
                                                </div>
                                                <div className="row">
                                                    <p>
                                                        Display information
                                                        about products you have
                                                        purchased at Divine Shop
                                                    </p>
                                                </div>
                                                <hr className="row" />

                                                <table className="col-12">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">
                                                                Information
                                                            </th>
                                                            <th scope="col">
                                                                Order value
                                                            </th>
                                                            <th scope="col"></th>
                                                            <th scope="col"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">
                                                                Order Id:{" "}
                                                                {
                                                                    orderDetail?.id
                                                                }
                                                            </th>
                                                            <td>
                                                                total software
                                                                value
                                                            </td>
                                                            <td>
                                                                {
                                                                    orderDetail?.quantity
                                                                }
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">
                                                                Order Date:{" "}
                                                                {formatDatetime(
                                                                    orderDetail? orderDetail.order.order_date : ""
                                                                )}
                                                            </th>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">
                                                                Order status:{" "}
                                                                {
                                                                    orderDetail
                                                                        ?.order
                                                                        .status
                                                                }
                                                            </th>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">
                                                                Email receive:{" "}
                                                                {
                                                                    orderDetail
                                                                        ?.key
                                                                        .email
                                                                }
                                                            </th>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <hr className="row" />

                                                <div className="comment-list">
                                                    <div className="single-comment justify-content-between d-flex">
                                                        <div className="user justify-content-between d-flex">
                                                            <div className="thumb">
                                                                <img
                                                                    src={
                                                                        orderDetail
                                                                            ?.key
                                                                            .software
                                                                            .image_url
                                                                    }
                                                                    alt="User Image"
                                                                />
                                                            </div>
                                                            <div className="desc">
                                                                <h5>
                                                                    <a href="#">
                                                                        {
                                                                            orderDetail
                                                                                ?.key
                                                                                .software
                                                                                .name
                                                                        }
                                                                    </a>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                        <div className="thumb">
                                                            <a className="">
                                                                Quantity:{" "}
                                                                {
                                                                    orderDetail?.quantity
                                                                }
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                                {(() => {
                                                    switch (
                                                        orderDetail?.key
                                                            .software
                                                            .active_by_email
                                                    ) {
                                                        case false:
                                                            return (
                                                                <div className="thumb">
                                                                    <h5>Key</h5>
                                                                    <div className="input-group mb-3">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            aria-label="Recipient's username"
                                                                            aria-describedby="basic-addon2"
                                                                            value={
                                                                                orderDetail
                                                                                    .key
                                                                                    .key_code ===
                                                                                "null"
                                                                                    ? orderDetail
                                                                                          .key
                                                                                          .account_active
                                                                                    : orderDetail
                                                                                          .key
                                                                                          .key_code
                                                                            }
                                                                        />
                                                                        <span
                                                                            className="input-group-text"
                                                                            id="basic-addon2"
                                                                        >
                                                                            Copy
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            );
                                                        default:
                                                            return (
                                                                <div className="thumb">
                                                                    <h5>
                                                                        Email
                                                                        account
                                                                    </h5>
                                                                    <div className="input-group mb-3">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            aria-label="Recipient's username"
                                                                            aria-describedby="basic-addon2"
                                                                            value={
                                                                                orderDetail?.email_for_active
                                                                            }
                                                                        />
                                                                        <span
                                                                            className="input-group-text"
                                                                            id="basic-addon2"
                                                                        >
                                                                            Copy
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            );
                                                    }
                                                })()}

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
