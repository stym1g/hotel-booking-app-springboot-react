import React, { useEffect, useState } from "react";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import { deleteRoom, getAllRooms } from "../utils/Apifunctions";
import { Col, Row } from "react-bootstrap";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ExistingRooms = () => {
  const [rooms, setRooms] = useState([{ id: "", roomType: "", roomPrice: "" }]);
  const [currentRooms, setCurrentRooms] = useState([
    { id: "", roomType: "", roomPrice: "" },
  ]);
  const [isFilter, setIsFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState([
    { id: "", roomType: "", roomPrice: "" },
  ]);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchrooms();
  }, []);

  const fetchrooms = async () => {
    setIsLoading(true);
    try {
      const result = await getAllRooms();
      setRooms(result);
      setFilteredRooms(result);
      let roomsOnPage = getCurrentrooms(result, currentPage, roomsPerPage);
      setCurrentRooms(roomsOnPage);
      setIsLoading(false);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  useEffect(() => {
    if (selectedRoomType === "") {
      setFilteredRooms(rooms);
      setIsFilter(false);
    } else {
      const filteredRooms = rooms.filter(
        (room) => room.roomType === selectedRoomType
      );
      setIsFilter(true);
      setFilteredRooms(filteredRooms);
      let roomsOnPage = getCurrentrooms(filteredRooms, 1, roomsPerPage);
      setCurrentRooms(roomsOnPage);
    }
    setCurrentPage(1);
  }, [rooms, selectedRoomType]);

  useEffect(() => {
    if (isFilter) {
      let roomsOnPage = getCurrentrooms(
        filteredRooms,
        currentPage,
        roomsPerPage
      );
      setCurrentRooms(roomsOnPage);
    } else {
      let roomsOnPage = getCurrentrooms(rooms, currentPage, roomsPerPage);
      setCurrentRooms(roomsOnPage);
    }
  }, [currentPage]);

  const calCulateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
    const totalRooms =
      filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
    return Math.ceil(totalRooms / roomsPerPage);
  };

  const handleFilterRoom = (filteredRooms) => {
    setFilteredRooms(filteredRooms);
    setIsFilter(true);
    const roomsOnPage = getCurrentrooms(filteredRooms, 1, roomsPerPage);
    setCurrentRooms(roomsOnPage);
    setCurrentPage(1);
  };

  const getCurrentrooms = (rooms, currentPage, roomsPerPage) => {
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    return rooms.slice(indexOfFirstRoom, indexOfLastRoom);
  };

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      const result = await deleteRoom(roomId);
      if (result === "" || result.data === "") {
        setSuccessMessage(`Room no ${roomId} was deleted`);
        fetchrooms();
      } else {
        console.error(`Error deleting room: ${result.message}`);
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  return (
    <>
      <div className="container col-md-8 col-lg-6">
        {successMessage && (
          <p className="alert alert-success mt-5">{successMessage}</p>
        )}

        {errorMessage && (
          <p className="alert alert-danger mt-5">{errorMessage}</p>
        )}
      </div>
      {isLoading ? (
        <p>Loading Existing Rooms...</p>
      ) : (
        <>
          <section className="mt-5 mb-5 container">
            <div className="d-flex justify-content-between mb-3 mt-5">
              <h2>Existing rooms</h2>
            </div>
            <Row>
              <Col md={6} className="mb-3 mb-md-0">
                <RoomFilter data={rooms} setFilteredData={handleFilterRoom} />
              </Col>
              <Col md={6} className="d-flex justify-content-end">
                <Link to={"/add-room"}>
                  <FaPlus />
                  Add Room
                </Link>
              </Col>
            </Row>
            <table className="table table-bordered table-hower">
              <thead>
                <tr className="test-center">
                  <th>ID</th>
                  <th>Room Type</th>
                  <th>Room Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRooms?.map((currentroom) => (
                  <tr key={currentroom.id} className="text-center">
                    <td>{currentroom.id}</td>
                    <td>{currentroom.roomType}</td>
                    <td>{currentroom.roomPrice}</td>
                    <td className="gap-2">
                      <Link to={`/edit-room/${currentroom.id}`}>
                        <span className="btn btn-info btn-sm">
                          <FaEye />
                        </span>
                        <span className="btn btn-warning btn-sm">
                          <FaEdit />
                        </span>
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteRoom(currentroom.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <RoomPaginator
              currentPage={currentPage}
              totalPages={calCulateTotalPages(
                filteredRooms,
                roomsPerPage,
                rooms
              )}
              onPageChange={handlePaginationClick}
            />
          </section>
        </>
      )}
    </>
  );
};

export default ExistingRooms;
