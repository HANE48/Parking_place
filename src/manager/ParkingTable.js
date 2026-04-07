import React, { useState } from 'react';
import './manager_main.css';

const ParkingTable = ({ data, setData }) => {
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

    // --- 4. 수정 기능 (기존 정보 고치기) ---
    const handleEdit = (id) => {
        // 고칠 대상을 먼저 찾아요
        const target = data.find(item => item.pklt_cd === id);
        if (!target) return;

        // 기존 내용을 보여주면서 새로 입력받기
        const newName = prompt("수정할 이름을 입력하세요:", target.pklt_nm);
        const newAddr = prompt("수정할 주소를 입력하세요:", target.addr);
        const newCap = prompt("수정할 총 주차 면수를 입력하세요:", target.tpkct);

        if (newName && newCap) {
            const newData = data.map(item => {
                if (item.pklt_cd === id) {
                    // 찾은 녀석만 새 내용으로 덮어쓰기!
                    return { 
                        ...item, 
                        pklt_nm: newName, 
                        addr: newAddr, 
                        tpkct: newCap 
                    };
                }
                return item;
            });
            setData(newData);
            alert("수정이 완료되었습니다!");
        }
    };

    // --- 5. 추가 기능 ---
    const handleAdd = () => {
        const name = prompt("새 주차장 이름을 입력하세요:");
        if (!name) return;
        const address = prompt("주차장 주소를 입력하세요:");
        const capacity = prompt("총 주차 가능 대수를 입력하세요 (숫자만):");

        if (name && capacity) {
            const newParking = {
                pklt_cd: Date.now().toString(),
                pklt_nm: name,
                addr: address || "주소 정보 없음",
                tpkct: capacity,
                now_prk_vhcl_cnt: 0,
                status: "운영중"
            };
            setData([newParking, ...data]);
            alert("등록되었습니다!");
        }
    };

    return (
        <div className="admin-container">
            <h2 className="admin-title">등록된 주차장 관리</h2>

            <div className="search-wrapper">
                <input 
                    className="search-input"
                    type="text" 
                    placeholder="지역 또는 주차장명을 검색하세요" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

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
                                {/* 수정 버튼에 handleEdit 연결 */}
                                <button className="edit-btn" onClick={() => handleEdit(parking.pklt_cd)}>수정</button>
                                <button className="del-btn" onClick={() => handleDelete(parking.pklt_cd)}>삭제</button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button className="add-btn-fixed" onClick={handleAdd}>
                + 주차장 추가
            </button>
        </div>
    );
};

export default ParkingTable;