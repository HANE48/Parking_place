import axios from "axios";
import React, { useEffect, useState } from "react";
import Parking_info from "../../Parking_info.json";

const SearchP = ()=>{
    
    const [addr, setAddr] = useState('')
    const [result, setResult] = useState([])
    
    const checkList = ()=>{
        if(!addr.trim()){
            return;
        }
        const filtered = Parking_info.DATA.filter( (item)=> item.addr.includes(addr) )

        setResult(filtered)

    }

    return(
        <div>
            <div>
                <input value={addr}
                        onChange={(e)=>{setAddr(e.target.value)}}
                        placeholder="지역명을 입력하세요(구/도로명)"/>
            </div>
            <div>
                <button>찾기</button>
            </div>

            <div></div>

            <div>
                리스트 출력
                console.log(result)
                {/* {
                    result.map( (res)=>( 
                        <div>{res.}</div>
                     ) )
                } */}
            </div>
        </div>
    )
}

export default SearchP