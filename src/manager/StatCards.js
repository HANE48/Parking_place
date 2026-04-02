import React from "react";

const StatCards = ({ data })=>{
    // 데이터 합산 처리
    const stats = data.reduce((acc, cut)=>{
        acc.totalSpace += cur.realtime.total;
        acc.currentCars += cur.realtime.current;
        return acc;
    }, { totalSpace: 0, currentCars: 0});
}

    //평균 혼잡도 계산
    
// const total = data.reduce((acc, cur)=>{
//     return acc + cur.total
// }, 0);

// const used = data.reduce((acc, cur)=>{
//     return acc + cur.used
// },0);

// const available = total - used;

export default StatCards;