import React from 'react';
import { useParams } from 'react-router-dom';

const ParkingHours = ({ data, setData }) => {
    const { id } = useParams();

    // 관리 권한 문구 결정 
    let adminAuthority = "";
    if (id === 'admin') {
        adminAuthority = "서울시 전 구역";
    } else {
        if (data.length > 0) {
            adminAuthority = data[0].pklt_nm;
        } else {
            adminAuthority = "관리 구역(" + id + ")";
        }
    }

    // 1. 운영시간 수정 기능
    const handleTimeEdit = (targetId) => {
        let target = null;
        for (let i = 0; i < data.length; i++) {
            if (data[i].pklt_cd === targetId) {
                target = data[i];
                break;
            }
        }
        if (target === null) return;

        // 기존 시간 (slice 안 된 원본 데이터 0000 형식)
        const currentOpen = target.wd_oper_bgng_tm || "0000";
        const currentClose = target.wd_oper_end_tm || "2400";

        const newOpen = prompt("평일 시작 시간을 입력하세요 (예: 0900):", currentOpen);
        const newClose = prompt("평일 종료 시간을 입력하세요 (예: 1800):", currentClose);

        if (newOpen && newClose) {
            const newData = data.map(item => {
                if (item.pklt_cd === targetId) {
                    return Object.assign({}, item, { 
                        wd_oper_bgng_tm: newOpen, 
                        wd_oper_end_tm: newClose 
                    });
                }
                return item;
            });
            setData(newData);
            alert("운영 시간이 변경되었습니다.");
        }
    };

    return (
        <div className="admin-container">
            <h2 className="admin-title">
                {id === 'admin' ? "서울시 통합 운영 시간 관리" : "주차장 운영 시간 설정"}
            </h2>

            <div className="card-grid">
                {data.map((parking) => {
                    // 데이터에서 시간 slice 하기
                    // 평일 (wd)
                    const wdStart = parking.wd_oper_bgng_tm || "0000";
                    const wdEnd = parking.wd_oper_end_tm || "2400";
                    // 주말 (we)
                    const weStart = parking.we_oper_bgng_tm || "0000";
                    const weEnd = parking.we_oper_end_tm || "2400";

                    return (
                        <div key={parking.pklt_cd} className="parking-card">
                            <div className="card-header">
                                <div className="parking-info">
                                    <strong className="parking-name">{parking.pklt_nm}</strong>
                                    <div className="parking-id">ID: {parking.pklt_cd}</div>
                                </div>
                            </div>

                            <hr className="card-divider" />

                            <div className="time-info-section">
                                <div className="time-row">
                                    <span className="time-label">평일</span>
                                    <span className="time-value">
                                        {wdStart.slice(0, 2)}:{wdStart.slice(2, 4)} ~ {wdEnd.slice(0, 2)}:{wdEnd.slice(2, 4)}
                                    </span>
                                </div>
                                <div className="time-row">
                                    <span className="time-label">주말</span>
                                    <span className="time-value">
                                        {weStart.slice(0, 2)}:{weStart.slice(2, 4)} ~ {weEnd.slice(0, 2)}:{weEnd.slice(2, 4)}
                                    </span>
                                </div>
                            </div>

                            <div className="btn-group">
                                <button 
                                    className="edit-btn" 
                                    onClick={() => handleTimeEdit(parking.pklt_cd)}
                                >
                                    운영 시간 수정
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {data.length === 0 && (
                <div className="empty-message">조회된 주차장 정보가 없습니다.</div>
            )}
        </div>
    );
};

export default ParkingHours;