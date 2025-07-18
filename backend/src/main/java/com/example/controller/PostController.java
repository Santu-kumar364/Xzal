package com.example.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
 
import com.example.models.Post;
import com.example.models.User;
import com.example.response.ApisResponse;
import com.example.service.PostService;
import com.example.service.UserService;

@RestController
public class PostController {

	@Autowired
	UserService userService;

	@Autowired
	PostService postService;
 
	@PostMapping("/api/posts")
	public ResponseEntity<Post> createPost(@RequestHeader("Authorization") String jwt, @RequestBody Post post)
			throws Exception {
		User reqUser = userService.findUserByJwt(jwt);
		Post createdPost = postService.createNewPost(post, reqUser.getId());
		return new ResponseEntity<Post>(createdPost, HttpStatus.ACCEPTED);
	}
//
//	@DeleteMapping("/api/posts/{postId}")
//	public ResponseEntity<ApisResponse> deletePost(@PathVariable Integer postId,
//			@RequestHeader("Authorization") String jwt) throws Exception {
//
//		User reqUser = userService.findUserByJwt(jwt);
//		String message = postService.deletePost(postId, reqUser.getId());
//		ApisResponse res = new ApisResponse(message, true);
//		return new ResponseEntity<ApisResponse>(res, HttpStatus.OK);
//
//	}

	@GetMapping("/api/posts/{postId}")
	public ResponseEntity<Post> findPostByIdHandler(@PathVariable Integer postId) throws Exception {

		Post post = postService.findPostById(postId);

		return new ResponseEntity<Post>(post, HttpStatus.ACCEPTED);
	}

	@GetMapping("/api/posts/user/{userId}")
	public ResponseEntity<List<Post>> findUsersPost(@PathVariable Integer userId) throws Exception {

		List<Post> posts = postService.findPostByUserId(userId);
		return new ResponseEntity<List<Post>>(posts, HttpStatus.OK);

	}

	@GetMapping("/api/posts")
	public ResponseEntity<List<Post>> findAllPost() throws Exception {

		List<Post> posts = postService.findAllPost();
		return new ResponseEntity<List<Post>>(posts, HttpStatus.OK);

	}

	@PutMapping("/api/posts/save/{postId}")
	public ResponseEntity<Post> savedPostHandler(@PathVariable Integer postId,
			@RequestHeader("Authorization") String jwt) throws Exception {
		User reqUser = userService.findUserByJwt(jwt);
		Post post = postService.savedPost(postId, reqUser.getId());

		return new ResponseEntity<Post>(post, HttpStatus.ACCEPTED);
	}

	@PutMapping("/api/posts/like/{postId}")
	public ResponseEntity<Post> likedPostHandler(@PathVariable Integer postId,
			@RequestHeader("Authorization") String jwt) throws Exception {

		User reqUser = userService.findUserByJwt(jwt);
		Post post = postService.likePost(postId, reqUser.getId());

		return new ResponseEntity<Post>(post, HttpStatus.ACCEPTED);
	}

}
