const ParkingTable = ({ columns, data }) => {
    return (
        <table border="1">
            <thead>
                <tr>
                    { columns.map(()=>(
                        <th key={idx}>{columns.header}</th> //주차장명, 잔여대수 등 제목설정
                    ))}
                </tr>
            </thead>
        </table>
    )
}