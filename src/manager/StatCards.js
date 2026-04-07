import React, { useState } from 'react';
import './StatCards.css';

const StatCards = ({ data, setData }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // --- 검색 필터링 ---
    const filteredData = data.filter(item => 
        item.pklt_nm.includes(searchTerm) || (item.addr && item.addr.includes(searchTerm))
    );

    // --- 삭제 기능 ---
    const handleDelete = (id) => {
        if(window.confirm("정말로 이 주차장을 삭제할까요?")) {
            const newData = data.filter(item => item.pklt_cd !== id);
            setData(newData);
        }
    };

    // --- 상태 변경 기능 (운영중 <-> 점검중) ---
    const toggleStatus = (id) => {
        const newData = data.map(item => {
            if (item.pklt_cd === id) {
                const currentStatus = item.status || "운영중";
                return { ...item, status: currentStatus === "운영중" ? "점검중" : "운영중" };
            }
            return item;
        });
        setData(newData);
    };

    return (
        <div className="admin-container">
            <h2 className="admin-title">⭐️ 등록된 주차장 관리</h2>

            {/* 검색창 구역 */}
            <div className="search-wrapper">
                <input 
                    className="search-input"
                    type="text" 
                    placeholder="지역 또는 주차장 이름을 검색하세요!" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* 카드 리스트 구역 */}
            <div className="card-grid">
                {filteredData.map((parking) => {
                    const max = Number(parking.tpkct);
                    // A방식 보정: 현재값이 전체를 넘지 않게!
                    const cur = Math.min(Number(parking.now_prk_vhcl_cnt), max);
                    const isFull = cur >= max;
                    const isRepair = parking.status === "점검중";

                    // 카드 상단 테두리 색깔 결정
                    const borderClass = isRepair ? "border-repair" : (isFull ? "border-full" : "border-running");

                    return (
                        <div key={parking.pklt_cd} className={`parking-card ${borderClass}`}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <strong style={{fontSize: '18px'}}>{parking.pklt_nm}</strong>
                                    <div className="label-text" style={{marginTop: '4px'}}>{parking.addr}</div>
                                </div>
                                {/* 상태 뱃지 클릭 시 상태 변경 */}
                                <span 
                                    className={`status-badge ${isRepair ? 'bg-repair' : 'bg-running'}`}
                                    onClick={() => toggleStatus(parking.pklt_cd)}
                                >
                                    {parking.status || "운영중"}
                                </span>
                            </div>

                            <hr style={{ border: 'none', borderBottom: '1px solid #eee', margin: '15px 0' }} />

                            <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                                <div>
                                    <div className="label-text">총 주차면</div>
                                    <div className="number-text">{max}</div>
                                </div>
                                <div>
                                    <div className="label-text">현재 주차</div>
                                    <div className={`number-text ${isFull ? 'full-text' : ''}`}>
                                        {cur} {isFull && <span style={{fontSize: '12px'}}> (만차)</span>}
                                    </div>
                                </div>
                            </div>

                            <div className="btn-group">
                                <button className="edit-btn" onClick={() => alert("수정 기능을 실행합니다.")}>수정</button>
                                <button className="del-btn" onClick={() => handleDelete(parking.pklt_cd)}>삭제</button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 추가 버튼 */}
            <button className="add-btn-fixed" onClick={() => alert("새로운 주차장을 추가합니다.")}>
                + 주차장 추가
            </button>
        </div>
    );
};

export default StatCards;