import React, { useState } from 'react';

const ParkingTable = ({ data, setData }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const totalLots = data.length;
    const totalCapacity = data.reduce((acc, cur) => acc + Number(cur.tpkct || 0), 0);
    
    // 현재 차량 합계 계산 시에도 초과분 제외 (69 -> 55로 계산)
    const totalParked = data.reduce((acc, cur) => {
        const curCnt = Number(cur.now_prk_vhcl_cnt || 0);
        const maxCnt = Number(cur.tpkct || 0);
        return acc + Math.min(curCnt, maxCnt); //기존데이터 수치 넘치면 강제로 깍음
    }, 0);
    
    const totalAvailable = totalCapacity - totalParked;

    // 검색 필터링
    const filteredData = data.filter(item => 
        item.pklt_nm.includes(searchTerm) || (item.addr && item.addr.includes(searchTerm))
    );

    // 입/출차 관리 함수 (버튼 클릭 시) ---
    const handleUpdate = (id, change) => {
        const newData = data.map(item => {
            if (item.pklt_cd === id) {
                // 수정 시점에도 초과된 데이터(69)는 일단 한계치(55)로 맞춘 후 계산 시작
                const max = Number(item.tpkct);
                let current = Math.min(Number(item.now_prk_vhcl_cnt), max);
                
                const updated = current + change;

                if (updated >= 0 && updated <= max) {
                    return { ...item, now_prk_vhcl_cnt: updated };
                } else if (updated > max) {
                    alert("이미 만차입니다!");
                } else if (updated < 0) {
                    alert("현재 주차된 차량이 없습니다.");
                }
            }
            return item;
        });
        setData(newData);
    };

    return (
        <div style={{ padding: '20px' }}>
           
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                <div style={cardStyle}>
                    <span style={labelStyle}>전체 총 대수</span>
                    <div style={valStyle}>{totalCapacity} <small>면</small></div>
                </div>
                <div style={cardStyle}>
                    <span style={labelStyle}>현재 여유 공간</span>
                    <div style={{ ...valStyle, color: '#007bff' }}>{totalAvailable} <small>석</small></div>
                </div>
                <div style={cardStyle}>
                    <span style={labelStyle}>현재 주차 차량</span>
                    <div style={{ ...valStyle, color: '#d9534f' }}>{totalParked} <small>대</small></div>
                </div>
            </div>

            {/* 검색창 */}
            <input 
                type="text" 
                placeholder="지역명 또는 주차장명을 검색하세요 (예:강남구)" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={searchInputStyle}
            />

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#333', color: '#fff' }}>
                        <th style={thStyle}>주차장명</th>
                        <th style={thStyle}>현황 (현재 / 전체)</th>
                        <th style={thStyle}>상태</th>
                        <th style={thStyle}>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((parking) => {
                        const max = Number(parking.tpkct);
                        // Math.min: 화면에 보여줄 때부터 초과값(69)을 최대값(55)으로 깎아서 보여줌
                        // Json데이터 값 읽어올때 초과값도 그대로 불러와서 Math.min으로 맞춤
                        const cur = Math.min(Number(parking.now_prk_vhcl_cnt), max);
                        const ratio = (cur / max) * 100;
                        const isFull = cur >= max;

                        return (
                            <tr key={parking.pklt_cd} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ ...tdStyle, textAlign: 'left' }}>{parking.pklt_nm}</td>
                                <td style={tdStyle}>
                                    {/* 만차 : 빨간색 강조 */}
                                    <span style={{ color: isFull ? 'red' : 'black', fontWeight: 'bold' }}>
                                        {cur}
                                    </span> / {max}
                                </td>
                                {/* 혼잡도 상태표시등 */}
                                <td style={tdStyle}>
                                    <div style={{
                                        width: '45px', height: '45px', borderRadius: '50%',
                                        backgroundColor: ratio >= 90 ? 'red' : ratio >= 50 ? 'orange' : 'green',
                                        color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px'
                                    }}>
                                        {ratio >= 90 ? '혼잡' : ratio >= 50 ? '보통' : '여유'}
                                    </div>
                                </td>
                                {/* 관리자 +,- 차량관리 버튼 */}
                                <td style={tdStyle}>
                                    <button onClick={() => handleUpdate(parking.pklt_cd, 1)}>+</button>
                                    <button onClick={() => handleUpdate(parking.pklt_cd, -1)}>-</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

// 스타일 (수정가능)
const cardStyle = { flex: 1, padding: '15px', border: '1px solid #ddd', borderRadius: '10px', textAlign: 'center' };
const labelStyle = { fontSize: '12px', color: '#888' };
const valStyle = { fontSize: '20px', fontWeight: 'bold' };
const searchInputStyle = {padding: '12px 20px', width: '320px', borderRadius: '15px', border: '2px solid #007bff', outline: 'none', fontSize: '16px'}
const thStyle = { padding: '10px' };
const tdStyle = { padding: '10px', textAlign: 'center' };

export default ParkingTable;