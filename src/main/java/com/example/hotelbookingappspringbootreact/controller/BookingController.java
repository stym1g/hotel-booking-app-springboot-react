package com.example.hotelbookingappspringbootreact.controller;

import com.example.hotelbookingappspringbootreact.exception.InvalidBookingRequestException;
import com.example.hotelbookingappspringbootreact.exception.ResourceNotFoundException;
import com.example.hotelbookingappspringbootreact.model.BookedRoom;
import com.example.hotelbookingappspringbootreact.model.Room;
import com.example.hotelbookingappspringbootreact.response.BookingResponse;
import com.example.hotelbookingappspringbootreact.response.RoomResponse;
import com.example.hotelbookingappspringbootreact.service.BookingService;
import com.example.hotelbookingappspringbootreact.service.IBookingService;
import com.example.hotelbookingappspringbootreact.service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/bookings")
@CrossOrigin("*")
public class BookingController {
    private final IBookingService bookingService;
    private final IRoomService roomService;
    @GetMapping("all-bookings")
    public ResponseEntity<List<BookingResponse>> getAllBookings(){
        List<BookedRoom> bookedRooms = bookingService.getAllBookings();
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for(BookedRoom bookedRoom: bookedRooms){
            BookingResponse bookingResponse = getBookingResponse(bookedRoom);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }

    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable String confirmationCode){
        try{
            BookedRoom bookedRoom = bookingService.getByBookingConfirmationCode(confirmationCode);
            BookingResponse bookingResponse = getBookingResponse(bookedRoom);
            return ResponseEntity.ok(bookingResponse);
        }catch(ResourceNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @PostMapping("/room/{roomId}/booking")
    public ResponseEntity<?> saveBooking(@PathVariable Long roomId, @RequestBody BookedRoom bookingRequest){
        try{
            String confirmationCode = bookingService.saveBooking(roomId, bookingRequest);
            return ResponseEntity.ok("Room BookedSuccessfully. Booking Confirmation Code is: " + confirmationCode);
        }catch (InvalidBookingRequestException ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @DeleteMapping("booking/{bookingId}/delete")
    public void cancelBooking(@PathVariable Long bookingId){
        bookingService.cancelBooking(bookingId);
    }

    private BookingResponse getBookingResponse(BookedRoom booking) {
        Room room = roomService.getRoomById(booking.getRoom().getId()).get();
        RoomResponse roomResponse = new RoomResponse(
                room.getId(),
                room.getRoomType(),
                room.getRoomPrice()
        );

        return new BookingResponse(
                booking.getBookingId(),
                booking.getCheckInDate(),
                booking.getCheckOutDate(),
                booking.getGuestFullName(),
                booking.getGuestEmail(),
                booking.getNumOfAdults(),
                booking.getNumOfChildren(),
                booking.getTotalNumOfGuests(),
                booking.getBookingConfirmationCode(),
                roomResponse
        );
    }
}
