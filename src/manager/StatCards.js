import React, { useState } from 'react';
import './manager_main.css';

const StatCards = ({ data, setData }) => {
    // [상태관리] : 검색어 저장
    const [searchTerm, setSearchTerm] = useState('');

    // [기능1 : 통계 계산 로직]
    // 1. 전체 주차 가능 공간 합산 (reduce 사용)
    const totalCapacity = data.reduce((acc, cur) => acc + Number(cur.tpkct || 0), 0);
    // 2. 현재 주차된 총 차량 수 합산
    const totalParked = data.reduce((acc, cur) => {
        const curCnt = Number(cur.now_prk_vhcl_cnt || 0);
        const maxCnt = Number(cur.tpkct || 0);
        return acc + Math.min(curCnt, maxCnt); //만약 현재 차량수가 전체 대수보다 초과입력될 경우, 최대치까지만 인정(데이터 보정)
    }, 0);//합계를 0부터 시작함
    
    //3. 전체 주차 여유 공간 (전체 주차 가능 공간 - 총 주차된 차량)
    const totalAvailable = totalCapacity - totalParked;

    // [기능2: 검색 필터링]
    // 검색기능 : 주차장 이름이나 주소에 검색어가 포함된 데이터만 선별하여 새로운 리스트 생성
    const filteredData = data.filter(item =>
        item.pklt_nm.includes(searchTerm) || (item.addr && item.addr.includes(searchTerm))
    );//item.addr && ... : 주소 체크) 먼저 주소 있는지 확인 후 있을 경우에만 검색.

    // --- 입/출차 관리 함수 ---
    const handleUpdate = (id, change) => {
        setData(prev => prev.map(item => {
            if (item.pklt_cd === id) {
                const max = Number(item.tpkct);
                let current = Math.min(Number(item.now_prk_vhcl_cnt), max);//현재 주차된 차량
                const updated = current + change;// 현재 주차 수에 +1 또는 -1 적용가능
                // 조건 체크 : 0대 미만이거나 전체 대수를 초과할 수 없음
                if (updated >= 0 && updated <= max) {
                    return { ...item, now_prk_vhcl_cnt: updated };
                } else if (updated > max) {
                    alert("이미 만차입니다!");
                } else if (updated < 0) {
                    alert("현재 주차된 차량이 없습니다.");
                }
            }
            // 내가 찾는 주차장이 아니거나, 숫자를 바꿀 수 없는 상황이면 "원래 정보 그대로!"
            return item;
        }));
    };

    return (
        <div className="parking-container">
            {/* [화면 상단 대시보드] 전체 주차장 현황 요약 */}
            <div className="dashboard-wrapper">
                <div className="stat-card">
                    <span className="stat-label">전체 총 대수</span>
                    <div className="stat-value">{totalCapacity} <small>면</small></div>
                </div>
                <div className="stat-card">
                    <span className="stat-label">현재 여유 공간</span>
                    <div className="stat-value" style={{ color: '#007bff' }}>{totalAvailable} <small>석</small></div>
                </div>
                <div className="stat-card">
                    <span className="stat-label">현재 주차 차량</span>
                    <div className="stat-value" style={{ color: '#f04a45' }}>{totalParked} <small>대</small></div>
                </div>
            </div>

            {/* 검색창*/}
            <div className="search-container">
                <input
                    className="parking-search-input"
                    type="text"
                    placeholder="지역명 또는 주차장명을 검색하세요 (예:강남구)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div>
                {/* [하단 테이블] 개별 주차장 입/출차 관리 */}
                <table className="status-table">
                    <thead>
                        <tr>
                            <th>주차장명</th>
                            <th>현황 (현재 / 전체)</th>
                            <th>상태</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((parking) => {
                            const max = Number(parking.tpkct);
                            const cur = Math.min(Number(parking.now_prk_vhcl_cnt), max);
                            const ratio = (cur / max) * 100;
                            const isFull = cur >= max;

                            return (
                                <tr key={parking.pklt_cd}>
                                    <td className="text-left">{parking.pklt_nm}</td>
                                    <td>
                                        {/* 만차일 경우 '빨강색'으로 강조 */}
                                        <span style={{ color: isFull ? 'red' : 'black', fontWeight: 'bold' }}>
                                            {cur}
                                        </span> / {max}
                                    </td>
                                    <td>
                                        {/* [혼잡도 표시] 90%이상 빨강(혼잡), 50%이상 주황(보통), 그외 초록(여유) */}
                                        <div className="status-light" style={{ backgroundColor: ratio >= 90 ? 'red' : ratio >= 50 ? 'orange' : 'green'}}>
                                            {ratio >= 90 ? '혼잡' : ratio >= 50 ? '보통' : '여유'}
                                        </div>
                                    </td>
                                    <td>
                                        {/* 입차(+), 출차(-) 버튼 */}
                                        <button className="control-btn" onClick={() => handleUpdate(parking.pklt_cd, 1)}>+</button>
                                        <button className="control-btn" onClick={() => handleUpdate(parking.pklt_cd, -1)}>-</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StatCards;