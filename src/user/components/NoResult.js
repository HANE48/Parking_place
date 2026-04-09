import React from 'react';

const NoResult = ({ message }) => {
    return (
        <div className="no-result-container">
            <div className="no-result-content">
                {/* 1. 시각적 일러스트 */}
                <div className="illustration-wrapper">
                    {/* 
                      * <img src={Parking2} alt="No Results" className="no-result-img" /> 
                      * 이미지가 검색결과가 없습니다 부분을 가려서 지웠어요!
                      */}
                    <div className="ghost-shadow"></div>
                </div>

                {/* 2. 에러 메시지 */}
                <h3 className="no-result-text">{message}</h3>
                <p className="no-result-subtext" style={{color:'black'}}>
                    {/* 스타일이 이상하게 먹어서(글씨가 흰색이라 안보암) 글자색깔 검은색으로 직접 줬어요! */}
                    입력하신 지역명을 확인하시거나,<br />
                    구 단위(예: 강남구) 또는 도로명으로 다시 검색해 보세요.
                </p>

                {/* 3. 사용자 도움말 (칩 디자인) */}
                <div className="search-tips">
                    <span>추천 검색어:</span>
                    <div className="tip-chips">
                        {/* 띄어쓰기 조금씩 줘서 보기 편하게 바꿔써요! */}
                        <span className="chip">#강남구 </span>
                        <span className="chip">#홍대 </span>
                        <span className="chip">#잠실역</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoResult;