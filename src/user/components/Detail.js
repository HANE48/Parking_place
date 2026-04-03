import React from "react";
import { Link, useParams } from "react-router-dom";

const Detail = ({list})=>{

    //사용자가 클릭한 주차장의 id를 useParams로 받음
    const {id} = useParams();
    const {menu} = useParams();

    const choosedItem = list.filter( (res) => {
        return res.pklt_cd == id
    } )

    const showList = choosedItem.map( (res) =>{
        return(
            <div>
                <div>
                    <h2>상세정보</h2>
                    {res.pklt_nm}<br/>
                    주소 : {res.addr}<br/>
                    평일 운영시간 : {res.wd_oper_bgng_tm} ~ {res.wd_oper_end_tm} <br/>
                    주말 운영시간 : {res.we_oper_bgng_tm} ~ {res.we_oper_end_tm} <br/>
                    월 정기권 금액 :  
                    { res.prd_amt == 0 ? "월 정기권은 주차장으로 문의 해주세요"
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