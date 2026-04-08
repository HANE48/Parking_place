import React from 'react';
import Parking2 from "../img/Parking2.png"; // 경로 확인 필요

const NoResult = ({ message }) => {
    return (
        <div className="no-result-container">
            <div className="no-result-content">
                {/* 1. 시각적 일러스트 */}
                <div className="illustration-wrapper">
                    <img src={Parking2} alt="No Results" className="no-result-img" />
                    <div className="ghost-shadow"></div>
                </div>

                {/* 2. 에러 메시지 */}
                <h3 className="no-result-text">{message}</h3>
                <p className="no-result-subtext">
                    입력하신 지역명을 확인하시거나,<br />
                    구 단위(예: 강남구) 또는 도로명으로 다시 검색해 보세요.
                </p>

                {/* 3. 사용자 도움말 (칩 디자인) */}
                <div className="search-tips">
                    <span>추천 검색어:</span>
                    <div className="tip-chips">
                        <span className="chip">#강남구</span>
                        <span className="chip">#홍대</span>
                        <span className="chip">#잠실역</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoResult;