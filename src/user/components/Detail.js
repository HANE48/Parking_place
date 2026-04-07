import React from "react";
import { Link, useParams } from "react-router-dom";
import "./user1.css";

const Detail = ({list})=>{

    //사용자가 클릭한 주차장의 id를 useParams로 받음
    const {id} = useParams();
    const {menu} = useParams();

    const choosedItem = list.filter( (res) => {
        return res.pklt_cd == id
    } )

    const showList = choosedItem.map( (res) =>{

        let DayOpenHr = res.wd_oper_bgng_tm.slice(0, 2);
        let DayOpenMin = res.wd_oper_bgng_tm.slice(2, 4);
        let DayEndHr = res.we_oper_end_tm.slice(0, 2);
        let DayEndMin = res.we_oper_end_tm.slice(2, 4);
        let WeekOpenHr = res.we_oper_bgng_tm.slice(0, 2);
        let WeekOpenMin = res.we_oper_bgng_tm.slice(2,4);
        let WeekEndHr = res.we_oper_end_tm.slice(0, 2);
        let WeekEndMin = res.we_oper_end_tm.slice(2, 4);
        
        return(
            <div className="Ddiv">
                <div>
                    <h2 className="Dname">상세정보</h2>
                    {res.pklt_nm}<br/>
                    주소 : {res.addr}<br/>
                    평일 운영시간 : {DayOpenHr}:{DayOpenMin} ~ {DayEndHr}:{DayEndMin} <br/>
                    주말 운영시간 : {WeekOpenHr}:{WeekOpenMin} ~ {WeekEndHr}:{WeekEndMin} <br/>
                    월 정기권 금액 :  
                    { res.prd_amt == 0 ? " 월 정기권은 주차장으로 문의 해주세요"
                        : <div>{res.prd_amt}원</div>
                    }
                </div>
            </div>

        )
    } )

    return(
        <div>
            <ul>
                {showList}
            </ul>
        </div>
    )

}

export default Detail