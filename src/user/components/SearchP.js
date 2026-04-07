import React, { useState } from "react";
import Parking_info from "../../Parking_info.json";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import PriceList from "./PriceList";
import LotsList from "./LotsList";
import Detail from "./Detail";
import SizeList from "./SizeList";
import './User2.css';
import AddressList from "./AddressList";
import EmptyList from "./EmptyList";
import search_pic_removebg_preview from ".././img/search_pic_removebg_preview.png";
import sp from ".././img/sp.png";

const SearchP = ()=>{
    // 유효성 검사 통과시 링크로 이동할 수 있게하는 useNavigate();
    const navigate = useNavigate();

    //유효성 검사 메시지를 담을 변수
    const [searchError, setSearchError] = useState('')

    //사용자에게 입력받은 주소를 저장할 addr변수
    const [addr, setAddr] = useState('')

    //원하는 지역의 주차장 리스트 저장하는 list변수
    const [list, setList] = useState([])

    const [buttons, setButtons] = useState(false)

    const [isSearched, setIsSearched] = useState(false)
    
    //list변수에 검색한 결과를 배열로 저장
    const checkList = ()=>{
        setIsSearched(true);
        setSearchError('')
        setButtons(false)

        if(!addr.trim()){
            setSearchError('지역명을 입력해주세요')
            navigate('/');
            return;
        }
        
        const filtered = Parking_info.DATA.filter( (item)=> item.addr.includes(addr) )

        if (filtered.length === 0){
            setSearchError('검색 결과가 없습니다')
            return ;
        }
        setList(filtered)
        setButtons(true)
        navigate('/search');

    }

    return(

        <div className="main-box">
            <div>
                <img src={sp}
                     style={{width : '505px',
                             height : '185px',
                             margin : ' 0 auto'}}/>
            </div>

            <div className="search-space">
                <input 
                        value={addr}
                        onChange={(e)=>{setAddr(e.target.value)}}
                        placeholder="지역명을 입력하세요(구/도로명)"/>
            
                <button onClick={checkList} className="find">
                    <img src={search_pic_removebg_preview}
                        style={{width : '30px',
                                height : '30px', 
                                mixBlendMode: 'multiply'}}/>
                </button>
            </div>
            

            {/* 사용자가 이미 지역을 검색했는가? y : n */}
            { buttons ?
            <div className="btn">
                <button> <Link to="/search">지역별</Link></button>
                <button> <Link to="/price">가격순</Link></button>
                <button> <Link to="/space">주차공간순</Link></button>
                <button> <Link to="/size">주차장규모순</Link></button>
            </div> : null
            }


            <div>
                <Routes>
                    <Route path="/price" element={<PriceList list={list}/>} />
                    <Route path="/space" element={<LotsList list={list}/>} />
                    <Route path="/size" element={<SizeList list={list} />} />
                    <Route path="/search" element={ <AddressList list={list}/> } />
                    <Route path="/detail/:id" element={<Detail list={list}/>}/>
                    {/* 유저가 한 번이라도 "찾기" 버튼을 눌렀다면 EmptyList를 출력하지 않게 함. */}
                    <Route path="/" element={ isSearched? <div>{searchError}</div> : <EmptyList/>}/>
                </Routes>
                
            </div>

        </div>
    )
}

export default SearchP