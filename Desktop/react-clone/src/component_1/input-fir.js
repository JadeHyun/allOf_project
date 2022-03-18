import React, { Component } from 'react' 

class InputFir extends Component{
    render(){
        return(
            <div class="header_content_data">
                <div class="data_border">
                    <span class="data_one data_input">
                        <label for="" class="lab_box">위치</label>
                        <input type="text" placeholder="어디로 여행가세요?"/>
                    </span>
                    <span class="checked data_input">
                        <label for="" class="lab_box">체크인</label>
                        <input type="text" placeholder="날짜 입력"/>
                    </span>
                    <span class="checked data_input">
                        <label for="" class="lab_box">체크아웃</label>
                        <input type="text" placeholder="날짜입력"/>
                    </span>
                    <span class="last_menu data_input">
                        <span>
                            <label for="" class="lab_box">인원</label>
                            <input type="text" placeholder="게스트 추가"/>
                        </span>
        
                    </span>
                    <a href="#" class="search">
                        <img src="./img/Search.png" alt="검색" class="search_img"/>
                    </a>
                </div>
            </div>
    
        )
    }
}

export default InputFir