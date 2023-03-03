import React from 'react';
import Header from "../components/ui/header/Header";

function Home(props) {
    require('../assets/styles/index2.css');
    return (
        <>
            <Header/>
        </>

        // <>
        //     <!-- Menu -->
        //     <nav dir="rtl" class="navbar nav_menu navbar-expand-lg fixed-top p-0 mt-0">
        //         {/*{% include "doc/header2.html" %}*/}
        //     </nav>
        //     <div class="mt-5 index-container">
        //         <div class="flex-column justify-content-center align-items-center w-50">
        //             <div class="welcometext">
        //                 <p>
        //                     حرکت بر ریل انقلاب در همه عرصه‌های سیاسی، اقتصادی، فرهنگی و امنیتی مستلزم آگاهی و عمل به فرامین و توصیه‌های مقام معظم رهبری (حضرت آیت‌الله العظمی سیدعلی خامنه‌ای) است؛ چرا که بیانات و فرامین ایشان رهنمود دولت و ملت بوده و به مثابه نقشه راهی، مسیر آینده را روشن کرده و کشور را به سرمنزل مقصود و سعادت می‌رساند.
        //                 </p>
        //                 <p class="mt-2">
        //                     پلتفرم رهنمود، با تحلیل بیانات و ابلاغیه‌های مقام معظم رهبری از ابعاد متعدد و همچنین ارزیابی انعکاس آن‌ها در نظام تقنینی کشور به کلیه نهادهای حاکمیتی، بخش خصوصی و همچنین پژوهشگران کمک می‌کند که در بیانات و ابلاغیه‌های رهبری با توجه به نیاز و دغدغه‌مندی خودشان واکاوی کرده و با استفاده از تحلیل‌های دقیق موضوعی و آماری به خروجی مورد نظر خود در کوتاه‌ترین زمان و  تنها با چند کلیک دست یابند.
        //                 </p>
        //             </div>
        //         </div>
        //         <div class="index-background row flex-column justify-content-center align-items-center w-50">
        //             <img src="../../static/image/rahbar_profile2.png" class="w-75"/>
        //         </div>
        //     </div>
        // </>
    );
}

export default Home;