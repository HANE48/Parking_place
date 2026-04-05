import React, { useState } from "react"; 
import './manager_main.css';

function ParkingPriceTable(props) {
    const data = props.data;
    
    // 상태 관리 (검색어, 유/무료 필터) 
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("전체");

    // 데이터 가나다순 정렬
    const sortedData = data.slice(); // 원본 데이터를 건드리지 않기 위해 복사본 생성
    sortedData.sort(function(a, b) {
        if (a.pklt_nm < b.pklt_nm) return -1; // 앞에 있는 게 작으면 그대로
        if (a.pklt_nm > b.pklt_nm) return 1;  // 뒤에 있는 게 크면 자리 바꿈
        return 0; // 이름 같으면 그대로 있기
    });
    const list = sortedData.map((item) => {
        // 현재 선택된 필터(유료/무료)와 데이터가 맞지 않으면 건너뛰기
        if (filter !== "전체" && item.pay_yn_nm !== filter) {
            return null;
        }

        // 검색어 체크
        const term = searchTerm.trim();
        const nameMatch = item.pklt_nm.indexOf(term) !== -1;
        const addrMatch = item.addr && item.addr.indexOf(term) !== -1;
        // 검색어가 입력됐는데 이름에도 없고 주소에도 없으면 건너뛰기
        if (term !== "" && !nameMatch && !addrMatch) {
            return null;
        }

        let bscPrice = item.bsc_prk_crg + '원(' + item.bsc_prk_hr + '분)';  // 기본요금
        let addPrice = item.add_prk_crg + '원(' + item.add_prk_hr + '분)'; // 추가요금
        let prdPrice = item.prd_amt == null ? '정보없음' : item.prd_amt + '원'; //정기권요금
        // 유료는 빨간색, 무료는 초록색으로 표시
        let statusColor = 'black';
        if (item.pay_yn_nm === '유료') statusColor = 'red';
        else if (item.pay_yn_nm === '무료') statusColor = 'green';

        return (
            <tr key={item.pklt_nm}>
                <td className="text-left"><strong>{item.pklt_nm}</strong></td>
                <td className="addr-cell">{item.addr || "정보 없음"}</td> {/* 주소 (없으면 정보없음) */}
                <td>{bscPrice}</td>
                <td>{addPrice}</td>
                <td>{prdPrice}</td>
                <td style={{ color: statusColor, fontWeight: 'bold' }}>{item.pay_yn_nm}</td>
                <td>
                    <button className="edit_btn" onClick={() => alert(item.pklt_nm + ' 수정')}>수정</button>
                    <button className="delete_btn" onClick={() => alert(item.pklt_nm + ' 삭제')}>삭제</button>
                </td> 
            </tr>
        );
    });
    // 최종적으로 화면에 보여줄 전체 구조
        return (
        <div className="manager-main-layout">
           
            <div className="search-wrapper">
                <input
                    className="main-search-input"
                    value={searchTerm} // 인풋의 값을 searchTerm 상태와 연결
                    onChange={(e) => setSearchTerm(e.target.value)} // 글자 입력할 때마다 상태 업데이트
                    placeholder="지역명 또는 주차장명을 입력하세요 (예: 강남구)"
                />
            </div>

            {/* 테이블: 하얀색 박스 영역 */}
            <div className="price-table-container">
                <table className="manager-table">
                    <thead>
                        <tr>
                            <th className="text-left">주차장명</th>
                            <th>주소</th>
                            <th>기본 요금</th>
                            <th>추가 요금</th>
                            <th>월 정기권</th>
                            <th>
                                <select className="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}>   
                                    <option value="전체">전체</option>
                                    <option value="유료">유료</option>
                                    <option value="무료">무료</option>
                                </select>
                            </th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list} {/* 위에서 만든 list(tr들)를 여기에 쏙 넣음 */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ParkingPriceTable;