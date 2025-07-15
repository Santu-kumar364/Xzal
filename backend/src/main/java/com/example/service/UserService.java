package com.example.service;

import java.util.List;

import com.example.exceptions.UserException;
import com.example.models.User;

public interface UserService {
	
	public User registerUser(User user);
	
	public User findUserById(Integer userId) throws UserException;
	
	public User findUserByEmail(String Email);
	
	public User followUser(Integer userId1, Integer userId2) throws UserException;
	
	public User updateUser(User user, Integer userId) throws UserException;
		
	public List<User> searchUser(String query);
	
	public User findUserByJwt(String jwt);
	
    public User updateProfilePicture(Integer userId, String profilePicture) throws UserException;
    
    public User updateBackgroundPicture(Integer userId, String backgroundPicture) throws UserException;
	
    

}
