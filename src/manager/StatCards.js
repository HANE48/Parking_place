import React, { useState } from 'react';
import './manager_main.css';

const StatCards = ({ data, setData }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // --- 통계 계산 로직 ---
    const totalCapacity = data.reduce((acc, cur) => acc + Number(cur.tpkct || 0), 0);
    const totalParked = data.reduce((acc, cur) => {
        const curCnt = Number(cur.now_prk_vhcl_cnt || 0);
        const maxCnt = Number(cur.tpkct || 0);
        return acc + Math.min(curCnt, maxCnt); //초과값 보정
    }, 0);
    const totalAvailable = totalCapacity - totalParked;

    // --- 검색 필터링 ---
    const filteredData = data.filter(item =>
        item.pklt_nm.includes(searchTerm) || (item.addr && item.addr.includes(searchTerm))
    );

    // --- 입/출차 관리 함수 ---
    const handleUpdate = (id, change) => {
        const newData = data.map(item => {
            if (item.pklt_cd === id) {
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
        <div className="parking-container">
            {/* 상단 대시보드 */}
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
                    <div className="stat-value" style={{ color: '#d9534f' }}>{totalParked} <small>대</small></div>
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
            {/* 현황 테이블 */}
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
                                    <span style={{ color: isFull ? 'red' : 'black', fontWeight: 'bold' }}>
                                        {cur}
                                    </span> / {max}
                                </td>
                                <td>
                                    <div className="status-light" style={{
                                        backgroundColor: ratio >= 90 ? 'red' : ratio >= 50 ? 'orange' : 'green'
                                    }}>
                                        {ratio >= 90 ? '혼잡' : ratio >= 50 ? '보통' : '여유'}
                                    </div>
                                </td>
                                <td>
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