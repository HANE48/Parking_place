import React from "react";
import { Link } from "react-router-dom";

const PriceList = ({list})=>{
    
    const sortedList = [...list].sort( (a, b) => {
       
       const priceA = Number(a.bsc_prk_crg)  
        console.log('1')
       const priceB = Number(b.bsc_prk_crg)
       console.log('2')

       return priceA - priceB })

       console.log(sortedList)

       const freeLots = list.filter(item => Number(item.bsc_prk_crg) === 0 || item.pay_yn_nm === '무료');
console.log("무료 주차장 리스트:", freeLots);

       
    return(
        <div>
            <h2>주차 요금 목록</h2>
            <ul> 
                {              
                sortedList.map((item, index) => {

                    const freeP = Number(item.bsc_prk_crg) === 0 || item.pay_yn_nm === '무료'

                    return(
                        <Link to={'/detail/' + item.pklt_cd }>
                            <li key={index}>
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
