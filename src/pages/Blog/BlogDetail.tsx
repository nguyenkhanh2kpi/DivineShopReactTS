import React, { Fragment, useEffect, useState } from "react";
import Header from "../../components/shop/Header";
import Banner from "../../components/shop/Banner";
import Footer from "../../components/shop/Footer";
import { useParams } from "react-router";
import { Blog, BlogCategory } from "./Blog";
import { homeService } from "../../services/home.service";
import author from "../../styles/shop/img/blog/author.png";
import './blogdetail.css'

export const BlogDetail = () => {
    const params = useParams();
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
            <Banner title="Blog Detail" />
            <Fragment>
                <section className="blog_area single-post-area section_gap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 posts-list">
                                {blogs.map((blog) => {
                                    if (
                                        params.id !== undefined &&
                                        Number(params.id) === blog.id
                                    ) {
                                        return (
                                            <>
                                                <div className="single-post row">
                                                    <div className="col-lg-12">
                                                        <div className="feature-img">
                                                            <img
                                                                className="img-fluid"
                                                                src={blog.img}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3  col-md-3">
                                                        <div className="blog_info text-right">
                                                            <div className="post_tag">
                                                                {blogCates?.map(
                                                                    (cate) => (
                                                                        <>
                                                                            <a
                                                                                className={
                                                                                    cate.name ===
                                                                                    blog
                                                                                        .cate
                                                                                        .name
                                                                                        ? "active"
                                                                                        : ""
                                                                                }
                                                                            >
                                                                                {
                                                                                    cate.name
                                                                                }

                                                                                ,
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
                                                            <ul className="social-links">
                                                                <li>
                                                                    <a href="#">
                                                                        <i className="fa fa-facebook" />
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">
                                                                        <i className="fa fa-twitter" />
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">
                                                                        <i className="fa fa-github" />
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">
                                                                        <i className="fa fa-behance" />
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-9 col-md-9 blog_details">
                                                        <h2>{blog.title}</h2>
                                                        <p className="excert">
                                                            {blog.excerpt1}
                                                        </p>
                                                        <p>{blog.excerpt2}</p>
                                                        <p>{blog.excerpt3}</p>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="quotes">
                                                            {blog.quotes}
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <img
                                                                    className="img-fluid"
                                                                    src={blog.img1}
                                                                />
                                                            </div>
                                                            <div className="col-6">
                                                                <img
                                                                    className="img-fluid"
                                                                    src={blog.img2}
                                                                />
                                                            </div>
                                                            <div className="col-lg-12 mt-25">
                                                                <p>
                                                                   {blog.md1}
                                                                </p>
                                                                <p>
                                                                   {blog.md2}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    } else {
                                        return <></>;
                                    }
                                })}

                                {/* <div className="navigation-area">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-12 nav-left flex-row d-flex justify-content-start align-items-center">
                                            <div className="thumb">
                                                <a href="#">
                                                    <img
                                                        className="img-fluid"
                                                        src="img/blog/prev.jpg"
                                                    />
                                                </a>
                                            </div>
                                            <div className="arrow">
                                                <a href="#">
                                                    <span className="lnr text-white lnr-arrow-left" />
                                                </a>
                                            </div>
                                            <div className="detials">
                                                <p>Prev Post</p>
                                                <a href="#">
                                                    <h4>
                                                        Space The Final Frontier
                                                    </h4>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12 nav-right flex-row d-flex justify-content-end align-items-center">
                                            <div className="detials">
                                                <p>Next Post</p>
                                                <a href="#">
                                                    <h4>Telescopes 101</h4>
                                                </a>
                                            </div>
                                            <div className="arrow">
                                                <a href="#">
                                                    <span className="lnr text-white lnr-arrow-right" />
                                                </a>
                                            </div>
                                            <div className="thumb">
                                                <a href="#">
                                                    <img
                                                        className="img-fluid"
                                                        src="img/blog/next.jpg"
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
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
