package com.edilbert.desafio.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.edilbert.desafio.entities.UserEntity;
import com.edilbert.desafio.services.UserService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/users") 
public class UserController {
	
	@Autowired
	private UserService service;
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<UserEntity> findById(@PathVariable Integer id) {
		UserEntity obj = service.findById(id);
		return ResponseEntity.ok().body(obj);
	}
	
	@GetMapping
	public ResponseEntity<List<UserEntity>>listAll(){
		List<UserEntity>list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@PostMapping
	public ResponseEntity<UserEntity> create(@RequestBody UserEntity obj) {
		obj = service.create(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id").buildAndExpand(obj.getId()).toUri();
		//return ResponseEntity.created(uri).build();
		return ResponseEntity.created(uri).body(obj);  // - retorna o registro no body do postman
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void>delete(@PathVariable Integer id) {
		service.delete(id);
		return ResponseEntity.noContent().build();		
	}
	
	@PutMapping(value="/{id}")
	public ResponseEntity<UserEntity> update(@PathVariable Integer id, @RequestBody UserEntity obj){
		UserEntity newObj = service.update(id, obj);
		return ResponseEntity.ok(newObj);
	}
	
}
	
	
	