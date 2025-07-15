package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.models.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
	

}
