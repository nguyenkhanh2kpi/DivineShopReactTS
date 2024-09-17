import React, { useEffect, useState } from "react";
import imageBanner from "../../styles/shop/img/banner/banner-img.png";
import "../shop/banner.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { homeService } from "../../services/home.service";
import "./homeBanner.css"

interface SliderItem {
    id: number,
    name: string,
    description: string,
    link: string,
    image: string
}

export default function HomeBanner() {
    const [sliders, setSliders] = useState<SliderItem[]>([]);
    useEffect(() => {
        homeService
            .getSlider()
            .then((data) => {
                setSliders(data);
            })
            .catch((error) => {
                console.error("Error fetching sliders:", error);
            });
    }, []);

    var settingsSlider = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000, 
    };

    return (
        <div>
            <section className="banner-area">
                <div className="container">
                    <div className="row fullscreen align-items-center justify-content-start">
                        <div className="col-lg-12">
                            <div className="banner-container">
                                <Slider {...settingsSlider}>
                                    {sliders.map((slider) => (
                                        <div className="row single-slide align-items-center d-flex" key={slider.id}>
                                            <div className="col-lg-5 col-md-6">
                                                <div className="banner-content">
                                                    <h1>
                                                        {slider.name} <br />
                                                    </h1>
                                                    <p>
                                                        {slider.description}
                                                    </p>
                                                    <div className="add-bag d-flex align-items-center">
                                                        <a className="add-btn">
                                                            <span className="lnr lnr-eye" />
                                                        </a>
                                                        <span className="add-text text-uppercase">
                                                            View more
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-7">
                                                <div className="banner-img">
                                                    <img
                                                        className="img-fluid khanh-cus-img"
                                                        src={slider.link}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
