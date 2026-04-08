import React, { useState } from 'react';
import './manager_main.css';

const ParkingTable = ({ data, setData }) => {
    //[상태관리] 검색창에 입력한 텍스트 저장하는 곳
    const [searchTerm, setSearchTerm] = useState('');
    //[데이터 필터링] 검색창에 주차장명이나 주소에 포함된 것만 골라냄
    const filteredData = data.filter(item =>
        item.pklt_nm.includes(searchTerm) || (item.addr && item.addr.includes(searchTerm))
    );

    //[기능1: 삭제] 특정 주차장을 목록에서 제거
    const handleDelete = (id) => {
        if (window.confirm("정말 이 주차장을 삭제할까요?")) {
            const newData = data.filter(item => item.pklt_cd !== id);
            setData(newData);
        }
    };

    //[기능2: 운영중 ↔ 점검중 상태토글] 
    const toggleStatus = (id) => {
        const newData = data.map(item => {
            if (item.pklt_cd === id) {
                const currentStatus = item.status || "운영중";
                // 상태를 반전시켜서 반환
                return { ...item, status: currentStatus === "운영중" ? "점검중" : "운영중" };
            }
            return item;
        });
        setData(newData);
    };

    //[기능3: 수정] 팝업창을 띄워 이름, 주소, 총 면수를 직접 수정
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

    //[기능4: 추가] 새로운 주차장 정보를 입력 받아 목록 제일 앞에 배치
    const handleAdd = () => {
        const name = prompt("새 주차장 이름을 입력하세요:");
        if (!name) return;

        const address = prompt("주차장 주소를 입력하세요:");

        // --- [숫자 입력 구간] ---
        let inputCapacity;

        // "숫자가 아니면 계속 다시 물어봐!" (while 반복문)
        while (true) {
            inputCapacity = prompt("총 주차 가능 대수를 입력하세요 (숫자만):");

            // 사용자가 '취소'를 눌렀을 때를 대비한 탈출 장치
            if (inputCapacity === null) return;

            // 숫자인지 검사 (숫자이고 빈칸이 아니면 통과!)
            if (inputCapacity.trim() !== "" && !isNaN(inputCapacity)) {
                break; // 제대로 입력했으니 반복문을 빠져나감
            }

            // 잘못 입력했을 때만 띄워주는 경고창
            alert("잘못된 입력입니다. '숫자'로만 다시 입력해주세요!");
        }

        // 반복문을 빠져나왔다는 건 확실히 숫자라는 뜻!
        const capacity = Number(inputCapacity);
        // --------------------------------

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
                                    <strong style={{ fontSize: '18px' }}>{parking.pklt_nm}</strong>
                                    <div className="label-text" style={{ marginTop: '4px' }}>{parking.addr}</div>
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
                                        {cur} {isFull && <span style={{ fontSize: '12px' }}> (만차)</span>}
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