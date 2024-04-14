package com.example.hotelbookingappspringbootreact.service;

import com.example.hotelbookingappspringbootreact.model.Room;
import com.example.hotelbookingappspringbootreact.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;

@Service
@RequiredArgsConstructor
@RequestMapping("/rooms")
public class RoomServiceImpl implements IRoomService {
    private final RoomRepository roomRepository;
    @Override
    public Room addNewRoom(MultipartFile file, String roomType, BigDecimal roomPrice) throws SQLException, IOException {
        Room room = new Room();
        room.setRoomType(roomType);
        room.setRoomPrice(roomPrice);
        if(!file.isEmpty()){
            byte[] photBytes = file.getBytes();
            Blob photoBlob = new SerialBlob(photBytes);
            room.setPhoto(photoBlob);
        }
        return roomRepository.save(room);
    }

    @Override
    public List<String> getAllRoomTypes() {
        return roomRepository.findDistinctRoomTypes();
    }
}
