package com.example.service;

import com.example.exceptions.ReelsException;
import com.example.exceptions.UserException;
import com.example.models.Reels;
import com.example.models.User;
import com.example.repository.ReelsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class ReelsServiceImplementation implements ReelsService {
    
    private final ReelsRepository reelsRepository;
    private final UserService userService;

    @Autowired
    public ReelsServiceImplementation(ReelsRepository reelsRepository, 
                                    UserService userService) {
        this.reelsRepository = reelsRepository;
        this.userService = userService;
    }

    @Override
    public Reels createReels(Reels reel, User user) throws ReelsException {
        try {
            if (reel.getTitle() == null || reel.getTitle().trim().isEmpty()) {
                throw new ReelsException("Reel title cannot be empty");
            }
            
            if (reel.getVideo() == null || reel.getVideo().trim().isEmpty()) {
                throw new ReelsException("Video URL cannot be empty");
            }
            
            reel.setUser(user);
            reel.setCreatedAt(LocalDateTime.now());
            
            return reelsRepository.save(reel);
        } catch (Exception e) {
            throw new ReelsException("Failed to create reel: " + e.getMessage());
        }
    }

    @Override
    public List<Reels> findAllReels() throws ReelsException {
        try {
            List<Reels> reels = reelsRepository.findAllByOrderByCreatedAtDesc();
            if (reels.isEmpty()) {
                throw new ReelsException("No reels found");
            }
            return reels;
        } catch (Exception e) {
            throw new ReelsException("Failed to fetch reels: " + e.getMessage());
        }
    }

    @Override
    public List<Reels> findUsersReel(Integer userId) throws ReelsException {
        try {
            User user = userService.findUserById(userId);
            List<Reels> userReels = reelsRepository.findByUserId(user.getId());
            
            if (userReels.isEmpty()) {
                throw new ReelsException("No reels found for user with id: " + userId);
            }
            
            return userReels;
        } catch (UserException e) {
            throw new ReelsException("User not found with id: " + userId);
        } catch (Exception e) {
            throw new ReelsException("Failed to fetch user reels: " + e.getMessage());
        }
    }

    @Override
    public Reels findReelsById(Integer reelsId) throws ReelsException {
        try {
            return reelsRepository.findById(reelsId)
                    .orElseThrow(() -> new ReelsException("Reels not found with id: " + reelsId));
        } catch (Exception e) {
            throw new ReelsException("Failed to fetch reel: " + e.getMessage());
        }
    }

    @Override
    public void deleteReel(Integer reelId, Integer userId) throws ReelsException {
        try {
            Reels reel = findReelsById(reelId);
            
            if (!reel.getUser().getId().equals(userId)) {
                throw new ReelsException("You are not authorized to delete this reel");
            }
            
            reelsRepository.delete(reel);
        } catch (Exception e) {
            throw new ReelsException("Failed to delete reel: " + e.getMessage());
        }
    }

    @Override
    public Reels updateReel(Integer reelId, Reels updatedReel, Integer userId) throws ReelsException {
        try {
            Reels existingReel = findReelsById(reelId);
            
            if (!existingReel.getUser().getId().equals(userId)) {
                throw new ReelsException("You are not authorized to update this reel");
            }
            
            if (updatedReel.getTitle() != null) {
                existingReel.setTitle(updatedReel.getTitle());
            }
            
            return reelsRepository.save(existingReel);
        } catch (Exception e) {
            throw new ReelsException("Failed to update reel: " + e.getMessage());
        }
    }
}





