import React, { Fragment, useEffect, useState } from "react";
import Header from "../../components/shop/Header";
import Banner from "../../components/shop/Banner";
import Footer from "../../components/shop/Footer";
import { useAppSelector } from "../../store/hook";
import { Software } from "../../store/software/productSlice";
import { favoriteService } from "../../services/favorite.service";
import "./fa.css";
import { DrashBoard } from "../../components/nav/DrashBoard";

export interface Favorite {
    id: number;
    user: number;
    favorite_softwares: Software[];
}

export const Favorite = () => {
    const [isNone, setIsNone] = useState(false);
    const [favorites, setFavorites] = useState<Favorite>();
    const token = useAppSelector((state) => state.account.token);

    useEffect(() => {
        favoriteService
            .getFavorite(token ? token : "")
            .then((response) => {
                setFavorites(response);
            })
            .catch((error) => {
                if (error.message === "Your favorite is none") {
                    setIsNone(true);
                } else if (error.message === "Token is invalid or has expired")
                    window.location.href = "/login";
                else console.log(error.message);
            });
    }, []);

    return (
        <>
            <Header />
            <Banner title="Favorite" />
            <Fragment>
                <section className="blog_area single-post-area section_gap">
                    <div className="container">
                        <div className="row">
                            <DrashBoard tab="favorite"/>
                            <div className="col-lg-8 posts-list">
                                <div className="comments-area">
                                    <h4>Your Favorite</h4>
                                    {isNone ? (
                                        <>
                                            <div className="comment-list">
                                                You have no items in your
                                                wishlist.
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {favorites?.favorite_softwares.map(
                                                (software) => (
                                                    <div
                                                        className="comment-list"
                                                        key={software.id}
                                                    >
                                                        <div className="single-comment justify-content-between d-flex">
                                                            <div className="user justify-content-between d-flex">
                                                                <div className="thumb">
                                                                    <img
                                                                        src={
                                                                            software.image_url
                                                                        }
                                                                        alt="User Image"
                                                                    />
                                                                </div>
                                                                <div className="desc">
                                                                    <h5>
                                                                        <a href="#">
                                                                            {
                                                                                software.name
                                                                            }
                                                   
                                                                        </a>
                                                                    </h5>
                                                                    <p className="date">
                                                                        {
                                                                            software
                                                                                .category
                                                                                .name
                                                                        }
                                                                                                 {
                                                                                software.id
                                                                            }
                                                                    </p>
                                                                    <p className="comment">
                                                                        {
                                                                            software.price
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="reply-btn">
                                                                <a
                                                                    className="btn-reply text-uppercase"
                                                                    href={`/detail/${software.id}/`}
                                                                >
                                                                    Buy
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </>
                                    )}
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
