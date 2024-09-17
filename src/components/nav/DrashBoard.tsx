import React from "react";
import { useNavigate } from "react-router";

interface DrashBoardProps {
    tab: string;
}

export const DrashBoard = ({tab}: DrashBoardProps) => {
    const navigate = useNavigate();
    return (
        <>
            <div className="col-lg-4">
                <div className="blog_right_sidebar">
                    <aside className="single_sidebar_widget popular_post_widget">
                        <div className="row item-button">
                            <a
                                onClick={() => navigate("/user/account")}
                                className={`genric-btn enable circle ${tab === "account" ? "active-bb" : ""}`}
                            >
                                <i className="fa fa-user"></i>
                                Account
                            </a>
                        </div>
                        <div className="row item-button">
                            <a
                                onClick={() => navigate("/user/history")}
                                className={`genric-btn enable circle ${tab === "order" ? "active-bb" : ""}`}
                            >
                                <i className="fa fa-shopping-cart"></i>
                                Order History
                            </a>
                        </div>
                        <div className="row item-button ">
                            <a
                                onClick={() => navigate("/user/favorite")}
                                className={`genric-btn enable circle ${tab === "favorite" ? "active-bb" : ""}`}
                            >
                                <i className="fa fa-heart"></i>
                                Favorite Product
                            </a>
                        </div>
                        <div className="row item-button">
                            <a
                                onClick={() => navigate("/user/pasword")}
                                className={`genric-btn enable circle ${tab === "password" ? "active-bb" : ""}`}
                            >
                                <i className="fa fa-user-secret"></i>
                                Password
                            </a>
                        </div>
                        {/* <div className="row item-button">
                            <a
                                onClick={() => navigate("/user/transaction")}
                                className="genric-btn enable circle"
                            >
                                <i className="fa fa-id-card"></i>
                                Transaction History
                            </a>
                        </div> */}
                    </aside>
                </div>
            </div>
        </>
    );
};
