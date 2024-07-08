import React, { useState } from 'react'

const RoomFilter = ({data, setFilteredData}) => {
    const [filter, setFilter] = useState("");
    const handleSelectChange = (e) => {
        debugger;
        const selectedRoomType = e.target.value;
        setFilter(selectedRoomType);
        const filteredRooms = data.filter((room) => room.roomType.toLowerCase() === selectedRoomType.toLowerCase());
        setFilteredData(filteredRooms);
    }
    const clearFilter = () => {
        setFilter("");
        setFilteredData(data);
    }

    const roomTypes = ["", ...new Set(data.map(room => room.roomType))];
  return (
    <div className='input-group mb-3'>
        <span className='input-group-text' id='room-type-filter'>Filter Room by Type</span>
        <select
        className='form-select'
        value={filter}
        onChange={handleSelectChange}>
            <option value={""}>select a room type filter...</option>
            {roomTypes.map((roomType, index)=>(
                <option key={index} value={String(roomType)}>{roomType}</option>
            ))}
        </select><span>
        <button className='btn btn-hotel' type='button' onClick={clearFilter}>
            Clear Filter
        </button></span>
    </div>
  )
}

export default RoomFilter