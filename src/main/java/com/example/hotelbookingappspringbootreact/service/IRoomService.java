package com.example.hotelbookingappspringbootreact.service;

import com.example.hotelbookingappspringbootreact.model.Room;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

public interface IRoomService {
    Room addNewRoom(MultipartFile file, String roomType, BigDecimal roomPrice) throws SQLException, IOException;

    List<String> getAllRoomTypes();
}
