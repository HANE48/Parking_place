import React, { useState } from 'react';

const ParkingTable = ({ data, setData }) => {
    const [searchTerm, setSearchTerm] = useState("");

    // 1. 혼잡도 및 빈자리 계산 (마이너스 값 방어 로직)
    const getStatus = (now, total) => {
        const nNow = Number(now || 0);
        const nTotal = Number(total || 0);
        
        // 현재 대수가 전체보다 많아도 계산은 100%까지만 (혼잡도 표시용)
        const calcNow = nNow > nTotal ? nTotal : nNow;
        const rate = (calcNow / nTotal) * 100;
        
        // 빈자리 계산: 0보다 작아지면 무조건 0으로 표시
        const available = nTotal - nNow;
        const displayAvailable = available < 0 ? 0 : available;

        if (rate > 90) return { label: "혼잡", color: "#A32D2D", bg: "#FCEBEB", border: "#F09595", available: displayAvailable };
        if (rate >= 60) return { label: "보통", color: "#854F0B", bg: "#FAEEDA", border: "#EF9F27", available: displayAvailable };
        return { label: "여유", color: "#3B6D11", bg: "#EAF3DE", border: "#97C459", available: displayAvailable };
    };

    // 2. 검색 필터링 (지역명 또는 주차장명)
    const filteredData = data.filter(item => {
        const term = searchTerm.trim().toLowerCase();
        return (
            item.pklt_nm?.toLowerCase().includes(term) ||
            item.addr?.toLowerCase().includes(term)
        );
    });

    // 3. 입차 로직 (- 버튼 클릭 시 숫자 증가)
    const handleIncrease = (pklt_cd) => {
        setData(prevData => prevData.map(item => {
            if (item.pklt_cd === pklt_cd) {
                const current = Number(item.now_prk_vhcl_cnt || 0);
                const total = Number(item.tpkct || 0);
                
                if (current < total) {
                    return { ...item, now_prk_vhcl_cnt: current + 1 };
                }
                alert("이미 만차입니다!");
            }
            return item;
        }));
    };

    // 4. 출차 로직 (+ 버튼 클릭 시 숫자 감소)
    const handleDecrease = (pklt_cd) => {
        setData(prevData => prevData.map(item => {
            if (item.pklt_cd === pklt_cd) {
                const current = Number(item.now_prk_vhcl_cnt || 0);
                if (current > 0) {
                    return { ...item, now_prk_vhcl_cnt: current - 1 };
                }
            }
            return item;
        }));
    };

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginBottom: '16px' }}>
                <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="지역명 또는 주차장명을 입력하세요 (예: 강남구)"
                    style={inputStyle}
                />
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                    <tr style={{ borderBottom: '1.5px solid #333', backgroundColor: '#f9f9f9' }}>
                        <th style={thStyle('left')}>주차장명</th>
                        <th style={thStyle('left')}>주소</th>
                        <th style={thStyle('center')}>빈자리 / 전체</th>
                        <th style={thStyle('center')}>혼잡도</th>
                        <th style={thStyle('center')}>입/출차 관리</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((parking) => {
                            const status = getStatus(parking.now_prk_vhcl_cnt, parking.tpkct);
                            return (
                                <tr key={parking.pklt_cd} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={tdStyle('left')}><strong>{parking.pklt_nm}</strong></td>
                                    <td style={{ ...tdStyle('left'), fontSize: '12px', color: '#666' }}>{parking.addr || "-"}</td>
                                    <td style={{ ...tdStyle('center'), fontWeight: '600' }}>
                                        <span style={{ color: status.available === 0 ? 'red' : 'inherit' }}>
                                            {status.available}
                                        </span> / {Number(parking.tpkct)}
                                    </td>
                                    <td style={tdStyle('center')}>
                                        <span style={{
                                            color: status.color, backgroundColor: status.bg,
                                            border: `1px solid ${status.border}`, padding: '3px 10px',
                                            borderRadius: '20px', fontSize: '12px', fontWeight: 'bold'
                                        }}>
                                            {status.label}
                                        </span>
                                    </td>
                                    <td style={tdStyle('center')}>
                                        {/* - 버튼: 입차(숫자 증가), + 버튼: 출차(숫자 감소) */}
                                        <button onClick={() => handleIncrease(parking.pklt_cd)} style={btnStyle}>-</button>
                                        <button onClick={() => handleDecrease(parking.pklt_cd)} style={{ ...btnStyle, marginLeft: '4px' }}>+</button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                                검색 결과가 없습니다.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

// 스타일 가이드
const inputStyle = { padding: '10px 14px', width: '100%', maxWidth: '480px', borderRadius: '8px', border: '1.5px solid #ccc', fontSize: '14px' };
const thStyle = (align) => ({ padding: '12px 8px', textAlign: align, color: '#444' });
const tdStyle = (align) => ({ padding: '12px 8px', textAlign: align, verticalAlign: 'middle' });
const btnStyle = { padding: '5px 12px', cursor: 'pointer', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#fff', fontSize: '16px' };

export default ParkingTable;