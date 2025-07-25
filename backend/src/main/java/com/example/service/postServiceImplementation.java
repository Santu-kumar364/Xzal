package com.example.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.hibernate.validator.internal.util.logging.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.models.Post;
import com.example.models.User;
import com.example.repository.PostRepository;
import com.example.repository.UserRepository;
  
import jakarta.transaction.Transactional;

@Service
public class postServiceImplementation implements PostService {

	@Autowired
	PostRepository postRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	UserService userService;
  

	@Override
	public Post createNewPost(Post post, Integer userId) throws Exception {

		User user = userService.findUserById(userId);

		Post newPost = new Post();
		newPost.setCaptions(post.getCaptions());
		newPost.setImage(post.getImage());
		newPost.setCreateAt(LocalDateTime.now());
		newPost.setVideo(post.getVideo());
		newPost.setUser(user);
		return postRepository.save(newPost);
	}

	 
 

	@Override
	public List<Post> findPostByUserId(Integer userId) throws Exception {

		return postRepository.findPostByUser(userId);
	}

	@Override
	public Post findPostById(Integer postId) throws Exception {

		Optional<Post> opt = postRepository.findById(postId);
		if (opt.isEmpty()) {
			throw new Exception("post not found with id " + postId);
		}

		return opt.get();
	}

	@Override
	public List<Post> findAllPost() {

		return postRepository.findAll();
	}

	@Override
	public Post savedPost(Integer postId, Integer userId) throws Exception {
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);

		if (user.getSavedPost().contains(post)) {
			user.getSavedPost().remove(post);
		} else
			user.getSavedPost().add(post);
		userRepository.save(user);

		return post;
	}

	@Override
	public Post likePost(Integer postId, Integer userId) throws Exception {
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);

		if (post.getLiked().contains(user)) {
			post.getLiked().remove(user);
		} else {
			post.getLiked().add(user);
		}

		return postRepository.save(post);
	}

	 
}
