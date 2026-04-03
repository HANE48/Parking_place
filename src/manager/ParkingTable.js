import React, { useState } from 'react';
import ParkingData from './ParkingData';

const ParkingTable = ({ data, setData }) => {
    // 추후 id만 인자로 받아서 진행하게 변경
    // const id = 171730;
    // const [data, setData] = useState(ParkingData.DATA.filter
    //     (parking => parking.pklt_cd === id)
    // );

    // ParkingData.DATA로 접근해서 json파일의 내용을 사용
    //[+]버튼 누르면 실행되는 함수
    const handleIncrease = (index) => {
        const newData = [...data]; // 원본데이터 복사
        if (newData[index].now_prk_vhcl_cnt < newData[index].tpkct) {
            newData[index].now_prk_vhcl_cnt += 1; // 현재 주차수 +1
            setData(newData); //현재 상태(State) 업데이트
        } else {
            alert("만차입니다")
        }
    };

    //[-]버튼 누르면 실행되는 함수
    const handleDecrease = (index) => {
        const newData = [...data];
        if (newData[index].now_prk_vhcl_cnt > 0) {
            newData[index].now_prk_vhcl_cnt -= 1; //현재 주차수 -1
            setData(newData);
        }
    };

    let DayOpenHr = data[0].wd_oper_bgng_tm.slice(0, 2);
    let DayOpenMin = data[0].wd_oper_bgng_tm.slice(2, 4);

    let DayEndHr = data[0].wd_oper_end_tm.slice(0, 2);
    let DayEndMin = data[0].wd_oper_end_tm.slice(2, 4);

    let WeekOpenHr = data[0].we_oper_bgng_tm.slice(0, 2);
    let WeekOpenMin = data[0].we_oper_bgng_tm.slice(2, 4);

    let WeekEndHr = data[0].we_oper_end_tm.slice(0, 2);
    let WeekEndMin = data[0].we_oper_end_tm.slice(2, 4);

    return (
        <table>
            <thead>
                <tr>
                    <th>주차장명</th>
                    <th>현황 (현재/전체)</th>
                    <th>입/출차 관리</th>
                    <th>운영시간(평일)</th>
                    <th>운영시간(주말)</th>
                    <th>기본요금</th>
                </tr>
            </thead>

            <tbody>
                {data.map((parking, index) => (
                    <tr>
                        <td>{parking.pklt_nm}</td>
                        <td>{parking.now_prk_vhcl_cnt} / {parking.tpkct}</td>
                        <td>
                            {/* +, - 버튼 활용 */}
                            <button onClick={() => handleIncrease(index)}>+</button>
                            <button onClick={() => handleDecrease(index)}>-</button>
                        </td>
                        <td>{DayOpenHr}:{DayOpenMin} ~ {DayEndHr}:{DayEndMin}</td>
                        <td>{WeekOpenHr}:{WeekOpenMin} ~ {WeekEndHr}:{WeekEndMin}</td>
                        <td>{parking.bsc_prk_crg}원</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ParkingTable;