package com.example.hotelbookingappspringbootreact.repository;

import com.example.hotelbookingappspringbootreact.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
