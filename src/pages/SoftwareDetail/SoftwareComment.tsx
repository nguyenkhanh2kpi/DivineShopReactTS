import React, { useEffect, useState, ChangeEvent, Children } from "react";
import { softwareService } from "../../services/software.service";
import { error } from "console";
import "./softwareComment.css";
import { useAppSelector } from "../../store/hook";
import imageRV from "../../styles/shop/img/product/review-1.png";
import { useNavigate } from "react-router";
import tx from '../../styles/shop/img/tx.webp'
import ReactPaginate from "react-paginate";

interface SoftwareComentsProps {
    software_id: number;
    active: boolean;
}

interface Comment {
    id: number;
    user: string;
    avatar: string;
    software: number;
    text: string;
    created_at: string;
    parent_cmt: number;
    children?: Comment[];
    is_staft: boolean;
}

interface Reply {
    isShow: boolean;
    comment: Comment;
}

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

const sortComments = (comments: Comment[]): Comment[] => {
    const sortedComments = comments
        .filter((comment) => comment.parent_cmt === 0)
        .sort(
            (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
        );

    sortedComments.forEach((parentComment) => {
        parentComment.children = comments
            .filter(
                (comment) =>
                    comment.parent_cmt === parentComment.id ||
                    parentComment.children?.some(
                        (child) => child.id === comment.parent_cmt
                    )
            )
            .sort(
                (a, b) =>
                    new Date(a.created_at).getTime() -
                    new Date(b.created_at).getTime()
            );
    });
    return sortedComments;
};

export const SoftwareComent = ({
    software_id,
    active,
}: SoftwareComentsProps) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const token = useAppSelector((state) => state.account.token);
    const user = useAppSelector((state) => state.account.user);
    const [commentText, setCommentText] = useState("");
    const [showReplybox, setShowReplyBox] = useState<Reply>({
        isShow: false,
        comment: {} as Comment,
    });
    const navigate = useNavigate();

    const handleReplyClick = (comment: Comment) => {
        setShowReplyBox({ isShow: !showReplybox.isShow, comment: comment });
        setCommentText(`@${comment.user} `);
    };

    const handleOnChangeTextBox = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setCommentText(value);
    };

    const handleOnChangeTextBoxRep = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setCommentText(value);
    };
    const handleOnSubmitComment = () => {
        softwareService.addComment(
            software_id,
            commentText,
            token ? token : ""
        );
        softwareService
            .getCommentsBySoftwareId(software_id)
            .then((data) => {
                setComments(data);
            })
            .catch((error) => {
                if (error.message === "token_expire") {
                    navigate("/login");
                } else {
                    console.log(error.message);
                }
            });
        const updatedComments = [...comments];
        setComments(updatedComments);
        setCommentText("");
    };

    const handleReply = async (parent: number) => {
        await softwareService
            .reply(software_id, parent, commentText, token ? token : "")
            .then()
            .catch((err) => {
                if (err.message === "token_expire") {
                    navigate("/login");
                    return;
                }
            });
        setShowReplyBox({ isShow: false, comment: {} as Comment });
        softwareService
            .getCommentsBySoftwareId(software_id)
            .then((data) => {
                setComments(data);
            })
            .catch((error) => {
                if (error.message === "token_expire") {
                    navigate("/login");
                    return;
                } else {
                    console.log(error.message);
                }
            });
        const updatedComments = [...comments];
        setComments(updatedComments);
        setCommentText("");
    };

    useEffect(() => {
        softwareService
            .getCommentsBySoftwareId(software_id)
            .then((data) => {
                setComments(data);
            })
            .catch((error) => {
                console.log("error:", error);
            });
    }, [comments]);
    

    // panigate comment
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3;
    const pageCount = Math.ceil(comments.filter(comment => comment.parent_cmt===0).length/ itemsPerPage);
    const handlePageChange = ({selected}: {selected: number}) => {
        setCurrentPage(selected);
    };
    const displayItems = sortComments(comments).slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );


    return (
        <>
            <div
                className={`tab-pane fade ${active ? "show active" : ""}`}
                id="contact"
                role="tabpanel"
                aria-labelledby="contact-tab"
            >
                <div className="row">
                    <div className="col-lg-9">
                        <div className="col-md-12 khanh_txt">
                            <div className="form-group">
                                <textarea
                                    onChange={handleOnChangeTextBox}
                                    className="form-control"
                                    name="message"
                                    id="message"
                                    rows={1}
                                    value={commentText}
                                    placeholder="Comment here"
                                    defaultValue={""}
                                />
                            </div>
                        </div>
                        <div className="col-md-12 text-right">
                            <button
                                onClick={handleOnSubmitComment}
                                className="btn primary-btn"
                            >
                                Submit Now
                            </button>
                        </div>

                        <div className="comment_list">
                            {displayItems?.map((comment) => (
                                <>
                                    <div
                                        key={comment.id}
                                        className={`review_item ${
                                            comment.parent_cmt != 0
                                                ? "reply"
                                                : ""
                                        }`}
                                    >
                                        <div className="media">
                                            <div className="d-flex">
                                                <img
                                                    className="img-cmt-khanh"
                                                    src={comment.avatar}
                                                />
                                            </div>
                                            <div className="media-body">
                                                <h4>{comment.user}{comment.is_staft? (<img className="tich-xanh" src={tx}/>)  :""}</h4>
                                                <h5>
                                                    {formatDatetime(
                                                        comment.created_at
                                                    )}
                                                </h5>
                                                <a
                                                    className="reply_btn"
                                                    onClick={() =>
                                                        handleReplyClick(
                                                            comment
                                                        )
                                                    }
                                                >
                                                    Reply
                                                </a>
                                            </div>
                                        </div>
                                        <p>{comment.text}</p>
                                        {showReplybox.isShow &&
                                        showReplybox.comment.id ===
                                            comment.id ? (
                                            <>
                                                <div className="row">
                                                    <div className="form-group col-md-10">
                                                        <input
                                                            type="text"
                                                            onChange={
                                                                handleOnChangeTextBoxRep
                                                            }
                                                            className="form-control"
                                                            name="message"
                                                            id="message-rep"
                                                            value={commentText}
                                                            placeholder="Reply here"
                                                        />
                                                    </div>
                                                    <div className="col-md-2">
                                                        <span
                                                            className="lnr lnr-arrow-right send-button"
                                                            onClick={() =>
                                                                handleReply(
                                                                    comment.id
                                                                )
                                                            }
                                                        ></span>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                    {comment.children?.map((children) => (
                                        <div
                                            key={children.id}
                                            className={`review_item ${
                                                children.parent_cmt != 0
                                                    ? "reply"
                                                    : ""
                                            }`}
                                        >
                                            <div className="media">
                                                <div className="d-flex">
                                                    <img
                                                        className="img-cmt-khanh"
                                                        src={children.avatar}
                                                    />
                                                </div>
                                                <div className="media-body">
                                                    <h4>{children.user} {children.is_staft? (<img className="tich-xanh" src={tx}/>)  :""}</h4>
                                                    <h5>
                                                        {formatDatetime(
                                                            children.created_at
                                                        )}
                                                    </h5>
                                                </div>
                                            </div>
                                            <p>{children.text}</p>
                                        </div>
                                    ))}
                                </>
                            ))}
                        </div>

                        <ReactPaginate
                                    className="khanh-panigate"
                                    pageCount={pageCount}
                                    onPageChange={handlePageChange}
                                    previousLabel="<"
                                    nextLabel=">"
                                    breakLabel="..."
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    containerClassName="pagination justify-content-center"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    activeClassName="active"
                                />
                    </div>
                </div>
            </div>
        </>
    );
};
