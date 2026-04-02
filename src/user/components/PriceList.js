import React from "react";

const PriceList = ({list})=>{
    
    const sortedList = [...list].sort( (a, b) => {
       
       const priceA = Number(a.bsc_prk_crg)  
        console.log('1')
       const priceB = Number(b.bsc_prk_crg)
       console.log('2')

       return priceA - priceB })

       console.log(sortedList)

       
    return(
        <div>
            <h2>주차 요금 목록</h2>
            <ul> 
                {              
                sortedList.map((item, index) => (
                    <li key={index}>
                      {item.bsc_prk_crg}
                    </li>                    
                ) ) 
                }
            </ul>
        </div>
    )
}

export default PriceList
