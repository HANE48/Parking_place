import React, { useEffect, useState } from "react";
import Parking_info from "../../Parking_info.json";
import { Link, Route, Routes } from "react-router-dom";
import PriceList from "./PriceList";

const SearchP = ()=>{
    //사용자에게 입력받은 주소를 저장할 addr변수
    const [addr, setAddr] = useState('')

    //원하는 지역의 주차장 리스트 저장하는 list변수
    const [list, setList] = useState([])

    const [buttons, setButtons] = useState(false)
    
    //list변수에 검색한 결과를 배열로 저장
    const checkList = ()=>{
        if(!addr.trim()){
            return;
        }
        const filtered = Parking_info.DATA.filter( (item)=> item.addr.includes(addr) )

        setList(filtered)
        setButtons(true)

    }

    //검색하기 전 메인화면에 출력할 화면
    const forEmptyList = ()=>{
        return(
            <div>
                <h3>원하는 지역을 검색하고</h3>
                <h3>그 지역의 주차장 현황을 확인해보세요</h3>
            </div>
        )
    }

    //검색 결과 출력하는 메서드
    const showList = list.map( (res)=>{
        let availableLots = Number(res.tpkct)-Number(res.now_prk_vhcl_cnt);

        //availableLots(주차가능수)가 0보다 작으면 0으로 표시
        if( availableLots <= 0 ){
            availableLots = 0
        }

            return(
                <ul>
                <Link>
                    <li>
                        {res.pklt_nm}<br/>
                        주차가능 수 : {availableLots}
                    </li>
                </Link>
                </ul>
            )
    } ) 

    return(
        <div>
            <div>
                <input value={addr}
                        onChange={(e)=>{setAddr(e.target.value)}}
                        placeholder="지역명을 입력하세요(구/도로명)"/>
            
                <Link to={"/search"}><button onClick={checkList}>찾기</button></Link>
            </div>
            { buttons ?
            <div>
                <button> <Link to="/price">가격순</Link></button>
                <button> <Link to="/space">주차공간순</Link></button>
                <button> <Link to="/size">주차장규모순</Link></button>
            </div> : <div></div>
}

            {/* <div>
                {showList}
            </div> */}

            <div>
                <Routes>
                    <Route path="/price" element={<PriceList list={list}/>} />
                    <Route path="/space" element={<div>주차공간순</div>} />
                    <Route path="/size" element={<div>주차장규모순</div>} />
                    <Route path="/search" element={showList} />
                    <Route path="/" element={forEmptyList()} />
                    
                </Routes>
                
            </div>

        </div>
    )
}

export default SearchP