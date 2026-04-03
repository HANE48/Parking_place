const ParkingTable = ({data, setData}) => {

    //[+]버튼 누르면 실행되는 함수
    const handleIncrease = (index) => {
        const newData = [...data]; // 원본데이터 복사
        if(newData[index].now_prk_vhcl_cnt <  newData[index].tpkct){
            newData[index].now_prk_vhcl_cnt += 1; // 현재 주차수 +1
            setData(newData); //현재 상태(State) 업데이트
        }
    };

    //[-]버튼 누르면 실행되는 함수
    const handleDecrease = (index) => {
        const newData = [...data];
        if(newData[index].now_prk_vhcl_cnt > 0){
            newData[index].now_prk_vhcl_cnt -= 1; //현재 주차수 -1
            setData(newData);
        }
    };

    return(
        <table>
            <thead>
                <tr>
                    <th>주차장명</th>
                    <th>{`[${addr}]현황`} </th>
                    <th>현황 (현재/전체)</th>
                    <th>입/출차 관리</th>
                    <th>운영시간(평일)</th>
                    <th>기본요금</th>
                </tr>
            </thead>

            <tbody>
                {data.map((Parking,index)=>(
                    <tr>
                        <td>{Parking.pklt_nm}</td>
                        <td>{Parking.now_prk_vhcl_cnt} / {Parking.tpkct}</td>
                        <td>
                            {/* +, - 버튼 활용 */}
                            <button onClick={() => handleIncrease(index)}>+</button>
                            <button onClick={() => handleDecrease(index)}>-</button>
                        </td>
                        <td>{Parking.wd_oper_bgng_tm} ~ {Parking.wd_oper_end_tm}</td>
                        <td>{Parking.bsc_prk_crg}원</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

// const available = tpkct - now_prk_vh //주차가능수
// const occupancyRate = (now_prk_vhcl_cnt / tpkct) * 100; //혼잡도

