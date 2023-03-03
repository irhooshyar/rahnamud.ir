// ************************************
// This Component must be checked later
// ************************************

import React, {useEffect} from 'react';
// import {Helmet} from "react-helmet";



function Cookies(props) {


    useEffect(() => {
        let cookie_consent = getCookie("user_cookie_consent");
        if(cookie_consent !== ""){
            document.getElementById("cookieNotice").style.display = "none";
        }else{
            document.getElementById("cookieNotice").style.display = "block";
        }

    }, []);

    // Create cookie
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    // Delete cookie
    function deleteCookie(cname) {
        const d = new Date();
        d.setTime(d.getTime() + (24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=;" + expires + ";path=/";
    }

    // Read cookie
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    // Set cookie consent
    function acceptCookieConsent(){
        deleteCookie('user_cookie_consent');
        setCookie('user_cookie_consent', 1, 30);
        document.getElementById("cookieNotice").style.display = "none";
    }


    return (
        <>
            {/*<Helmet>*/}
            {/*    <script src="../../assets/js/Bita.js" type="text/javascript" />*/}
            {/*</Helmet>*/}
            <div id="cookieNotice" className="card shadow text-center ">
                <div id="closeIcon" className="closeIcon" style={{display: "none"}}>
                </div>
                <div className="title-wrap">
                    <h4>حریم خصوصی شما!</h4>
                </div>
                <br/>
                <div className="content-wrap">
                    <div className="msg-wrap">
                        <p>این وب‌سایت از کوکی‌ها یا فناوری‌های مشابه برای بهبود تجربه مرور شما و ارائه توصیه‌های شخصی استفاده می‌کند. با ادامه استفاده از وب سایت ما، با سیاست حفظ <a style={{color:"#115cfa"}} href=""> حریم شخصی</a> ما موافقت میکنید. </p>

                    </div>
                    <div>
                        <br/>
                        <button className="btn btn-primary btn-cookie"  onClick={acceptCookieConsent}>
                            پذیرش
                        </button>
                    </div>
                </div>
            </div>
            {/*<Helmet>*/}
            {/*    <script>*/}
            {/*        initXC(304, "wKxiyjGD2r9Iv3zK4JoAV3qWL0cJlsjG2lkfcT98");*/}
            {/*    </script>*/}
            {/*</Helmet>*/}
            {/*<ScriptTag type="text/javascript" src="../../assets/js/Bita.js" />*/}
        </>
    );
}

export default Cookies;