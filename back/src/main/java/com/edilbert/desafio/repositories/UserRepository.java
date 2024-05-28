package com.edilbert.desafio.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edilbert.desafio.entities.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {


}