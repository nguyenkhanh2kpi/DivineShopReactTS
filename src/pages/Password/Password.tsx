import React, { ChangeEvent, Fragment, useState } from "react";
import Header from "../../components/shop/Header";
import { ToastContainer, toast } from "react-toastify";
import Banner from "../../components/shop/Banner";
import Footer from "../../components/shop/Footer";
import { DrashBoard } from "../../components/nav/DrashBoard";
import { useAppSelector } from "../../store/hook";
import { passwordService } from "../../services/password.service";
import { error } from "console";


export interface ResetPassword {
    new_password1: string;
    new_password2: string;
}

export const Password = () => {
    const token = useAppSelector(state => state.account.token);
    const [resetPassword, setResetPassword] = useState<ResetPassword>({
        new_password1: "",
        new_password2: ""
    });

    const handleChange =(e:ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setResetPassword((inputs) => ({...inputs, [name]: value}))
    }

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = () => {
        if (!validatePassword(resetPassword.new_password1)) {
            toast.error(
                "Password 1 must be at least 8 characters and contain at least one uppercase letter."
            );
            return;
        }
        if (!validatePassword(resetPassword.new_password2)) {
            toast.error(
                "Password 2 must be at least 8 characters and contain at least one uppercase letter."
            );
            return;
        }
        passwordService.resetPassword(resetPassword, token ? token : "")
        .then(response => {
            toast.success("asd")
        })
        .catch(error => {
            if(error.message==="token_expire") {
                toast.error("you must login")
            }
            else{
                toast.warning(error.message)
            }
        })
    }

    return (
        <>
            <Header />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Banner title="Password" />
            <Fragment>
                <section className="blog_area single-post-area section_gap">
                    <div className="container">
                        <div className="row">
                            <DrashBoard tab="password" />
                            <div className="col-lg-8 posts-list">
                                <div className="container">
                                    <div className="row gutters">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <div className="row gutters">
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <h6 className="mb-2 text-primary">
                                                                Password Change
                                                            </h6>
                                                        </div>

                                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="firstName">
                                                                    New Password
                                                                </label>
                                                                <input
                                                                    name="new_password1"
                                                                    value={resetPassword.new_password1}
                                                                    onChange={handleChange}
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="firstName"
                                                                    placeholder="Password"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="eMail">
                                                                    Re New
                                                                    Password
                                                                </label>
                                                                <input
                                                                    name="new_password2"
                                                                    value={resetPassword.new_password2}
                                                                    onChange={handleChange}
                                                                    type="email"
                                                                    className="form-control"
                                                                    id="email"
                                                                    placeholder="Re password"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row gutters">
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="text-right">
                                                                <button
                                                                    type="button"
                                                                    id="submit"
                                                                    name="submit"
                                                                    className="btn btn-primary"
                                                                    onClick={handleSubmit}
                                                                >
                                                                    Update
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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
