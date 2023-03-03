import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import rahbar_profile from "../assets/image/rahbar_profile.png"
import Cookies from "../components/feature/Cookies";

function Login() {

    require('../assets/library/bootstrap-5.1.3.min.css')
    require('../assets/library/bootstrap-icons-1.7.1.css')

    require('../assets/styles/login_signup.css')

    useEffect(() => {
        document.title = 'ورود';
    }, []);

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 col-sm-11 col-lg-6 offset-md-3">

                        <form id="login" name="login" className="shadow p-4 bg-white" method="POST">
                            <div className="mb-3 text-center">
                                <img width="170px" style={{}}
                                     src={rahbar_profile} alt=""/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username">نام کاربری:</label>
                                <input className="form-control" name="email" id="username" placeholder="Username"/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="Password">رمز عبور:</label>
                                <input type="password" className="form-control" name="password" id="password"
                                       placeholder="Password"/>
                            </div>

                            <div className="mb-3">
                                <input type="checkbox" name="RememberMe"
                                       // style={{transform:'scale(1)'}}
                                />
                                {' '}
                                مرا بخاطر بسپار
                                <Link to="forgot_password" className="float-start text-decoration-none">فراموشی
                                    رمز عبور
                                </Link>
                            </div>


                            <div className="mb-3" id="messages"></div>

                            <div className="mb-3 d-grid gap-2 col-6 mx-auto">
                                <button className="btn btn-primary" type="submit">ورود</button>
                            </div>
                            <hr/>
                            <p className="text-center mb-0">قبلا ثبت‌ نام نکرده‌اید؟
                                {' '}
                                <Link to="signup">
                                    ثبت نام
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-md-3"></div>
            <Cookies/>
        </>
    );
}

export default Login;