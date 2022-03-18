import React, { Component } from 'react';

class SecHeader extends Component{
    render(){
        return(
            <div class="header">
                <nav class="header_content">
                    <a href="" class="header_content_logo">
                        <img src="./img/Logo.png" alt="airbnb 메인이미지"/>
                        airbnb
                    </a>
                    <span class="header_content_input">
                        <form action="" class="">
                            <div class="input_content">
                                <span class="under_line">숙소</span>
                                <span class=" ">체험</span>
                                <span class=" ">온라인 체험</span>
                            </div>
                        </form>
                    </span>
                    <span class="header_content_pro">
                        <a href="" class="host">호스트 되기</a>
                        <a href=""><img src="./img/Earth.jpg" alt="언어설정" class="header_content_earth"/></a>
                        <a href="#" class="menu">
                            <img src="./img/menu.png" alt="" class="tree_line wid"/>
                            <img src="./img/Profile.png" alt="우측상단메뉴" class="header_content_profile wid"/>
                        </a>
                    </span>
                </nav>
            </div>
        )
    };
};

export default SecHeader;