import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import RoomFilter from '../common/RoomFilter';
import RoomPaginator from '../common/RoomPaginator';
import { getAllRooms } from '../utils/Apifunctions';
import RoomCard from './RoomCard';

function Room() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage, setRoomsPerPage] = useState(6);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(()=>{
    setIsLoading(true);
    getAllRooms().then(d=>{
        setData(d);
        setFilteredData(d);
        setIsLoading(false);
    }).catch(err=>{
        setError(err.message);
        setIsLoading(false);
    });
  },[]);

  if(isLoading){
    return (
        <div>Loading rooms ...</div>
    )
  }

  if(error){
    return (
        <div className='text-danger'>Error: { error }</div>
    )
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const totalPages = Math.ceil(filteredData.length / roomsPerPage);
  const renderRooms = () => {
    const startIndex = (currentPage - 1) * roomsPerPage;
    const endIndex = startIndex + roomsPerPage;
    return filteredData.slice(startIndex, endIndex).map(room => {
        return <RoomCard key={room.id} room={room} />
    });
  }
  
  return (<>
    <Container>
        <Row>
            <Col md={6} className='mb-3 mb-md-0'>
                <RoomFilter data={data} setFilteredData={setFilteredData} />
            </Col>
            <Col md={6} className='d-flex align-items-center justify-content-end'>
                <RoomPaginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </Col>
        </Row>

        <Row>{renderRooms()}</Row>

        <Row>
            <Col md={6} className='d-flex align-items-center justify-content-end'>
                <RoomPaginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </Col>
        </Row>

    </Container></>
  )
}

export default Room