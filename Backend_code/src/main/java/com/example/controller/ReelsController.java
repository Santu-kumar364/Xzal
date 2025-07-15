package com.example.controller;

import com.example.exceptions.ReelsException;
import com.example.exceptions.UserException;
import com.example.models.Reels;
import com.example.models.User;
import com.example.service.ReelsService;
import com.example.service.UserService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reels")
public class ReelsController {
    
    private final ReelsService reelsService;
    private final UserService userService;

    public ReelsController(ReelsService reelsService, UserService userService) {
        this.reelsService = reelsService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<Reels> createReels(
            @Valid @RequestBody Reels reel,
            @RequestHeader("Authorization") String jwt) throws UserException, ReelsException {
        User reqUser = userService.findUserByJwt(jwt);
        Reels createdReel = reelsService.createReels(reel, reqUser);
        return new ResponseEntity<>(createdReel, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Reels>> findAllReels() throws ReelsException {
        List<Reels> reels = reelsService.findAllReels();
        return new ResponseEntity<>(reels, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Reels>> findUsersReels(
            @PathVariable Integer userId) throws ReelsException, UserException {
        
        List<Reels> reels = reelsService.findUsersReel(userId);
        return new ResponseEntity<>(reels, HttpStatus.OK);
    }

    @GetMapping("/{reelsId}")
    public ResponseEntity<Reels> findReelsById(
            @PathVariable Integer reelsId) throws ReelsException {
        
        Reels reel = reelsService.findReelsById(reelsId);
        return new ResponseEntity<>(reel, HttpStatus.OK);
    }

    @PutMapping("/{reelsId}")
    public ResponseEntity<Reels> updateReel(
            @PathVariable Integer reelId,
            @RequestBody Reels updatedReel,
            @RequestHeader("Authorization") String jwt) throws ReelsException, UserException {
        
        User reqUser = userService.findUserByJwt(jwt);
        Reels reel = reelsService.updateReel(reelId, updatedReel, reqUser.getId());
        return new ResponseEntity<>(reel, HttpStatus.OK);
    }

    @DeleteMapping("/{reelId}")
    public ResponseEntity<String> deleteReel(
            @PathVariable Integer reelId,
            @RequestHeader("Authorization") String jwt) throws ReelsException, UserException {
        
        User reqUser = userService.findUserByJwt(jwt);
        reelsService.deleteReel(reelId, reqUser.getId());
        return new ResponseEntity<>("Reel deleted successfully", HttpStatus.OK);
    }

    @ExceptionHandler({ReelsException.class, UserException.class})
    public ResponseEntity<String> handleException(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
}

 