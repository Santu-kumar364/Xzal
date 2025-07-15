package com.example.service;

import java.util.List;

import com.example.models.Story;
import com.example.models.User;

public interface StoryService {
	
	public Story createStory(Story story, User user);
	
	public List<Story> findStoryByUserId(Integer userId) throws Exception;

	 

}
