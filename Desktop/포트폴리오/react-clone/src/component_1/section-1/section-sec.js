import React, { Component } from 'react';

class SectionSec extends Component{
    render(){
        return(
            <section class="sec_sect">
                <p class="sec_title">설레는 다음 여행을 위한 아이디어</p>
                <article class="sec_sect_content">
                    <a href="#" class="sec_link">
                        <img src="./img/seoul_2.jpg" alt="서울지역링크" class="sec_sect_img"/>
                        <div class="sec_sect_text">
                            <span class="text_layout">서울</span>
                            <span class="far">453km 거리</span>
                        </div>
                    </a>
                    <a href="#" class="sec_link">
                        <img src="./img/inchen_2.jpg" alt="인천지역링크" class="sec_sect_img"/>
                        <div class="sec_sect_text">
                            <span class="text_layout">인천</span>
                            <span class="far">439km 거리</span>
                        </div>
                    </a>
                    <a href="#" class="sec_link">
                        <img src="./img/daegu_2.jpg" alt="대구지역링크" class="sec_sect_img"/>
                        <div class="sec_sect_text">
                            <span class="text_layout">대구</span>
                            <span class="far">324km 거리</span>
                        </div>
                    </a>
                    <a href="#" class="sec_link_last">
                        <img src="./img/kwangju_2.jpg" alt="광주지역링크" class="sec_sect_img"/>
                        <div class="sec_sect_text">
                            <span class="text_layout">광주</span>
                            <span class="far">186km 거리</span>
                        </div>
                    </a>
                </article>
            </section>
        )
    }
}

export default SectionSec;