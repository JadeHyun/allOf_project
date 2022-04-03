import React, { Component } from 'react';
import SectionFir from './section-1/section-fir';
import SectionSec from './section-1/section-sec';
import SectionThir from './section-1/section-thir';
// import SectionFourth from './section-1/section-fourth';


class SectionMain extends Component{
    render(){
        return(
            <SectionFir></SectionFir>,
            <SectionSec></SectionSec>,
            <SectionThir></SectionThir>
            // <SectionFourth></SectionFourth>

        )
    }
}

export default SectionMain;