import React, { Fragment, useEffect, useState, ChangeEvent } from "react";
import Footer from "../../components/shop/Footer";
import Header from "../../components/shop/Header";
import Banner from "../../components/shop/Banner";
import { useNavigate } from "react-router";
import { DrashBoard } from "../../components/nav/DrashBoard";
import { useAppSelector } from "../../store/hook";
import { userService } from "../../services/user.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import storage from "../../firebase/Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "../Profile/style.css";
import { locationService } from "../../services/location.service";
import { error } from "console";

export interface UserProfile {
    id: number;
    avatar: string;
    phone: string;
    identification_id: string;
    gender: string;
    province_city: string;
    district: string;
    wards: string;
    user: number;
    is_staft: boolean;
}

interface File {
    name: string;
    file: Blob;
}

export interface UserInfoma {
    pk: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

interface City {
    name: string;
    code: number;
}

interface Distric {
    name: string;
    code: number;
}

interface Wards {
    name: string;
    code: number;
}

export const Profile = () => {
    const navigate = useNavigate();
    const token = useAppSelector((state) => state.account.token);
    const user = useAppSelector((state) => state.account.user);
    const [loadsuccess, setLoadsuccess] = useState<boolean>(false);
    const [loadingAvata, setLoading] = useState<boolean>(false);
    const [userInform, setUserInform] = useState<UserInfoma>({
        pk: 0,
        username: "",
        email: "",
        first_name: "",
        last_name: "",
    });

    const [profile, setProfile] = useState<UserProfile>({
        id: 0,
        avatar: "",
        phone: "",
        identification_id: "",
        gender: "",
        province_city: "",
        district: "",
        wards: "",
        user: 0,
        is_staft: false,
    });
    const [avatar, setAvatar] = useState<string>();
    const [cities, setCity] = useState<City[]>([]);
    const [districts, setDistrict] = useState<Distric[]>([]);
    const [wards, setWards] = useState<Wards[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile((inputs) => ({ ...inputs, [name]: value }));
    };

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfile((inputs) => ({ ...inputs, [name]: value }));
    };

    const handeLoadDistric = (code: number) => {
        locationService
            .getDistric(code)
            .then((r) => setDistrict(r))
            .catch((error) => console.log(error));
    };

    const handleLoadWard = (code: number) => {
        locationService
            .getWard(code)
            .then((r) => setWards(r))
            .catch((error) => console.log(error));
    };

