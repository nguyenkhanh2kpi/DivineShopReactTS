import React, {
    Fragment,
    useState,
    useEffect,
    FormEvent,
    ChangeEvent,
} from "react";
import Header from "../../components/shop/Header";
import Footer from "../../components/shop/Footer";
import Banner from "../../components/shop/Banner";
import loginImage from "../../styles/shop/img/login.jpg";
import { useDispatch } from "react-redux";
import { logout } from "../../store/account/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userService } from "../../services/user.service";
import { error } from "console";
import { useNavigate } from "react-router";

export interface RegisterForm {
    username: string;
    email: string;
    password1: string;
    password2: string;
}

export const Register = () => {
    const [input, setInput] = useState({
        username: "",
        email: "",
        password1: "",
        password2: "",
    });

    const [submited, setSubmited] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput((inputs) => ({ ...inputs, [name]: value }));
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };
    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
        return passwordRegex.test(password);
    };
    const handleSubmit = async (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        setSubmited(true);
        const { username, email, password1, password2 } = input;
        if (!username || !email || !password1 || !password2) {
            toast.error("Please fill in all fields.");
            setSubmited(false);
            return;
        }
        if (password1 !== password2) {
            toast.error("Passwords do not match.");
            setSubmited(false);
            return;
        }
        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address.");
            setSubmited(false);
            return;
        }
        if (!validatePassword(password1)) {
            toast.error(
                "Password must be at least 8 characters and contain at least one uppercase letter."
            );
            setSubmited(false);
            return;
        }
        try {
            await userService
                .register(input)
                .then((response) => {
                    if (response.access_token) {
                        toast.success("Register success!!!");
                        navigate("/login/ Register success");
                    }
                })
                .catch((error) => toast.error(error.message));
        } finally {
            setSubmited(false);
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };



    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logout());
    }, []);

    return (
        <>
            <Header />
            <Banner title="Register" />
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
                                            href="/login"
                                        >
                                            You haved an account
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="login_form_inner">
                                    <h3>Register to enter</h3>
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
                                                type="text"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                placeholder="Email"
                                            />
                                        </div>
                                        <div className="col-md-12 form-group">
                                            <div className="input-group">
                                                <input
                                                    onChange={handleChange}
                                                    type={
                                                        showPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    className="form-control"
                                                    id="password1"
                                                    name="password1"
                                                    placeholder="Password"
                                                />
                                                <div className="input-group-append">
                                                    <span
                                                        className="input-group-text"
                                                        onClick={
                                                            togglePasswordVisibility
                                                        }
                                                    >
                                                        {showPassword ? (
                                                            <i className="ti-eye"></i>
                                                        ) : (
                                                            <i className="ti-eye"></i>
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 form-group">
                                            <div className="input-group">
                                                <input
                                                    onChange={handleChange}
                                                    type={
                                                        showPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    className="form-control"
                                                    id="password2"
                                                    name="password2"
                                                    placeholder="rePassword"
                                                />
                                                <div className="input-group-append">
                                                    <span
                                                        className="input-group-text"
                                                        onClick={
                                                            togglePasswordVisibility
                                                        }
                                                    >
                                                        {showPassword ? (
                                                            <i className="ti-eye"></i>
                                                        ) : (
                                                            <i className="ti-eye"></i>
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 form-group">
                                            {submited ? (
                                                <div>Loading...</div>
                                            ) : (
                                                <button
                                                    type="submit"
                                                    value="submit"
                                                    className="primary-btn"
                                                >
                                                    Register
                                                </button>
                                            )}

                                            {/* <button
                                                type="submit"
                                                value="submit"
                                                className="primary-btn"
                                            >
                                                Register
                                            </button> */}
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
    );
};
