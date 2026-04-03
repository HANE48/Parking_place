import React from "react";

const SizeList = ({list})=>{

    const sortedSizeList = [...list].sort((a, b) => {
        const sizeA = Number(a.tpkct)
        const SizeB = Number(b.tpkct)

        return(SizeB-sizeA)
    })

    return(
        <div>
            <h2>주차장 규모</h2> 
            <ul>
            {
                sortedSizeList.map((item)=>{

                    const sizeP = Number(item.tpkct)

                    return(
                    <li>
                        {item.pklt_nm} <br/>
                        주차가능 공간: {sizeP}
                    </li>
                    )
                
               } ) 
                
            }
            </ul>

        </div>
    )
}

export default SizeList