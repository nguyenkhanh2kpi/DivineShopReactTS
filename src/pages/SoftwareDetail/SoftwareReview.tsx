import React, { useEffect, useState, ChangeEvent, Children } from "react";
import { softwareService } from "../../services/software.service";
import { error } from "console";
import "./softwareComment.css";
import { useAppSelector } from "../../store/hook";
import imageRV from "../../styles/shop/img/product/review-1.png";
import { useNavigate } from "react-router";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-regular-svg-icons";
import img from "../../styles/shop/img/product/review-1.png";
import "./review.css";
import { reviewService } from "../../services/review.service";
import { toast } from "react-toastify";
import { userService } from "../../services/user.service";

interface SoftwareReviewProps {
    software_id: number;
    active: boolean;
}

export interface SoftwareReview {
    software_id: number;
    user_name: string;
    avatar: string;
    rate: number;
    comment: string;
}

export const SoftwareReview = ({
    software_id,
    active,
}: SoftwareReviewProps) => {
    const [myRate, setMyrate] = useState<number>(5);
    const stars = Array.from({ length: myRate }, (_, index) => index + 1);
    const username = useAppSelector((state) =>
        state.account.user ? state.account.user.username : ""
    );
    const navigate = useNavigate();

    const handleRateChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setMyrate(Number(e.target.value));
        setMyReview((inputs) => ({ ...inputs, rate: Number(e.target.value) }));
    };
    const [reviews, setReviews] = useState<SoftwareReview[]>([]);
    const token = useAppSelector((state) => state.account.token);

    const [myReview, setMyReview] = useState<SoftwareReview>({
        software_id: software_id,
        user_name: username,
        avatar: "",
        rate: 5,
        comment: "",
    });

    const setAvatar = (newAvatar: string) => {
        setMyReview((prevReview) => ({
            ...prevReview,
            avatar: newAvatar,
        }));
    };

    const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setMyReview((inputs) => ({ ...inputs, [name]: value }));
    };

    const handleSubmit = () => {
        reviewService
            .postReview(myReview, token ? token : "")
            .then((response) => {
                toast.success("Success");
                reviewService
                    .getReviewByid(software_id)
                    .then((response) => setReviews(response));
                setMyReview((prevReview) => ({
                    ...prevReview,
                    comment: "",
                }));
            })
            .catch((error) => {
                if (error.message === "order") {
                    toast.warning("Please buy first");
                } else if (error.message === "token_expired") {
                    toast.error("Plesae login first");
                } else {
                    toast.error(error.message);
                }
            });
    };

    useEffect(() => {
        reviewService
            .getReviewByid(software_id)
            .then((response) => setReviews(response));
        userService
            .getProfile(token ? token : "")
            .then((response) => setAvatar(response.avatar))
            .catch((error) => {
                toast.info("you must login first before post review");
            });
    }, []);

    const renderStars = (rating: number) => {
        const stars = Array.from({ length: rating }, (_, index) => (
            <i key={index} className="fa fa-star" />
        ));
        return stars;
    };

    const calculateAverageRating = (reviews: SoftwareReview[]) => {
        if (reviews.length === 0) {
            return 0;
        }
        const totalRating = reviews.reduce(
            (sum, review) => sum + review.rate,
            0
        );
        const averageRating = totalRating / reviews.length;
        const roundedAverageRating = Number(averageRating.toFixed(1));
        return roundedAverageRating;
    };

    return (
        <>
            <div
                className={`tab-pane fade ${active ? "show active" : ""}`}
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
            >
                <div className="row">
                    <div className="col-lg-6">
                        <div className="row total_rate">
                            <div className="col-6">
                                <div className="box_total">
                                    <h5>Overall</h5>
                                    <h4>{calculateAverageRating(reviews)}</h4>
                                    <h6>({reviews.length} Reviews)</h6>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="rating_list">
                                    <h3>Based on {reviews.length} Reviews</h3>
                                    <ul className="list">
                                        <li>
                                            <a href="#">
                                                5 Star{" "}
                                                <i className="fa fa-star" />
                                                <i className="fa fa-star" />
                                                <i className="fa fa-star" />
                                                <i className="fa fa-star" />
                                                <i className="fa fa-star" />{" "}
                                                {
                                                    reviews.filter(
                                                        (r) => r.rate === 5
                                                    ).length
                                                }
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                4 Star{" "}
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star" />
                                                {
                                                    reviews.filter(
                                                        (r) => r.rate === 4
                                                    ).length
                                                }
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                3 Star{" "}
                                                <i className="fa fa-star" />
                                                <i className="fa fa-star" />
                                                <i className="fa fa-star" />
                                                {
                                                    reviews.filter(
                                                        (r) => r.rate === 3
                                                    ).length
                                                }
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                2 Star{" "}
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star" />
                                                {
                                                    reviews.filter(
                                                        (r) => r.rate === 2
                                                    ).length
                                                }
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                1 Star{" "}
                                                <i className="fa fa-star" />
                                                {
                                                    reviews.filter(
                                                        (r) => r.rate === 1
                                                    ).length
                                                }
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="review_list">
                            {reviews.map((review) => (
                                <>
                                    <div className="review_item">
                                        <div className="media">
                                            <div className="d-flex">
                                                <img
                                                    className="review-avatar"
                                                    src={review.avatar}
                                                />
                                            </div>
                                            <div className="media-body">
                                                <h4>{review.user_name}</h4>
                                                {renderStars(review.rate)}
                                            </div>
                                        </div>
                                        <p>{review.comment}</p>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="review_box">
                            <h4>Add a Review</h4>
                            <p>Your Rating:</p>
                            <select value={myRate} onChange={handleRateChange}>
                                <option value="1">
                                    <p className="start-c">*</p>
                                </option>
                                <option value="2">
                                    <p className="start-c">**</p>
                                </option>
                                <option value="3">
                                    <p className="start-c">***</p>
                                </option>
                                <option value="4">
                                    <p className="start-c">****</p>
                                </option>
                                <option value="5">
                                    <p className="start-c">*****</p>
                                </option>
                            </select>
                            <ul className="list">
                                {stars.map(() => (
                                    <>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-star" />
                                            </a>
                                        </li>
                                    </>
                                ))}
                            </ul>

                            <div className="col-md-12">
                                <div className="form-group">
                                    <textarea
                                        onChange={handleOnChange}
                                        className="form-control"
                                        name="comment"
                                        id="comment"
                                        rows={3}
                                        placeholder="Review"
                                        value={myReview.comment}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 text-right">
                                <button
                                    className="primary-btn"
                                    onClick={handleSubmit}
                                >
                                    Submit Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
