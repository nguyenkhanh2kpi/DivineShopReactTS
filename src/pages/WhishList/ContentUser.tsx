import React, { Fragment, useEffect, useState } from "react";
import img from "../../styles/shop/img/product/p1.jpg";
import "./wl.css";
import { favoriteService } from "../../services/favorite.service";
import { useAppSelector } from "../../store/hook";
import { error } from "console";
import { Software } from "../../store/software/productSlice";

interface TabProps {
    tab: string;
}

interface Favorite {
    id: number;
    user: number;
    favorite_softwares: number[];
}

const WhishList = () => {
    const [isNone, setIsNone] = useState(false);
    const [favorites, setFavorites] = useState<Favorite>();
    const token = useAppSelector((state) => state.account.token);
    const softwareSeletor = useAppSelector((state) => state.software.softwares);
    const softwares = softwareSeletor ? softwareSeletor : [];
    const [filteredSoftwares, setFilteredSoftwares] = useState<Software[]>([]);

    useEffect(() => {
        favoriteService
            .getFavorite(token ? token : "")
            .then((response) => {
                setFavorites(response);
            })
            .catch((error) => {
                if (error.message === "Your favorite is none") setIsNone(true);
                else if (error.message === "Token is invalid or has expired")
                    window.location.href = "/login";
                else console.log("Error", error);
            });

        const filtered = softwares.filter((software) =>
            favorites?.favorite_softwares.includes(software.id)
        );
        setFilteredSoftwares(filtered);
        console.log(favorites); 
        console.log("asds"); 
    }, []);

    return (
        <>
            <div className="comments-area">
                <h4>Your whish list</h4>

                {isNone ? (
                    <div className="comment-list">
                        You have no items in your wishlist.
                    </div>
                ) : (
                    filteredSoftwares.map((software) => (
                        <div className="comment-list" key={software.id}>
                            <div className="single-comment justify-content-between d-flex">
                                <div className="user justify-content-between d-flex">
                                    <div className="thumb">
                                        <img src={img} alt="User Image" />
                                    </div>
                                    <div className="desc">
                                        <h5>
                                            <a href="#">{software.id}</a>
                                        </h5>
                                        <p className="date">
                                            December 4, 2018 at 3:12 pm{" "}
                                        </p>
                                        <p className="comment">
                                            Never say goodbye till the end
                                            comes!
                                        </p>
                                    </div>
                                </div>
                                <div className="reply-btn">
                                    <a className="btn-reply text-uppercase">
                                        Add To Cart
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

const History = () => {
    return (
        <>
            <div className="comments-area">
                <h4>Your order history</h4>
                <div className="comment-list">
                    <div className="single-comment justify-content-between d-flex">
                        <div className="user justify-content-between d-flex">
                            <div className="thumb">
                                <img src={img} />
                            </div>
                            <div className="desc">
                                <h5>
                                    <a href="#">Emilly Blunt</a>
                                </h5>
                                <p className="date">
                                    December 4, 2018 at 3:12 pm{" "}
                                </p>
                                <p className="comment">
                                    Never say goodbye till the end comes!
                                </p>
                            </div>
                        </div>
                        <div className="reply-btn">
                            <a className="btn-reply text-uppercase">
                                Add To Cart
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export const ContentUser = ({ tab }: TabProps) => {
    return (
        <>
            <Fragment>
                <section className="blog_area single-post-area section_gap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="blog_right_sidebar">
                                    <aside className="single_sidebar_widget popular_post_widget">
                                        <div className="row item-button">
                                            <a
                                                href="/user/account"
                                                className="genric-btn enable circle"
                                            >
                                                <i className="fa fa-user"></i>
                                                Account
                                            </a>
                                        </div>
                                        <div className="row item-button">
                                            <a
                                                href="/user/history"
                                                className="genric-btn enable circle"
                                            >
                                                <i className="fa fa-shopping-cart"></i>
                                                Order History
                                            </a>
                                        </div>
                                        <div className="row item-button">
                                            <a
                                                href="/user/wishlist"
                                                className="genric-btn enable circle"
                                            >
                                                <i className="fa fa-heart"></i>
                                                Favorite Product
                                            </a>
                                        </div>
                                        <div className="row item-button">
                                            <a
                                                href="/user/security"
                                                className="genric-btn enable circle"
                                            >
                                                <i className="fa fa-user-secret"></i>
                                                Password And Security
                                            </a>
                                        </div>
                                        <div className="row item-button">
                                            <a
                                                href="/user/transaction"
                                                className="genric-btn enable circle"
                                            >
                                                <i className="fa fa-id-card"></i>
                                                Transaction History
                                            </a>
                                        </div>
                                    </aside>
                                </div>
                            </div>
                            <div className="col-lg-8 posts-list">
                                {tab === "wishlist" ? <WhishList /> : <></>}
                                {tab === "history" ? <History /> : <></>}
                                {tab === "whishlist" ? <WhishList /> : <></>}
                                {tab === "whishlist" ? <WhishList /> : <></>}
                                {tab === "whishlist" ? <WhishList /> : <></>}
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        </>
    );
};
