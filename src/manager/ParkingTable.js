import React, { useState } from 'react';
import './manager_main.css';

const ParkingTable = ({ data, setData }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = data.filter(item => 
        item.pklt_nm.includes(searchTerm) || (item.addr && item.addr.includes(searchTerm))
    );

    const handleDelete = (id) => {
        if(window.confirm("정말로 이 주차장을 삭제할까요?")) {
            const newData = data.filter(item => item.pklt_cd !== id);
            setData(newData);
        }
    };

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

    const handleEdit = (id) => {
        const target = data.find(item => item.pklt_cd === id);
        if (!target) return;

        const newName = prompt("수정할 이름을 입력하세요:", target.pklt_nm);
        const newAddr = prompt("수정할 주소를 입력하세요:", target.addr);
        const newCap = prompt("수정할 총 주차 면수를 입력하세요:", target.tpkct);

        if (newName && newCap) {
            const newData = data.map(item => {
                if (item.pklt_cd === id) {
                    return { ...item, pklt_nm: newName, addr: newAddr, tpkct: newCap };
                }
                return item;
            });
            setData(newData);
            alert("수정이 완료되었습니다!");
        }
    };

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
        <div className="parking-container">
            <h2 className="admin-title">등록된 주차장 관리</h2>

            <div className="search-wrapper">
                <input 
                    className="search-input"
                    type="text" 
                    placeholder="지역 또는 주차장명을 검색하세요 (예:강남구)" 
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

                    // --- [수정 구간 1] 백틱 대신 삼항 연산자로 변수 할당 ---
                    let borderClass = "parking-card";
                    if (isRepair) borderClass += " border-repair";
                    else if (isFull) borderClass += " border-full";
                    else borderClass += " border-running";

                    // --- [수정 구간 2] 배열의 join 메서드 활용 ---
                    const badgeClass = ["status-badge", isRepair ? "bg-repair" : "bg-running"].join(" ");
                    
                    // --- [수정 구간 3] 변수로 클래스 미리 정의 ---
                    const numberTextClass = isFull ? "number-text full-text" : "number-text";

                    return (
                        <div key={parking.pklt_cd} className={borderClass}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <strong style={{fontSize: '18px'}}>{parking.pklt_nm}</strong>
                                    <div className="label-text" style={{marginTop: '4px'}}>{parking.addr}</div>
                                </div>
                                <span 
                                    className={badgeClass}
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
                                    <div className={numberTextClass}>
                                        {cur} {isFull && <span style={{fontSize: '12px'}}> (만차)</span>}
                                    </div>
                                </div>
                            </div>

                            <div className="btn-group">
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