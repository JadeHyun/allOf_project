import React, { Component } from 'react';

class FooterFir extends Component {
    render(){
        return(
            <div class="nav_content">
                <p>에어비앤비 지원</p>
                <div >
                    <ul class="footer_list_items" >
                        <li class="media_li"><a href="">도움말 센터</a></li>
                        <li class="media_li"><a href="">안전 정보</a></li>
                        <li class="media_li"><a href="">예약 취소 옵션</a></li>
                    </ul>

                    <ul class="footer_list_items_2">
                        <li class="media_li"><a href="">에어비앤비의 코로나19 대응 방안</a></li>
                        <li class="media_li"><a href="">장애인 지원</a></li>
                        <li class="media_li "><a href="">이웃 민원 신고</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default FooterFir;