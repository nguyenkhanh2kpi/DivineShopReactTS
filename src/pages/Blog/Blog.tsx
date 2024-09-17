import React, { Fragment, useEffect, useState } from "react";
import Header from "../../components/shop/Header";
import Banner from "../../components/shop/Banner";
import Footer from "../../components/shop/Footer";
import img1 from "../../styles/shop/img/blog/main-blog/m-blog-1.jpg";
import author from "../../styles/shop/img/blog/author.png";
import img_cate1 from "../../styles/shop/img/blog/cat-post/cat-post-1.jpg";
import img_cate2 from "../../styles/shop/img/blog/cat-post/cat-post-2.jpg";
import img_cate3 from "../../styles/shop/img/blog/cat-post/cat-post-3.jpg";

import "./blog.css";
import { homeService } from "../../services/home.service";

export interface BlogCategory {
    id: number;
    name: string;
    image: string;
}

export interface Blog {
    id: number;
    cate: BlogCategory;
    author: string;
    author_avatar: string;
    dateTime: string;
    img: string;
    title: string;
    excerpt1: string;
    excerpt2: string;
    excerpt3: string;
    quotes: string;
    img1: string;
    img2: string;
    md1: string;
    md2: string;
}

export const Blog = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [blogCates, setBlogsCate] = useState<BlogCategory[]>();

    useEffect(() => {
        homeService.getBlogs().then((response) => setBlogs(response));
        homeService
            .getBlogCategory()
            .then((response) => setBlogsCate(response));
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
            <Banner title="Blog" />
            <Fragment>
                <section className="blog_categorie_area">
                    <div className="container">
                        <div className="row">
                            {blogCates?.map((cate) => (
                                <>
                                    <div className="col-lg-4">
                                        <div className="categories_post">
                                            <img
                                                className="img-cate"
                                                src={cate.image}
                                                alt="post"
                                            />
                                            <div className="categories_details">
                                                <div className="categories_text">
                                                    <a>
                                                        <h5>{cate.name}</h5>
                                                    </a>
                                                    <div className="border_line" />
                                                    <p></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                </section>
            </Fragment>

            <Fragment>
                <section className="blog_area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="blog_left_sidebar">
                                    {blogs.map((blog) => (
                                        <>
                                            <article className="row blog_item">
                                                <div className="col-md-3">
                                                    <div className="blog_info text-right">
                                                        <div className="post_tag">
                                                            {blogCates?.map(
                                                                (cate) => (
                                                                    <>
                                                                        <a className={cate.name===blog.cate.name ? "active" : ""}>
                                                                            {cate.name},
                                                                        </a>
                                                                    </>
                                                                )
                                                            )}
                                                        </div>
                                                        <ul className="blog_meta list">
                                                            <li>
                                                                <a>
                                                                    {
                                                                        blog.author
                                                                    }
                                                                    <i className="lnr lnr-user" />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a>
                                                                    {formatDatetime(
                                                                        blog.dateTime
                                                                    )}
                                                                    <i className="lnr lnr-calendar-full" />
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="col-md-9">
                                                    <div className="blog_post">
                                                        <img src={blog.img} />
                                                        <div className="blog_details">
                                                            <a href={`/blog-detail/${blog.id}`}>
                                                                <h2>
                                                                    {blog.title}
                                                                </h2>
                                                            </a>
                                                            <p>
                                                                {blog.excerpt1}
                                                            </p>
                                                            <a
                                                                href={`/blog-detail/${blog.id}`}
                                                                className="white_bg_btn"
                                                            >
                                                                View More
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>
                                        </>
                                    ))}

                                    <nav className="blog-pagination justify-content-center d-flex">
                                        <ul className="pagination">
                                            <li className="page-item">
                                                <a
                                                    href="#"
                                                    className="page-link"
                                                    aria-label="Previous"
                                                >
                                                    <span aria-hidden="true">
                                                        <span className="lnr lnr-chevron-left" />
                                                    </span>
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a
                                                    href="#"
                                                    className="page-link"
                                                >
                                                    01
                                                </a>
                                            </li>
                                            <li className="page-item active">
                                                <a
                                                    href="#"
                                                    className="page-link"
                                                >
                                                    02
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a
                                                    href="#"
                                                    className="page-link"
                                                >
                                                    03
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a
                                                    href="#"
                                                    className="page-link"
                                                >
                                                    04
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a
                                                    href="#"
                                                    className="page-link"
                                                >
                                                    09
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a
                                                    href="#"
                                                    className="page-link"
                                                    aria-label="Next"
                                                >
                                                    <span aria-hidden="true">
                                                        <span className="lnr lnr-chevron-right" />
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="blog_right_sidebar">
                                    <aside className="single_sidebar_widget search_widget">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search Posts"
                                            />
                                            <span className="input-group-btn">
                                                <button
                                                    className="btn btn-default"
                                                    type="button"
                                                ></button>
                                            </span>
                                        </div>

                                        <div className="br" />
                                    </aside>
                                    <aside className="single_sidebar_widget author_widget">
                                        <img
                                            className="author_img rounded-circle"
                                            src={author}
                                        />
                                        <h4>Charlie Barber</h4>
                                        <p>Senior blog writer</p>
                                        <div className="social_icon">
                                            <a href="#">
                                                <i className="fa fa-facebook" />
                                            </a>
                                            <a href="#">
                                                <i className="fa fa-twitter" />
                                            </a>
                                            <a href="#">
                                                <i className="fa fa-github" />
                                            </a>
                                            <a href="#">
                                                <i className="fa fa-behance" />
                                            </a>
                                        </div>
                                        <p>
                                            Boot camps have its supporters andit
                                            sdetractors. Some people do not
                                            understand why you should have to
                                            spend money on boot camp when you
                                            can get. Boot camps have itssuppor
                                            ters andits detractors.
                                        </p>
                                        <div className="br" />
                                    </aside>
                                    <aside className="single_sidebar_widget popular_post_widget">
                                        <h3 className="widget_title">
                                            Popular Posts
                                        </h3>

                                        {blogs.map((blog) => (
                                            <>
                                                <div className="media post_item">
                                                    <img
                                                        src={blog.img}
                                                        alt="post"
                                                        className="po-post-img"
                                                    />
                                                    <div className="media-body">
                                                        <a href="blog-details.html">
                                                            <h3>
                                                                {blog.title}
                                                            </h3>
                                                        </a>
                                                        <p>{blog.dateTime}</p>
                                                    </div>
                                                </div>
                                            </>
                                        ))}
                                    </aside>

                                    <aside className="single_sidebar_widget post_category_widget">
                                        <h4 className="widget_title">
                                            Post Catgories
                                        </h4>
                                        <ul className="list cat-list">
                                            {blogCates?.map((cate) => (
                                                <>
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className="d-flex justify-content-between"
                                                        >
                                                            <p>{cate.name}</p>
                                                            <p>
                                                                {
                                                                    blogs.filter(
                                                                        (
                                                                            blog
                                                                        ) =>
                                                                            blog
                                                                                .cate
                                                                                .name ===
                                                                            cate.name
                                                                    ).length
                                                                }
                                                            </p>
                                                        </a>
                                                    </li>
                                                </>
                                            ))}
                                        </ul>
                                    </aside>
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
