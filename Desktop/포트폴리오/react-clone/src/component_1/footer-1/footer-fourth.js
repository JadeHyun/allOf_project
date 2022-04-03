import React, { Component } from 'react';

class FooterFourth extends Component {
    render(){
        return(
            <span class="nav_content">
                <p>소개</p>
                <div>
                    <ul class="footer_list_items">
                        <li  class="media_li"><a href="">뉴스룸</a></li>
                        <li class="media_li"><a href="">새로운 기능에 대해 알아보기</a></li>
                        <li class="media_li"><a href="">에어비앤비 공동창업자의 메세지</a></li>
                    </ul>
                    <ul class="footer_list_items_2">
                        <li  class="media_li"><a href="">채용정보</a></li>
                        <li class="media_li"><a href="">투자자 정보</a></li>
                        <li class="media_li"><a href="">에어비앤비 Luxe</a></li>
                    </ul>
                </div>
            </span>
        )
    }
}

export default FooterFourth;