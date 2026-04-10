import React, { useState } from 'react';
import './manager_main.css';
import { useParams } from 'react-router-dom';

const ParkingTable = ({ data, setData }) => {

    const pId = useParams();

    //[상태관리] 검색창에 입력한 텍스트 저장하는 곳
    const [searchTerm, setSearchTerm] = useState('');
    //[데이터 필터링] 검색창에 주차장명이나 주소에 포함된 것만 골라냄
    const filteredData = data.filter(item =>
        item.pklt_nm.includes(searchTerm) || (item.addr && item.addr.includes(searchTerm))
    );

    //[기능1: 삭제] 특정 주차장을 목록에서 제거
    const handleDelete = (id) => {
        if(window.confirm("정말로 이 주차장을 삭제할까요?")) {
            if(pId.id != 'admin'){
                alert('주차장 삭제는 통합관리자에게 문의하세요! \n 전화번호: 02-OOO-OOOO');
            }else{
                setData(prev => prev.filter(item => item.pklt_cd !== id));
                alert("삭제되었습니다!");
            }
            
        }
    };

    //[기능2: 운영중 ↔ 점검중 상태토글] 
    const toggleStatus = (id) => {
        setData(prev => prev.map(item => {
            if (item.pklt_cd === id) {
                const currentStatus = item.status || "운영중";
                // 상태를 반전시켜서 반환
                return { ...item, status: currentStatus === "운영중" ? "점검중" : "운영중" };
            }
            return item;
        }));
    };

    //[기능3: 수정] 팝업창을 띄워 이름, 주소, 총 면수를 직접 수정
    const handleEdit = (id) => {
        const target = data.find(item => item.pklt_cd === id);
        if (!target) return;

        const newName = prompt("수정할 이름을 입력하세요:", target.pklt_nm);
        const newAddr = prompt("수정할 주소를 입력하세요:", target.addr);
        const newCap = prompt("수정할 총 주차 면수를 입력하세요:", target.tpkct);

        if (newName && newCap) {
            setData(prev => prev.map(item => {
                if (item.pklt_cd === id) {
                    return { ...item, pklt_nm: newName, addr: newAddr, tpkct: newCap };
                }
                return item;
            }));
            alert("수정이 완료되었습니다!");
        }
    };

    //[기능4: 추가] 새로운 주차장 정보를 입력 받아 목록 제일 앞에 배치
    const handleAdd = () => {
        // 1. 이름 입력 (취소 시 종료)
        const name = prompt("새 주차장 이름을 입력하세요");
        if (!name) return;

        // 2. 주소 입력
        const address = prompt("주차장 주소를 입력하세요");

        // 3. 주차 가능 대수 숫자 입력 및 검증
        let inputCapacity;
        while (true) {
            inputCapacity = prompt("총 주차 가능 대수를 숫자로 입력하세요");

            // 취소 버튼 누르면 종료
            if (inputCapacity === null) return;

            // 숫자인지 검사 (빈칸 아니고, 숫자인 경우)
            if (inputCapacity.trim() !== "" && !isNaN(inputCapacity)) {
                break; 
            }

            alert("잘못된 입력입니다. '숫자'로만 다시 입력해주세요!");
        }

        const capacity = Number(inputCapacity);

        // 4. 모든 데이터가 준비된 후 객체 생성
        const newParking = {
            pklt_cd: Date.now().toString(), // 고유 ID 생성
            pklt_nm: name,
            addr: address || "주소 정보 없음",
            tpkct: capacity,
            now_prk_vhcl_cnt: 0,
            status: "운영중"
        };

        // 5. 상태 업데이트 (기존 데이터 앞에 추가)
        setData(prev => [newParking, ...prev]);
        alert("등록되었습니다!");
    }; //handleAdd

    return (
        <div className="parking-container">
            <h2 className="admin-title">등록된 주차장 관리</h2>

            {/* 검색창 */}
            <div className="search-wrapper">
                <input
                    className="search-input"
                    type="text"
                    placeholder="지역 또는 주차장명을 검색하세요 (예:강남구)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* 주차장 카드그리드 */}
            <div className="card-grid">
                {filteredData.map((parking) => {
                    const max = Number(parking.tpkct);
                    const cur = Math.min(Number(parking.now_prk_vhcl_cnt), max);
                    const isFull = cur >= max;
                    const isRepair = parking.status === "점검중";

                    // [색상설정] 상태에따라 테두리 색상 변경(점검, 만차, 정상운영)
                    let borderClass = "parking-card";
                    if (isRepair) borderClass += " border-repair";
                    else if (isFull) borderClass += " border-full";
                    else borderClass += " border-running";

                    // 상태뱃지(점검중_회색, 운영중_녹색)
                    const badgeClass = ["status-badge", isRepair ? "bg-repair" : "bg-running"].join(" ");

                    // 주차숫자 강조 (만차일 때만 빨간색 적용)
                    // [비주얼 설정] 만차(isFull)가 되면 기본 숫자 디자인에 '빨간색 강조(full-text)'를 추가
                    const numberTextClass = isFull ? "number-text full-text" : "number-text";

                    return (
                        <div key={parking.pklt_cd} className={borderClass}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <strong style={{ fontSize: '18px' }}>{parking.pklt_nm}</strong>
                                    {/*  카드 상단: 이름, 주소, 상태 뱃지 */}
                                    <div className="label-text" style={{ marginTop: '4px' }}>{parking.addr}</div>
                                </div>
                                <span
                                    className={badgeClass}
                                    onClick={() => toggleStatus(parking.pklt_cd)}//클릭시 상태바뀜
                                >
                                    {parking.status || "운영중"}
                                </span>
                            </div>

                            <hr style={{ border: 'none', borderBottom: '1px solid #eee', margin: '15px 0' }} />
                            {/* 카드 중앙 : 주차 대수 현황 */}
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
                            {/* 카드 하단 : 수정/삭제 버튼 */}
                            <div className="btn-group">
                                <button className="edit-btn" onClick={() => handleEdit(parking.pklt_cd)}>수정</button>
                                <button className="del-btn" onClick={() => handleDelete(parking.pklt_cd)}>삭제</button>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* 화면 하단 : 고정된 '+주차장 추가' 버튼 */}
            <button className="add-btn-fixed" onClick={handleAdd}>
                + 주차장 추가
            </button>
        </div>
    );//return
};

export default ParkingTable;