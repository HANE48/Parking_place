import React from "react";
import { Link } from "react-router-dom";

const SizeList = ({list})=>{

    const sortedSizeList = [...list].sort((a, b) => {
        const sizeA = Number(a.tpkct)
        const SizeB = Number(b.tpkct)

        return(SizeB-sizeA)
    })

    return(
        <div className="div">
            <h2 className="name">주차장 규모</h2>  
            <ul>
            {
                sortedSizeList.map((item)=>{

                    const sizeP = Number(item.tpkct)

                    return(
                        <Link to={'/detail/' + item.pklt_cd }>
                            <li className="content">
                                {item.pklt_nm} <br/>
                                주차가능 수: {sizeP}
                            </li>
                        </Link>
                    )
                
               } ) 
                
            }
            </ul>

        </div>
    )
}

export default SizeList