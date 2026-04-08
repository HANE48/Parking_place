import React from "react";
import Parking2 from "../img/Parking2.png";

const EmptyList = ()=>{

    return(
        <div className="main-hero-container">
        {/* 왼쪽: 일러스트 */}
        <div className="hero-image-side">
            <img src={Parking2} alt="Parking Illustration" />
        </div>

        {/* 오른쪽: 서비스 어필 */}
        <div className="hero-text-side">
            <div className="hero-tag">Seoul Smart Parking</div>
            <h2>서울 시내 주차장,<br /><span>한눈에 비교</span>하고 선택하세요</h2>
            
            <div className="feature-list">
                <div className="feature-item">
                    <div className="icon-box">💰</div>
                    <div className="feature-info">
                        <h4>최저가 주차장 찾기</h4>
                        <p>지역별 가격순 정렬로 가장 저렴한 곳을 추천합니다.</p>
                    </div>
                </div>

                <div className="feature-item">
                    <div className="icon-box">📍</div>
                    <div className="feature-info">
                        <h4>정확한 위치 정보</h4>
                        <p>도로명 주소와 상세 지도를 통해 정확한 위치를 제공합니다.</p>
                    </div>
                </div>

                <div className="feature-item">
                    <div className="icon-box">🚗</div>
                    <div className="feature-info">
                        <h4>실시간 주차 공간</h4>
                        <p>주차 가능 대수를 확인하여 헛걸음 없는 주차를 도와드립니다.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default EmptyList