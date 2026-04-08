import React, { useState } from "react";
import Parking_info from "../../Parking_info.json";
import { href, Link, Route, Routes, useNavigate } from "react-router-dom";
import PriceList from "./PriceList";
import LotsList from "./LotsList";
import Detail from "./Detail";
import SizeList from "./SizeList";
import './User2.css';
import AddressList from "./AddressList";
import EmptyList from "./EmptyList";
import search_pic_removebg_preview from ".././img/search_pic_removebg_preview.png";
import final_sp from ".././img/final_sp.png";
import Parking2 from "../img/Parking2.png";

const SearchP = ({ data }) => {
    // 유효성 검사 통과시 링크로 이동할 수 있게하는 useNavigate();
    const navigate = useNavigate();

    //유효성 검사 메시지를 담을 변수
    const [searchError, setSearchError] = useState('')

    //사용자에게 입력받은 주소를 저장할 addr변수
    const [addr, setAddr] = useState('')

    //원하는 지역의 주차장 리스트 저장하는 list변수
    const list = data.filter((item) => item.addr.includes(addr));

    const [buttons, setButtons] = useState(false)

    const [isSearched, setIsSearched] = useState(false)

    //list변수에 검색한 결과를 배열로 저장
    const checkList = () => {
        setIsSearched(true);
        setSearchError('')
        setButtons(false)

        if (!addr.trim()) {
            setSearchError('지역명을 입력해주세요')
            navigate('/');
            return;
        }

        if (list.length === 0) {
            setSearchError('검색 결과가 없습니다')
            return;
        }

        setButtons(true)
        navigate('/search');
        setAddr('')

    }

    const toMain = ()=>{
        setList([])
        setIsSearched(false)
        navigate('/')
    }

    return(

        <div className="main-box">
            <div>
                <a onClick={()=>{toMain()}} style={{cursor : 'pointer'}}
                            alt="Seoul Parking Banner">
                    <img src={final_sp} 
                    style={{width : '938.98px',
                        height : '862.99'}}/>
                </a>              
            </div>

            <div className="inputSection">
                <div className="search-space">
                    <input 
                            value={addr}
                            onChange={(e)=>{setAddr(e.target.value)}}
                            placeholder="지역명을 입력하세요(구/도로명)"/>
                
                    <button onClick={checkList} className="find">
                        <img src={search_pic_removebg_preview}
                            alt="Main Parking Image"
                            style={{width : '30px',
                                    height : '30px', 
                                    mixBlendMode: 'multiply'}}/>
                    </button>
                </div>
            </div>

            {/* 사용자가 이미 지역을 검색했는가? y : n */}
            {buttons && (
                <div className="btn">
                    <button><Link to="/search">지역별</Link></button>
                    <button><Link to="/price">가격순</Link></button>
                    <button><Link to="/space">주차공간순</Link></button>
                    <button><Link to="/size">주차장규모순</Link></button>
                </div>
            )}


            <div className="content-area" style={{ width: '100%', maxWidth: '1000px', marginTop: '40px' }}>
                <Routes>
                    <Route path="/price" element={<PriceList list={list} />} />
                    <Route path="/space" element={<LotsList list={list} />} />
                    <Route path="/size" element={<SizeList list={list} />} />
                    <Route path="/search" element={<AddressList list={list} />} />
                    <Route path="/detail/:id" element={<Detail list={list} />} />
                    {/* 유저가 한 번이라도 "찾기" 버튼을 눌렀다면 EmptyList를 출력하지 않게 함. */}
                    <Route path="/" element={ isSearched? 
                            <div className="errorMsg">{searchError} <img className="mainImg" src={Parking2}/></div> : <EmptyList/>}/>
                </Routes>

            </div>
            
        </div>
    )
}

export default SearchP