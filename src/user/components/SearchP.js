import React, { useEffect, useState } from "react";
import Parking_info from "../../Parking_info.json";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import PriceList from "./PriceList";

const SearchP = ()=>{
    
    const [addr, setAddr] = useState('')

    //원하는 지역의 주차장 리스트 저장하는 list변수
    const [list, setList] = useState([])
    
    //list변수에 검색한 결과를 배열로 저장
    const checkList = ()=>{
        if(!addr.trim()){
            return;
        }
        const filtered = Parking_info.DATA.filter( (item)=> item.addr.includes(addr) )

        setList(filtered)

    }

    

    //검색 결과 출력하는 메서드
    const showList = list.map( (res)=>{
        let availableLots = Number(res.tpkct)-Number(res.now_prk_vhcl_cnt);

        //availableLots(주차가능수)가 0보다 작으면 0으로 표시
        if( availableLots <= 0 ){
            availableLots = 0
        }

            return(
                <Link>
                    <li>
                        {res.pklt_nm}<br/>
                        주차가능 수 : {availableLots}
                    </li>
                </Link>
            )
    } ) 

    return(
        <div>
            <div>
                <input value={addr}
                        onChange={(e)=>{setAddr(e.target.value)}}
                        placeholder="지역명을 입력하세요(구/도로명)"/>
            </div>
            <div>
                <button onClick={checkList}>찾기</button>
            </div>

            <div>
                <button>가격순</button>
                <button>주차공간순</button>
                <button>주차장규모순</button>
            </div>

            <div>
                
                <ul>
                    {showList}
                </ul>
                
            </div>

        </div>
    )
}

export default SearchP