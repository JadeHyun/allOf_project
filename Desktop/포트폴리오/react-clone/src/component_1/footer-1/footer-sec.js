import React, {Comment, Component} from 'react';

class FooterSec extends Component{
    render(){
        return(
            <span class="nav_content">
                <p>커뮤니티</p>
                <ul class="footer_list_items">
                    <li class="media_li"><a href="">Airbnb.org:재난 구호 숙소</a></li>
                    <li class="media_li"><a href="">아프간 난민 지원</a></li>
                    <li class="media_li"><a href="">다양성과 소속감 증진</a></li>
                </ul>
            </span>
        )
    }
} 

export default FooterSec;