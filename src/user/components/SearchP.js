import React, { useEffect, useState } from "react";
import Parking_info from "../../Parking_info.json";

const SearchP = ()=>{
    
    const [addr, setAddr] = useState('')

    //원하는 지역의 주차장 리스트 저장
    const [list, setList] = useState([])
    
    const checkList = ()=>{
        if(!addr.trim()){
            return;
        }
        const filtered = Parking_info.DATA.filter( (item)=> item.addr.includes(addr) )

        setList(filtered)

    }

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

            <div></div>

            <div>
                리스트 출력
                {
                    list.map( (res)=>( 
                        <div>
                            {res.addr}
                        </div>
                     ) )
                }
            </div>
        </div>
    )
}

export default SearchP