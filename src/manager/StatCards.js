import React, { useState } from 'react';
import './manager_main.css';

const StatCards = ({ data, setData }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // --- 1. 검색 필터링 ---
    const filteredData = data.filter(item => 
        item.pklt_nm.includes(searchTerm) || (item.addr && item.addr.includes(searchTerm))
    );

    // --- 2. 삭제 기능 ---
    const handleDelete = (id) => {
        if(window.confirm("정말로 이 주차장을 삭제할까요?")) {
            const newData = data.filter(item => item.pklt_cd !== id);
            setData(newData);
        }
    };

    // --- 3. 상태 변경 기능 (운영중 ↔ 점검중) ---
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

    // ---4. 추가 기능 (새로운 주차장 등록) ---
    const handleAdd = () => {
        const name = prompt("주차장 이름을 입력하세요:");
        if (!name) return; // 취소 누르면 중단

        const address = prompt("주차장 주소를 입력하세요:");
        const capacity = prompt("총 주차 가능 대수를 입력하세요 (숫자만):");

        if (name && capacity) {
            const newParking = {
                pklt_cd: Date.now().toString(), // 겹치지 않게 현재 시간으로 임시 ID 생성
                pklt_nm: name,
                addr: address || "주소 정보 없음",
                tpkct: capacity, // 총 자리
                now_prk_vhcl_cnt: 0, // 처음엔 0대로 시작
                status: "운영중"
            };

            // 기존 데이터에 새 주차장을 합쳐서 업데이트!
            setData([newParking, ...data]); 
            alert("새로운 주차장이 등록되었습니다!");
        } else {
            alert("이름과 총 대수는 꼭 입력해야 합니다.");
        }
    };

    return (
        <div className="admin-container">
            <h2 className="admin-title">등록된 주차장 관리</h2>

            {/* 검색창 구역 */}
            <div className="search-wrapper">
                <input 
                    className="search-input"
                    type="text" 
                    placeholder="지역 또는 주차장명을 검색하세요" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* 카드 리스트 구역 */}
            <div className="card-grid">
                {filteredData.map((parking) => {
                    const max = Number(parking.tpkct);
                    const cur = Math.min(Number(parking.now_prk_vhcl_cnt), max);
                    const isFull = cur >= max;
                    const isRepair = parking.status === "점검중";

                    const borderClass = isRepair ? "border-repair" : (isFull ? "border-full" : "border-running");

                    return (
                        <div key={parking.pklt_cd} className={`parking-card ${borderClass}`}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <strong style={{fontSize: '18px'}}>{parking.pklt_nm}</strong>
                                    <div className="label-text" style={{marginTop: '4px'}}>{parking.addr}</div>
                                </div>
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
                                <button className="edit-btn" onClick={() => alert("수정 버튼입니다.")}>수정</button>
                                <button className="del-btn" onClick={() => handleDelete(parking.pklt_cd)}>삭제</button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/*추가 버튼 클릭 시 handleAdd 실행 */}
            <button className="add-btn-fixed" onClick={handleAdd}>
                + 주차장 추가
            </button>
        </div>
    );
};

export default StatCards;