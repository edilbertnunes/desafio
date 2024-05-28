package com.edilbert.desafio.services;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edilbert.desafio.entities.UserEntity;
import com.edilbert.desafio.exceptions.ObjectNotFoundException;
import com.edilbert.desafio.repositories.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository repository;
	
	public UserEntity findById(Integer id) {
		Optional<UserEntity> obj = repository.findById(id);
		return obj.orElseThrow(()-> new ObjectNotFoundException(
				"Objeto não encontrado id:"+id+ ", tipo"+UserEntity.class.getName()));
	}
	
	public List<UserEntity>findAll() {
		List<UserEntity>list = repository.findAll();
			return list;
		}

	public UserEntity create(UserEntity obj) {
	    if (!validaIdade(obj.getDataNascimento())) {
	        throw new IllegalArgumentException("Usuário deve ter pelo menos 18 anos.");
	    } 

	    if (obj.getNome() == null || obj.getNome().isEmpty()) {
	        throw new IllegalArgumentException("Nome deve ser preenchido");
	    }
	    obj.setId(null);
	    return repository.save(obj);
	}

	public void delete(Integer id) {
		repository.deleteById(id);
		
	}

	public UserEntity update(Integer id, UserEntity obj) {
		UserEntity newObj = findById(id);
		newObj.setNome(obj.getNome());
		newObj.setEmail(obj.getEmail());
		newObj.setDataNascimento(obj.getDataNascimento());
		newObj.setSexo(obj.getSexo());
		newObj.setRua(obj.getRua());
		newObj.setNumero(obj.getNumero());
		newObj.setComplemento(obj.getComplemento());
		newObj.setBairro(obj.getBairro());
		newObj.setCidade(obj.getCidade());
		newObj.setEstado(obj.getEstado());
		newObj.setCep(obj.getCep());
		
		return repository.save(newObj);
	}
	
	private boolean validaIdade(LocalDate dataNascimento) {
	    if (dataNascimento == null) {
	        return false;
	    }
	    return Period.between(dataNascimento, LocalDate.now()).getYears() >= 18;
	}
	
}