    const handleChangeInform = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInform((inputs) => ({ ...inputs, [name]: value }));
    };

    useEffect(() => {
        locationService.getCity().then((response) => setCity(response));
        userService
            .getUserInform(token ? token : "")
            .then((res) => {
                setUserInform(res);
            })
            .catch((error) => {
                if (error.message === "token_expire") {
                    navigate("/login/");
                }
            });
        userService
            .getProfile(token ? token : "")
            .then((response) => {
                setAvatar(response.avatar);
                setProfile(response);
                const districtCode = parseInt(response.province_city, 10);
                const wardCode = parseInt(response.district, 10);
                console.log("" + profile);
                handeLoadDistric(districtCode);
                handleLoadWard(wardCode);
            })
            .catch((error) => {
                if (error.message === "token_expire") {
                    navigate("/login/");
                }
            });
    }, []);

    useEffect(() => {
        if (loadsuccess === true) {
            handleconfirm();
            setLoadsuccess(false);
        }
    }, [loadsuccess]);

    const [file, setFile] = useState<File>();
    function handleChangeFile(event: ChangeEvent<HTMLInputElement>) {
        const selectedFile = event.target.files?.[0];

        if (selectedFile) {
            setFile({
                name: selectedFile.name,
                file: selectedFile,
            });
        } else {
            setFile(undefined);
            console.log("BUG");
        }
    }

    const handleUpload = async () => {
        if (!file) {
            toast.error("Please chose file first");
            return;
        }
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file.file);
        await uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setLoading(true);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setAvatar(url);
                    setProfile({ ...profile, avatar: url });
                    setLoadsuccess(true);
                    setLoading(false);
                    toast.success("image to fire base");
                });
            }
        );
    };

    const handleconfirm = () => {
        userService
            .updateProfile(profile, token ? token : "")
            .then((response) => {
                setProfile(response);
                toast.success("image to data");
            })
            .catch((error) => {
                if (error.message === "token_expire") {
                    navigate("/login");
                } else {
                    toast.error("tesst2" + error.message);
                }
            });
    };

    const handleUpdateClick = () => {
        userService
            .updateProfile(profile, token ? token : "")
            .then((response) => {
                setProfile(response);
                toast.success("Success Profile");
            })
            .catch((error) => toast.error("test1"+error));
        userService
            .updateUser(userInform, token ? token : "")
            .then((r) => {
                setUserInform(r);
                toast.success("Success Inform");
            })
            .catch((error) => {
                if (error.message != "token_expire") {
                    toast.error(error.message);
                } else {
                    navigate("/login");
                }
            });
    };

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
            <Banner title="Profile" />
            <Fragment>
                <section className="blog_area single-post-area section_gap">
                    <div className="container">
                        <div className="row">
                            <DrashBoard tab="account" />
                            <div className="col-lg-8 posts-list">
                                <div className="container">
                                    <div className="row gutters">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <div className="account-settings">
                                                        <div className="user-profile">
                                                            <div className="col-12">
                                                                <div className="user-avatar">
                                                                    <img
                                                                        className="img-avata row"
                                                                        src={
                                                                            avatar
                                                                        }
                                                                        alt="Maxwell Admin"
                                                                        onClick={() => {
                                                                            const fileInput =
                                                                                document.getElementById(
                                                                                    "fileInput"
                                                                                );
                                                                            if (
                                                                                fileInput
                                                                            ) {
                                                                                fileInput.click();
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={
                                                                    handleChangeFile
                                                                }
                                                                id="fileInput"
                                                                className="hidden"
                                                            />

                                                            <button
                                                                type="button"
                                                                className="btn btn-primary"
                                                                onClick={
                                                                    handleUpload
                                                                }
                                                            >
                                                                Update Avatar
                                                            </button>
                                                            <hr />

                                                            <h5 className="user-name">
                                                                Username:{" "}
                                                                {
                                                                    userInform?.username
                                                                }
                                                            </h5>
                                                            <h5 className="user-name">
                                                                Email:{" "}
                                                                {
                                                                    userInform?.email
                                                                }
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <div className="row gutters">
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <h6 className="mb-2 text-primary">
                                                                Personal Details
                                                            </h6>
                                                        </div>

                                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="firstName">
                                                                    First Name
                                                                </label>
                                                                <input
                                                                    onChange={
                                                                        handleChangeInform
                                                                    }
                                                                    name="first_name"
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="firstName"
                                                                    placeholder="First name"
                                                                    value={
                                                                        userInform?.first_name
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="eMail">
                                                                    Username
                                                                </label>
                                                                <input
                                                                    onChange={
                                                                        handleChangeInform
                                                                    }
                                                                    name="username"
                                                                    type="email"
                                                                    className="form-control"
                                                                    id="email"
                                                                    placeholder="Enter email ID"
                                                                    defaultValue={
                                                                        userInform?.username
                                                                    }
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="phone">
                                                                    Phone
                                                                </label>
                                                                <input
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    name="phone"
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="phone"
                                                                    placeholder="Enter phone number"
                                                                    value={
                                                                        profile.phone
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="lastname">
                                                                    Last Name
                                                                </label>
                                                                <input
                                                                    onChange={
                                                                        handleChangeInform
                                                                    }
                                                                    name="last_name"
                                                                    type="url"
                                                                    className="form-control"
                                                                    id="lastName"
                                                                    placeholder="Last name"
                                                                    value={
                                                                        userInform?.last_name
                                                                    }
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="phone">
                                                                    Gender
                                                                </label>
                                                                <select
                                                                    onChange={
                                                                        handleSelectChange
                                                                    }
                                                                    name="gender"
                                                                    className="form-control"
                                                                    id="gender"
                                                                    value={
                                                                        profile.gender
                                                                    }
                                                                >
                                                                    <option value="male">
                                                                        Nam
                                                                    </option>
                                                                    <option value="female">
                                                                        Nữ
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="i_id">
                                                                    ID
                                                                </label>
                                                                <input
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    name="identification_id"
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="i_id"
                                                                    placeholder="I id"
                                                                    value={
                                                                        profile.identification_id
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row gutters">
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <h6 className="mt-3 mb-2 text-primary">
                                                                Address
                                                            </h6>
                                                        </div>
                                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="Street">
                                                                    Province/city
                                                                </label>

                                                                <select
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        handleSelectChange(
                                                                            e
                                                                        );
                                                                        const selectedCityCode =
                                                                            parseInt(
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                                10
                                                                            );
                                                                        handeLoadDistric(
                                                                            selectedCityCode
                                                                        );
                                                                    }}
                                                                    name="province_city"
                                                                    className="form-control"
                                                                    id="Street"
                                                                    value={
                                                                        profile.province_city
                                                                    }
                                                                >
                                                                    <option
                                                                        value=""
                                                                        disabled
                                                                    >
                                                                        Select
                                                                        City
                                                                    </option>
                                                                    {cities.map(
                                                                        (
                                                                            city
                                                                        ) => (
                                                                            <option
                                                                                key={
                                                                                    city.code
                                                                                }
                                                                                value={city.code.toString()}
                                                                            >
                                                                                {
                                                                                    city.name
                                                                                }
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="ciTy">
                                                                    Distric
                                                                </label>

                                                                <select
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        handleSelectChange(
                                                                            e
                                                                        );
                                                                        const selectedCityCode =
                                                                            parseInt(
                                                                                e.target.value.toString(),
                                                                                10
                                                                            );
                                                                        handleLoadWard(
                                                                            selectedCityCode
                                                                        );
                                                                    }}
                                                                    name="district"
                                                                    className="form-control"
                                                                    id="district"
                                                                    value={
                                                                        profile.district
                                                                    }
                                                                >
                                                                    <option
                                                                        value=""
                                                                        disabled
                                                                    >
                                                                        Select
                                                                        Distric
                                                                    </option>
                                                                    {districts.map(
                                                                        (
                                                                            district
                                                                        ) => (
                                                                            <option
                                                                                key={
                                                                                    district.code
                                                                                }
                                                                                value={
                                                                                    district.code
                                                                                }
                                                                            >
                                                                                {
                                                                                    district.name
                                                                                }
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="sTate">
                                                                    Wards
                                                                </label>

                                                                <select
                                                                    onChange={
                                                                        handleSelectChange
                                                                    }
                                                                    name="wards"
                                                                    className="form-control"
                                                                    id="wards"
                                                                    value={
                                                                        profile.wards
                                                                    }
                                                                >
                                                                    <option
                                                                        value=""
                                                                        disabled
                                                                    >
                                                                        Select
                                                                        Wards
                                                                    </option>
                                                                    {wards.map(
                                                                        (
                                                                            ward
                                                                        ) => (
                                                                            <option
                                                                                key={
                                                                                    ward.code
                                                                                }
                                                                                value={
                                                                                    ward.name
                                                                                }
                                                                            >
                                                                                {
                                                                                    ward.name
                                                                                }
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </select>
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
                                                                    onClick={
                                                                        handleUpdateClick
                                                                    }
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
