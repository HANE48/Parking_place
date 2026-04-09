import React from "react";
import { Link, useParams } from "react-router-dom";
import "./user1.css";

const Detail = ({list})=>{

    //사용자가 클릭한 주차장의 id를 useParams로 받음
    const {id} = useParams();

    const choosedItem = list.filter( (res) => {
        return res.pklt_cd == id
    } )

    const showList = choosedItem.map( (res) =>{
        // 평일 오픈시간
        let DayOpenHr = res.wd_oper_bgng_tm.slice(0, 2);
        let DayOpenMin = res.wd_oper_bgng_tm.slice(2, 4);

        // 평일 마감 시간
        let DayEndHr = res.we_oper_end_tm.slice(0, 2);
        let DayEndMin = res.we_oper_end_tm.slice(2, 4);

        // 주말 오픈 시간
        let WeekOpenHr = res.we_oper_bgng_tm.slice(0, 2);
        let WeekOpenMin = res.we_oper_bgng_tm.slice(2,4);

        // 주말 마감 시간
        let WeekEndHr = res.we_oper_end_tm.slice(0, 2);
        let WeekEndMin = res.we_oper_end_tm.slice(2, 4);
        
        return(
            <div className="Ddiv">
                <div>
                    <h2 className="Dname">상세정보</h2>
                    <div>
                    <table className="info-table">
                    <tbody> 
                    <tr><th>주차장 명</th></tr>
                    <td>{res.pklt_nm}</td>                   
                    
                    <tr><th>주소</th></tr>
                    <td>{res.addr}</td>                   

                    <tr><th>평일 운영시간</th></tr>
                    <td>{DayOpenHr}:{DayOpenMin} ~ {DayEndHr}:{DayEndMin}</td>

                    <tr><th>주말 운영시간</th></tr>
                    <td>{WeekOpenHr}:{WeekOpenMin} ~ {WeekEndHr}:{WeekEndMin}</td>

                    <tr><th>월 정기권 금액</th></tr>
                    <td><div>{res.prd_amt}원</div></td>

                     </tbody>
                     </table>
                    </div>
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