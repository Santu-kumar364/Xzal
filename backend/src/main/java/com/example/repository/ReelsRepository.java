package com.example.repository;

import com.example.models.Reels;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReelsRepository extends JpaRepository<Reels, Integer> {
    List<Reels> findByUserId(Integer userId);
    List<Reels> findAllByOrderByCreatedAtDesc();
}