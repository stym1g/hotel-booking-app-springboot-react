import React, { useEffect, useState } from 'react'
import RoomFilter from '../common/RoomFilter';
import RoomPaginator from '../common/RoomPaginator';
import { getAllRooms } from '../utils/Apifunctions';
import { Col, Row } from "react-bootstrap"

const ExistingRooms = () => {
  const [rooms, setRooms] = useState([{ id: "", roomType: "", roomPrice: "" }]);
  const [currentRooms, setCurrentRooms] = useState([{ id: "", roomType: "", roomPrice: "" }]);
  const [isFilter, setIsFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState([{ id: "", roomType: "", roomPrice: "" }]);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchrooms();
  },[]);

  const fetchrooms = async () => {
    setIsLoading(true);
    try{
        const result = await getAllRooms();
        setRooms(result);
        setFilteredRooms(result);
        let roomsOnPage = getCurrentrooms(result, currentPage, roomsPerPage);
        setCurrentRooms(roomsOnPage);
        setIsLoading(false);
    }catch(err){
        setErrorMessage(err.message);
    }
  }

  useEffect(() => {
    if (selectedRoomType === "") {
			setFilteredRooms(rooms);
      setIsFilter(false);
		} else {
			const filteredRooms = rooms.filter((room) => room.roomType === selectedRoomType);
      setIsFilter(true);
			setFilteredRooms(filteredRooms);
      let roomsOnPage = getCurrentrooms(filteredRooms, 1, roomsPerPage);
      setCurrentRooms(roomsOnPage);
		}
		setCurrentPage(1)
  }, [rooms, selectedRoomType]);

  useEffect(() => {
    if(isFilter){
      let roomsOnPage = getCurrentrooms(filteredRooms, currentPage, roomsPerPage);
      setCurrentRooms(roomsOnPage);
    }else{
      let roomsOnPage = getCurrentrooms(rooms, currentPage, roomsPerPage);
      setCurrentRooms(roomsOnPage);
    }
  }, [currentPage]);

  const calCulateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
    const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
    return Math.ceil(totalRooms/roomsPerPage);
  }

  const handleFilterRoom = (filteredRooms) => {
    setFilteredRooms(filteredRooms);
    setIsFilter(true);
    const roomsOnPage = getCurrentrooms(filteredRooms, 1, roomsPerPage);
    setCurrentRooms(roomsOnPage);
    setCurrentPage(1);
  }

  const getCurrentrooms = (rooms, currentPage, roomsPerPage) => {
    const indexOfLastRoom = currentPage * roomsPerPage;
	  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    return rooms.slice(indexOfFirstRoom, indexOfLastRoom);
  }

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  return (
    <>
      {
        isLoading ? 
        (<p>Loading Existing Rooms...</p>) : 
        (
        <>
        <section className='mt-5 mb-5 container'>
            <div className='d-flex justify-content-senter mb-3 mt-5'>
                <h2>Existing rooms</h2>
            </div>
            <Col md={6} className='mb-3 mb-md-0'>
                <RoomFilter data={rooms} setFilteredData={handleFilterRoom} />
            </Col>
            <table className='table table-bordered table-hower'>
                <thead>
                    <tr className='test-center'>
                        <th>ID</th>
                        <th>Room Type</th>
                        <th>Room Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRooms?.map(currentroom => (
                        <tr key={currentroom.id} className='text-center'>
                            <td>{currentroom.id}</td>
                            <td>{currentroom.roomType}</td>
                            <td>{currentroom.roomPrice}</td>
                            <td>
                                <button>View / Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <RoomPaginator 
            currentPage={currentPage}
            totalPages={calCulateTotalPages(filteredRooms, roomsPerPage, rooms)}
            onPageChange={handlePaginationClick}
            />
        </section>
        </>
        )
      }
    </>
  )
}

export default ExistingRooms;