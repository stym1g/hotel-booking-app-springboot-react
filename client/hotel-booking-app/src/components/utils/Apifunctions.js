import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:9192',
});

// This function add a new room to the database
export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('roomType', roomType);
    formData.append('roomPrice', roomPrice);
    const response = await api.post('/rooms/add/new-room', formData);
    if(response.status === 201){
        return true;
    }else{
        return false;
    }
}

// This function gets all room types from database
export async function getRoomTypes() {
    try{
        const response = await api.get('/rooms/room-types');
        return response.data;
    }catch(err){
        console.log(err);
        throw new Error('Error fetching room types');
    }
}

//Get all rooms from the database
export async function getAllRooms(){
    try{
        const result = await api.get("/rooms/all-rooms");
        return result.data;
    }catch(err){
        throw new Error("Error fetching rooms: ", err?.message);
    }
}

//This function deletes room by id
export async function deleteRoom(roomId){
    try{
        const result = await api.delete(`/rooms/delete/room/${roomId}`);
        return result.data;
    }catch(err){
        throw new Error(`Error deleting room: ${err.message}`);
    }
}
