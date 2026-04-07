import React, { useState } from "react";
import { Link } from "react-router-dom";
import './User2.css';

const LotsList = ({list})=>{

    const newList = [...list].sort( (a , b)=>{
        return ( b.tpkct - b.now_prk_vhcl_cnt ) - ( a.tpkct - a.now_prk_vhcl_cnt )
    } )


    return(
        <div>
            <ul>
                {
                    newList.map( (res)=>{
                        //현재 주차가능한 대수 계산 식
                        let availableLots = Number(res.tpkct) - Number(res.now_prk_vhcl_cnt);
                            if (availableLots <= 0) availableLots = 0;

                        return(
                        <Link to={'/detail/' + res.pklt_cd}>
                            <li>
                                {res.pklt_nm}<br/>
                                {res.addr}<br/>
                                주차가능 수 : {availableLots}
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

export default LotsList