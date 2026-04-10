import React from "react";
import { Link } from "react-router-dom";
import "./user1.css"

const PriceList = ({list})=>{
    
    const sortedList = [...list].sort( (a, b) => {
       return Number(a.bsc_prk_crg) - Number(b.bsc_prk_crg) 
    })
    // 무료주차장 리스트
    const freeLots = list.filter(item => Number(item.bsc_prk_crg) === 0 || item.pay_yn_nm === '무료');
    
    return(
        <div className="div">
            <h2 className="name">주차 요금 목록</h2>
            <ul> 
                {              
                sortedList.map((item, index) => {
                    const freeP = Number(item.bsc_prk_crg) === 0 || item.pay_yn_nm === '무료'

                    return(
                        <Link to={'/detail/' + item.pklt_cd }>
                            <li key={index} className="content">
                            {item.pklt_nm} <br/>
                            {item.addr} <br/>

                            {freeP ? ( "무료 주차장" ) : <span>기본시간: {item.bsc_prk_hr}분, {item.bsc_prk_crg}원</span>}
                            
                            </li> 
                        </Link>
                     )                   
                   }
                 )
                }
            </ul>
        </div>
    )
}

export default PriceList
