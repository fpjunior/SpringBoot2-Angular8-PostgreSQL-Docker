package fr.seblaporte.springboot2app.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.seblaporte.springboot2app.dto.UsuarioDTO;
import fr.seblaporte.springboot2app.model.Usuario;
import fr.seblaporte.springboot2app.repository.UsuarioRepository;

@Service
public class UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository;
	@Autowired
	private UsuarioRepository usuarioRespository;

	public UsuarioDTO getUsuarioConf(Integer indicador) {
		UsuarioDTO retorno = null;

		Usuario item = usuarioRepository.findById(indicador).orElse(null);


		return retorno;
	}

	@Transactional(readOnly = true)
	public List<UsuarioDTO> buscarTodos(String filtro) {
		List<UsuarioDTO> usuariosDTOs = new ArrayList<>();
		// bucar todos os usuarios cadastros
		List<Usuario> usuarios = this.usuarioRespository.buscarTodos(filtro);
		// conveter tudo em dto;
		usuarios.forEach((e) -> usuariosDTOs.add(this.toDTO(e)));
		return usuariosDTOs;
	}


	@Transactional(readOnly = true)
	public UsuarioDTO buscarPorCodigo(Integer codigo) {
		UsuarioDTO usuarioDTO = null;
		Optional<Usuario> opUsuario = this.usuarioRespository.findById(codigo);
		if (opUsuario.isPresent()) {
			usuarioDTO = this.toDTO(opUsuario.get());
		}
		return usuarioDTO;
	}

	@Transactional
	public Integer cadastrar(UsuarioDTO dto) {
		Usuario usuario = this.salvar(dto);
		return usuario.getCodigo();
	}

	@Transactional
	public void atualizar(UsuarioDTO dto) {
		this.salvar(dto);
	}

	private Usuario salvar(UsuarioDTO dto) {
		Usuario usuario = this.toEntity(dto);
		usuario = this.usuarioRespository.save(usuario);
		return usuario;
	}

	@Transactional
	public void deletar(Integer codigo) {
		this.usuarioRespository.deleteById(codigo);
	}

	private UsuarioDTO toDTO(Usuario entity) {
		UsuarioDTO dto = new UsuarioDTO();

		dto.setCodigo(entity.getCodigo());
		dto.setNome(entity.getNome());
		dto.setEmail(entity.getEmail());
		dto.setSenha(entity.getSenha());

		return dto;
	}

	private Usuario toEntity(UsuarioDTO dto) {
		if (dto == null)
			return null;

		Usuario entity = null;

		if (dto.getCodigo() != null)
			entity = usuarioRespository.findById(dto.getCodigo()).orElse(null);

		if (entity == null) {
			entity = new Usuario();
			entity.setCodigo(dto.getCodigo());
		}

		entity.setNome(dto.getNome());
		entity.setEmail(dto.getEmail());
		entity.setSenha(dto.getSenha());
		return entity;
	}

}
