package com.example.service;

import com.example.exceptions.ReelsException;
import com.example.exceptions.UserException;
import com.example.models.Reels;
import com.example.models.User;

import java.util.List;

public interface ReelsService {
    Reels createReels(Reels reel, User user) throws ReelsException;
    List<Reels> findAllReels() throws ReelsException;
    List<Reels> findUsersReel(Integer userId) throws ReelsException, UserException;
    Reels findReelsById(Integer reelsId) throws ReelsException;
    void deleteReel(Integer reelId, Integer userId) throws ReelsException;
    Reels updateReel(Integer reelId, Reels updatedReel, Integer userId) throws ReelsException;
}