const StatCards = ({ data }) => {
  // 합계 로직
  const totalSlots = data.reduce((acc, cur) => acc + cur.status.totalSlots, 0);
  const currentCars = data.reduce((acc, cur) => acc + cur.status.currentCars, 0);
  const availableSlots = totalSlots - currentCars;
  const occupancyRate = ((currentCars / totalSlots) * 100).toFixed(1);

  return (
    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
      {/* 1. 전체 주차면 */}
      <div className="card">
        <h4>전체 주차면</h4>
        <p>{totalSlots.toLocaleString()}면</p>
      </div>
      {/* 2. 현재 주차 차량 */}
      <div className="card">
        <h4>현재 주차</h4>
        <p>{currentCars.toLocaleString()}대</p>
      </div>
      {/* 3. 여유 공간 */}
      <div className="card">
        <h4>여유 공간</h4>
        <p>{availableSlots.toLocaleString()}면</p>
      </div>
      {/* 4. 전체 혼잡도 */}
      <div className="card">
        <h4>평균 혼잡도</h4>
        <p>{occupancyRate}%</p>
      </div>
    </div>
  );
};