import React from 'react';
import { Link } from "react-router-dom";

import rahbar_profile1 from "../../../assets/image/rahbar_profile1.png"

function Header(props) {
    require('../../../assets/library/bootstrap-icons-1.3.0.css')
    require('../../../assets/library/bootstrap.min-4.5.2.css')
    require('../../../assets/library/bootstrap.min-5.1.2npm.css')
    require('../../../components/form/select2/select2.css')
    require('../../../assets/library/fontawesome-5.10.0.all.css')
    require('../../../assets/library/font-awesome.min-4.7.0.css')
    return (
        <>
            <nav dir="rtl" className="navbar nav_menu navbar-expand-lg fixed-top p-0 mt-0">
            <div className="container-fluid pr-0 mx-0">
                <Link to={'/'} className="navbar-brand mr-0 px-1" id="brand_name" style={{marginLeft:"25px"}}>
                    <img width="50px" src={rahbar_profile1} alt=""/>
                        رهنمود
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div dir="rtl" className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav pr-0 mx-auto mb-2 mb-lg-0">

                        <li className="nav-item" id="document_profile" style={{display: "none"}}>
                            <Link className="nav-link" id="Rahbari_profile_link" role="button"
                               to="document_profile" aria-expanded="false">

                                پروفایل اسناد رهبری
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" id="rahbari_search" data-bs-toggle="tooltip" data-bs-placement="bottom"
                               to="rahbari_search" style={{display: "none"}}>
                                جست‌وجو در بیانات و ابلاغیه‌ها
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" id="approvals_adaptation" data-bs-toggle="tooltip" data-bs-placement="bottom"
                               to="approvals_adaptation" style={{display: "none"}}>

                                انطباق‌سنجی مصوبات
                            </Link>
                        </li>

                        {/*Rahbari */}

                        <li className="nav-item dropdown" id="rahbari_analysis" style={{display: "none"}}>
                            <a className="nav-link dropdown-toggle" href="" id="RahbariDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">


                                تحلیل اسناد رهبری
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="RahbariDropdown">

                                <li>
                                    <Link id="rahbari_paraghraph" className="dropdown-item text-right"
                                       to="rahbari_paraghraph"
                                          style={{display: "none"}}>تحلیل فرامین رهبری
                                    </Link>
                                </li>
                                <li>
                                    <Link id="rahbari_subject" className="dropdown-item text-right" to="rahbari_subject"
                                          style={{display: "block"}}>تحلیل موضوعی
                                    </Link>
                                </li>
                                <li>
                                    <Link id="rahbari_graph" className="dropdown-item text-right" to="rahbari_graph"
                                          style={{display: "block"}}>تحلیل گرافی
                                    </Link>
                                </li>
                                <li>
                                    <Link id="rahbari_topic" className="dropdown-item text-right" to="rahbari_topic"
                                          style={{display: "block"}}>تحلیل هوشمند موضوعی
                                    </Link>
                                </li>
                                <li>
                                    <Link id="leadership_slogan" className="dropdown-item text-right" to="leadership_slogan"
                                          style={{display: "none"}}>
                                        تحلیل شعار سال
                                    </Link>
                                </li>
                                <li>
                                    <Link id="rahbari_organization" className="dropdown-item text-right"
                                       to="rahbari_organization"
                                       style={{display: "block", pointerEvents: "none"}}>
                                        تحلیل سازمان
                                        <span className="coming-soon">(به زودی)</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link id="rahbari_problem_system" className="dropdown-item text-right"
                                       to="rahbari_problem_system"
                                          style={{display: "block", pointerEvents: "none"}}>نظام مسائل رهبری <span className="coming-soon">(به زودی)</span>
                                    </Link>
                                </li>

                            </ul>
                        </li>

                        <li className="nav-item dropdown" id="UserProfile_panels">
                            <a className="nav-link dropdown-toggle" href="" id="UserProfileDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                تعاملات و یادداشت‌ها
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="UserProfileDropdown">
                                <li>
                                    <Link id="following_document_comments" className="dropdown-item text-right"
                                       to="following_document_comments">
                                        نظرات تحلیلی دنبال‌شوندگان
                                    </Link>
                                </li>
                                <li>
                                    <Link id="notes" className="dropdown-item text-right" to="notes">
                                        یادداشت‌های شخصی
                                    </Link>
                                </li>

                                {/*<li><hr className="dropdown-divider"></li>*/}

                            </ul>
                        </li>

                    </ul>


                </div>
                {/*vertical line*/}
                <div className="vr" style={{color: "white", marginLeft: "10px", padding:"1px"}}></div>

                <ul className="navbar-nav pr-0 mb-2 mb-lg-0">
                    <li className="nav-item p-1" style={{marginLeft: "-5px"}}>
                        <a className="nav-link" id="help_link" _onclick="showTour()" data-bs-toggle="tooltip"
                           data-bs-placement="bottom" title="راهنما" href="">
                            <i id="help_icon" className="bi bi-question-circle"></i>
                        </a>
                    </li>

                    <li className="nav-item dropdown p-1" id="admin_panels" style={{marginLeft: '-5px', display: 'none'}}>
                        <a className="nav-link" href="" id="AdminDropdown" role="button" data-bs-toggle="dropdown"
                           data-bs-toggle="tooltip" data-bs-placement="bottom" title="پنل ادمین" aria-expanded="false">
                            <i className="fas fa-user-cog" style={{fontSize: '15px', textAlign: 'center', marginTop:'5px'}}></i>

                        </a>
                        <ul className="dropdown-menu" aria-labelledby="AdminDropdown">
                            <li>
                                <Link id="manage_users_tab" className="dropdown-item text-right" to="manage_users_tab"
                                      style={{display: "none"}}>
                                    مدیریت کاربران
                                </Link>
                            </li>
                            {/*<li><a id="admin_waiting_user" className="dropdown-item text-right"*/}
                            {/*                     href="{% url 'admin_waiting_user' %}" style="display: none;">*/}
                            {/*    تایید کاربران</a>*/}
                            {/*</li>*/}
                            {/*<li><a id="admin_accepted_user" className="dropdown-item text-right"*/}
                            {/*                     href="{% url 'admin_accepted_user' %}" style="display: none;">*/}
                            {/*    کاربران تایید شده</a>*/}
                            {/*</li>*/}
                            <li><Link id="admin_upload" className="dropdown-item text-right" to="admin_upload"
                                      style={{display: "none"}}>
                                    آپلود فایل
                                </Link>
                            </li>
                            {/*<li><a id="admin_user_recommendation" className="dropdown-item text-right"*/}
                            {/*                     href="{% url 'admin_user_recommendation' %}" style="display: none;">*/}
                            {/*    مشاهده نظرات کاربران</a>*/}
                            {/*</li>*/}
                            <li><Link id="admin_user_report_bug" className="dropdown-item text-right"
                                   to="admin_user_report_bug" style={{display: "none"}}>
                                    مشاهده گزارشات خطاها
                                </Link>
                            </li>
                            <li><Link id="admin_accept_user_comments" className="dropdown-item text-right"
                                   to="admin_accept_user_comments" style={{display: "none"}}>
                                    تایید نظرات تحلیل اسناد
                                </Link>
                            </li>
                            <li><Link id="super_admin_user_log" className="dropdown-item text-right"
                                   to="super_admin_user_log" style={{display: "none"}}>
                                    لاگ کاربران
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item dropdown p-1" id="Profile_panels" style={{marginLeft: '-5px'}}>
                        <a className="nav-link dropdown-toggle h-100" href="" id="ProfileDropdown" role="button"
                           data-bs-toggle="dropdown" aria-expanded="false" style={{paddingTop: '13px'}}>

                        </a>
                        <ul className="dropdown-menu dropdown-menu-start" aria-labelledby="ProfileDropdown"
                            style={{minWidth: '210px'}}>
                            <li>
                                <Link className="dropdown-item text-right" id="user_profile" to="ShowMyUserProfile">
                                    <i className="bi bi-person-circle"
                                       style={{fontSize: '15px', position: 'relative', top: '-5px', fontWeight: 'bold'}}></i>
                                    <span className="mr-1">پروفایل</span>
                                </Link>
                            </li>
                            <li>
                                <a _onclick="sign_out_function()" className="dropdown-item text-right" id="logout_link" href="">
                                    <i className="fa fa-sign-out"></i>
                                    <span className="mr-1">خروج</span>

                                </a>
                            </li>
                            <li>
                                <Link id="recommendation" className="dropdown-item text-right" to="recommendation">
                                    <i className="fa fa-lightbulb"></i>
                                    <span className="mr-1">انتقادات و پیشنهادات</span>
                                </Link>
                            </li>

                            <li>
                                <Link id="report_bug" className="dropdown-item text-right" to="report_bug">
                                    <i className="fa fa-bug"></i>
                                    <span className="mr-1">گزارش خطا</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            </nav>
        </>
    );
}

export default Header;