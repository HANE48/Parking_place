import React from "react";
import Parking2 from "../img/Parking2.png";

const EmptyList = ()=>{

    return(
        <div>
            <h3 className="first_str">원하는 지역을 검색하고</h3>
            <h3 className="first_str">그 지역의 주차장 현황을 확인해보세요</h3>
            <img src={Parking2}/>
        </div>
    )

}

export default EmptyList