import React from "react";

function ParkingPriceTable(props) {
    const data = props.data;

    const list = 
                        data.map( (item)=> {
                            // 기본요금:BSC_PRK_CRG, 시간 분 단위:BSC_PRK_HR
                            const bscPrice = item.bsc_prk_crg + '원'(item.bsc_prk_hr + '분')
                            // 추가요금:ADD_PRK_CRG, 시간분단위:ADD_PRK_HR 
                            const addPrice = item.add_prk_crg + '원'(item.add_prk_hr + '분')
                            //월정기요금:PRD_AMT
                            const prdPrice = item.prd_amt + '원'
                            if (item.prd_amt == null) {
                                prdPrice('정보없음')
                            }
                            // 유/무료 처리: PAY_YN_NM
                            const statusColor = 'black';
                            if (item.pay_yn_nm === '유료') {
                                statusColor = 'red'
                            } else if (item.pay_yn_nm === '무료') {
                                statusColor = 'green'
                            }

                            return(
                                <tr>    
                                <td>{item.pklt_nm}</td>
                                <td>{bscPrice}</td>
                                <td>{addPrice}</td>
                                <td>{prdPrice}</td>
                                <td style={{ color: statusColor fontWeight:'bold'
                                }}>
                                    {item.pay_yn_nm}</td>
                            
                {/* // 수정/삭제 버튼 */}
                                <td>  
                                <button className="edit_btn" onClick={function(alert(item.pklt_nm +'수정창을 엽니다'))}>수정</button>
                                </td> 
                           <tr/>
                            )
                            

                            }

    return (
        <div className="price-table-container">
            <table className="manager-table">
                <thead>
                    <tr>
                        <th>주차장명</th>
                        <th>기본 요금</th>
                        <th>추가 요금</th>
                        <th>월 정기권</th>
                        <th>유/무료</th>
                        <th>관리</th>
                    </tr>
                </thead>

                <tbody>
                    
                        )
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ParkingPriceTable;