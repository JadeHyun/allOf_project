import React, { Component } from 'react';

class FooterFifth extends Component {
    render(){
        return(
            <section class="sec_nav_layout">
                <span class="nav_last_fir">
                    <span class="footer_text">© 2021 Airbnb, Inc.</span>
                    <a href="" class="fake">개인정보 처리방침2</a>
                    <a href="" class="fake">이용약관</a>
                    <a href="" class="fake">사이트맵</a>
                    <a href="" class="fake">한국의 변경된 환불 정책</a>
                    <a href="" class="fake">회사 세부정보</a>
                </span>

                <span class="nav_last_sec">
                    <a href="" class="korean">한국어(KR)</a>
                    <a href="">KRW</a>
                    <a href=""><img src="./img/facebook.png" alt="" class="footer_img"/></a>
                    <a href=""><img src="./img/twitter.png" alt="" class="footer_img"/> </a>
                    <a href=""><img src="./img/instargram_2.png" alt="" class="footer_img"/></a>
                    <a href=""><img src="./img/naver_blog.png" alt="" class="footer_img"/></a>
                    <a href=""><img src="./img/pen.png" alt="" class="footer_img"/></a>
                </span>
            </section>

        )
    }
}

export default FooterFifth;