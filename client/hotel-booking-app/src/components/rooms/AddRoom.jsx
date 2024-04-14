import React, { useState } from "react";
import RoomTypeSelector from "../common/roomTypeSelector";
import { addRoom } from "../utils/Apifunctions";

const AddRoom = () => {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomtype: "",
    roomPrice: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "roomPrice") {
      if (!isNaN(value)) {
        value = parseInt(value);
      } else {
        value = "";
      }
    }
    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewRoom({ ...newRoom, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addRoom(
        newRoom.photo,
        newRoom.roomtype,
        newRoom.roomPrice
      );
      if (success != undefined) {
        setSuccessMessage("A new room was added to the database");
        setNewRoom({
          photo: null,
          roomtype: "",
          roomPrice: "",
        });
        setImagePreview("");
        setErrorMessage("");
      } else {
        setErrorMessage("Error adding room");
        setSuccessMessage("");
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
    setTimeout(()=>{
        setErrorMessage("");
        setSuccessMessage("");
    }, 3000);
  };

  return (
    <>
      <section className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="mt-5 mb-2">Add a New Room</h2>
            {successMessage && (
              <div className="alert alert-success fade show">
                {" "}
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="alert alert-danger fade show">
                {" "}
                {errorMessage}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="roomType" className="form-label">
                  room Type
                </label>
                <div>
                  <RoomTypeSelector
                    handleRoomInputChange={handleRoomInputChange}
                    newRoom={newRoom}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="roomType" className="form-label">
                  room Price
                </label>
                <input
                  className="form-control"
                  required
                  id="roomPrice"
                  name="roomPrice"
                  type="number"
                  value={newRoom.roomPrice}
                  onChange={handleRoomInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="photo" className="form-label">
                  Room Photo
                </label>
                <input
                  id="roomPhoto"
                  name="roomPhoto"
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview  room photo"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className="mb-3"
                  ></img>
                )}
              </div>
              <div className="d-grid d-md-flex mt-2">
                <button type="submit" className="btn btn-outline-primary ml-5">
                  Save Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddRoom;
