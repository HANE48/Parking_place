import axios from "axios";
import React, { useEffect, useState } from "react";

const SearchP = ()=>{
    //주차장 list
    const [list, setList] = useState('')
    const [ADDR, setADDR] = useState('')

    return(
        <div>
            <div>
                <input value={ADDR}
                        onChange={(e)=>{setADDR(e.target.value)}}
                        placeholder="지역명을 입력하세요(구/도로명)"/>
            </div>
            <div>
                <button>찾기</button>
            </div>

            <div></div>

            <div>
                리스트 출력
            </div>
        </div>
    )
}

export default SearchP