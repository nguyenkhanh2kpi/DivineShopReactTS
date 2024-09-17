import React, {
    useState,
    useEffect,
    ChangeEvent,
    FormEvent,
    Dispatch,
    Fragment,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { login, logout } from "../../store/account/action";
import { AccountActionType } from "../../store/account/types";
import { useAppSelector, useAppDispatch } from "../../store/hook";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOG_OUT,
} from "../../store/account/accountSilce";
import { RootState } from "../../store";
import loginImage from "../../styles/shop/img/login.jpg";
import Header from "../../components/shop/Header";
import Footer from "../../components/shop/Footer";
import Banner from "../../components/shop/Banner";
import { ToastContainer, toast } from "react-toastify";

export const Login = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const loading = useAppSelector((state) => state.account.loading);
    const dispatch = useAppDispatch();
    const [submited, setSubmited] = useState(false);
    const { username, password } = inputs;
    const location = useLocation();

    // chuyen den trang home neu dang nhap thanh cong
    const user = useAppSelector((state) => state.account.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/home/Login success");
        }
    }, [user, navigate]);

    const error = useAppSelector((state) => state.account.error);
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);


    const pamas = useParams()
    useEffect(() => {
        toast.success(pamas.message)
        dispatch(logout());
    }, []);

    // cap nhat input khi nhap
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    };

    const handleSubmit = (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        setSubmited(true);
        if (username && password) {
            const { from } = location.state || { from: { pathname: "" } };
            dispatch(login(username, password, from));
        }
    };

    return (
        <>
            <Header />
            <Banner title="Login" />
            <Fragment>
                <section className="login_box_area section_gap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="login_box_img">
                                    <img
                                        className="img-fluid"
                                        src={loginImage}
                                    />
                                    <div className="hover">
                                        <h4>New to our website?</h4>
                                        <p>
                                            There are advances being made in
                                            science and technology everyday, and
                                            a good example of this is the
                                        </p>
                                        <a
                                            className="primary-btn"
                                            href="/register"
                                        >
                                            Create an Account
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="login_form_inner">
                                    <h3>Log in to enter</h3>
                                    <form
                                        className="row login_form"
                                        action="contact_process.php"
                                        method="post"
                                        id="contactForm"
                                        onSubmit={handleSubmit}
                                    >
                                        <div className="col-md-12 form-group">
                                            <input
                                                onChange={handleChange}
                                                type="text"
                                                className="form-control"
                                                id="username"
                                                name="username"
                                                placeholder="Username"
                                            />
                                        </div>
                                        <div className="col-md-12 form-group">
                                            <input
                                                onChange={handleChange}
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                name="password"
                                                placeholder="Password"
                                            
                                            />
                                        </div>
                                        <div className="col-md-12 form-group">
                                            <div className="creat_account">
                                                {/* <input
                                                    type="checkbox"
                                                    id="f-option2"
                                                    name="selector"
                                                /> */}
                                                {/* <label htmlFor="f-option2">
                                                    Keep me logged in
                                                </label> */}
                                            </div>
                                        </div>
                                        <div className="col-md-12 form-group">
                                            {loading ? (
                                                <div>Loading...</div>
                                            ) : (
                                                <button
                                                    type="submit"
                                                    value="submit"
                                                    className="primary-btn"
                                                >
                                                    Log In
                                                </button>
                                            )}

                                            <a href="#">Forgot Password?</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
            <Footer />
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
        </>

        // <div className="container">
        //     {/* <div>
        //         test
        //         <button onClick={handletest}>tes</button>
        //     </div> */}
        //     {/* Outer Row */}
        //     <div className="row justify-content-center">
        //         <div className="col-xl-10 col-lg-12 col-md-9">
        //             <div className="card o-hidden border-0 shadow-lg my-5">
        //                 <div className="card-body p-0">
        //                     {/* Nested Row within Card Body */}
        //                     <div className="row">
        //                         <div className="col-lg-6 d-none d-lg-block bg-login-image" />
        //                         <div className="col-lg-6">
        //                             <div className="p-5">
        //                                 <div className="text-center">
        //                                     <h1 className="h4 text-gray-900 mb-4">
        //                                         Welcome Back!
        //                                     </h1>
        //                                 </div>
        //                                 <form className="user" onSubmit={handleSubmit}>
        //                                     <div className="form-group">
        //                                         <input
        //                                             onChange={handleChange}
        //                                             name="email"
        //                                             type="email"
        //                                             className="form-control form-control-user"
        //                                             id="exampleInputEmail"
        //                                             aria-describedby="emailHelp"
        //                                             placeholder="Enter Email Address..."
        //                                         />
        //                                     </div>

        //                                     <div className="form-group">
        //                                         <input
        //                                             onChange={handleChange}
        //                                             name="password"
        //                                             type="password"
        //                                             className="form-control form-control-user"
        //                                             id="exampleInputPassword"
        //                                             placeholder="Password"
        //                                         />
        //                                     </div>

        //                                     <div className="form-group">
        //                                         <button className="btn btn-primary">
        //                                             Login
        //                                         </button>
        //                                     </div>

        //                                     <hr />
        //                                     <a
        //                                         href="index.html"
        //                                         className="btn btn-google btn-user btn-block"
        //                                     >
        //                                         <i className="fab fa-google fa-fw" />{" "}
        //                                         Login with Google
        //                                     </a>
        //                                     <a
        //                                         href="index.html"
        //                                         className="btn btn-facebook btn-user btn-block"
        //                                     >
        //                                         <i className="fab fa-facebook-f fa-fw" />{" "}
        //                                         Login with Facebook
        //                                     </a>
        //                                 </form>
        //                                 <hr />
        //                                 <div className="text-center">
        //                                     <a
        //                                         className="small"
        //                                         href="forgot-password.html"
        //                                     >
        //                                         Forgot Password?
        //                                     </a>
        //                                 </div>
        //                                 <div className="text-center">
        //                                     <a
        //                                         className="small"
        //                                         href="register.html"
        //                                     >
        //                                         Create an Account!
        //                                     </a>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};
