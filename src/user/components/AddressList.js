import React from "react";
import { Link } from "react-router-dom";
import "./user1.css";

const AddressList = ({list})=>{

    const newList = [...list].sort(( a, b )=> {
        return a.pklt_nm.localeCompare(b.pklt_nm);
    })

    return(
        <div className="div">
            <h2 className="name">지역별 목록</h2>
            <ul>
                {
                    newList.map( (res)=>{
                        let availableLots = Number(res.tpkct)-Number(res.now_prk_vhcl_cnt);

                        //availableLots(주차가능수)가 0보다 작으면 0으로 표시
                        if( availableLots <= 0 ){
                            availableLots = 0
                        }

                        return(
                            <Link to={'/detail/' + res.pklt_cd}>
                                <li className="content">
                                    {res.pklt_nm}<br/>
                                    {res.addr}<br/>
                                    주차가능 수 : {availableLots}
                                </li>
                            </Link>
                        )
                    } )
                }
            </ul>
        </div>
    )

}

export default AddressList