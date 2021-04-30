package fr.seblaporte.springboot2app.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.seblaporte.springboot2app.dto.UsersDTO;
import fr.seblaporte.springboot2app.model.User;
import fr.seblaporte.springboot2app.repository.UsersRepository;
import fr.seblaporte.springboot2app.util.DataUtil;

@Service
public class UsersService {
    
    @Autowired
    private UsersRepository usersRepository;

    @Transactional
  public List<UsersDTO> getAllUsers(String filtro){
      List<UsersDTO> usersDTOs = new ArrayList<UsersDTO>();
      List<User> users = this.usersRepository.buscarTodos(filtro);
      users.forEach((e) -> usersDTOs.add(this.toDTO(e)));
      return usersDTOs;

  }

	private User salvar(UsersDTO dto) {
		User user = this.toEntity(dto);
		user = this.usersRepository.save(user);
		return user;
	}

	// @Transactional
	// public void deletar(Integer codigo) {
	// 	this.usersRepository.deleteById(codigo);
	// }

	@Transactional
	public Integer cadastrar(UsersDTO dto) {
		User user = this.salvar(dto);
		return user.getCodigo();
	}

	private User toEntity(UsersDTO dto) {
		if (dto == null)
			return null;

		User entity = null;

		if (dto.getCodigo() != null)
			// entity = usersRepository.findById(dto.getCodigo()).orElse(null);

		if (entity == null) {
			entity = new User();
			entity.setCodigo(dto.getCodigo());
		}

		entity.setNome(dto.getNome());
		entity.setEmail(dto.getEmail());
		entity.setSenha(dto.getSenha());
		return entity;
	}



@Transactional
public void atualizar(UsersDTO dto) {
    this.salvar(dto);
}


  private UsersDTO toDTO(User entity) {
    UsersDTO dto = new UsersDTO();

    dto.setCodigo(entity.getCodigo());
    dto.setNome(entity.getNome());
    dto.setEmail(entity.getEmail());
    dto.setSenha(entity.getSenha());
    dto.setDataCadastro(DataUtil.converterToDataUtil(LocalDateTime.now().plusDays(1)));
    return dto;
}
}
