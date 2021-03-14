package fr.seblaporte.springboot2app.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import fr.seblaporte.springboot2app.dto.UsuarioDTO;
import fr.seblaporte.springboot2app.model.Usuario;
import fr.seblaporte.springboot2app.repository.UsuarioRepository;
import fr.seblaporte.springboot2app.response.Response;
import fr.seblaporte.springboot2app.service.UsuarioService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.var;

@Api(tags = "API Usuario")
@RestController
@RequestMapping("/api/v1/usuario")
@PropertySource(value = "/messages.properties", encoding = "UTF-8")
public class UsuarioController extends AbstractController {

	@Autowired
	private UsuarioService usuarioService;

	@ApiOperation(value = "Consultar todos usuarios.")
	@ApiResponses(value = {
		    @ApiResponse(code = 200, message = "Retorna o Response com lista de eventos"),
		    @ApiResponse(code = 403, message = "Você não tem permissão para acessar este recurso"),
		    @ApiResponse(code = 404, message = "retorna resultado da validações de dados."),
		    @ApiResponse(code = 500, message = "Foi gerada uma exceção"),
		})
	@GetMapping
	public ResponseEntity<Response<List<UsuarioDTO>>> buscarTodos(
			@RequestParam(value="filtro", required = false, defaultValue = "") String filtro) {
		var response = new Response<List<UsuarioDTO>>();
	
			response.setData(usuarioService.buscarTodos(filtro));
		
		return ResponseEntity.ok(response);
	}

	@GetMapping("{codigo}")
	public ResponseEntity<Response<UsuarioDTO>> buscarPorCodigo(@PathVariable("codigo") Integer codigo) {
		var response = new Response<UsuarioDTO>();
		response.setData(usuarioService.buscarPorCodigo(codigo));
		return ResponseEntity.ok(response);
	}

	@ApiOperation(value = "Cadastrar o usuario.")
	@ApiResponses(value = {
		    @ApiResponse(code = 200, message = "Retorna o Response com código cadastrado."),
		    @ApiResponse(code = 403, message = "Você não tem permissão para acessar este recurso"),
		    @ApiResponse(code = 404, message = "retorna resultado da validações de dados."),
		    @ApiResponse(code = 500, message = "Foi gerada uma exceção"),
		})
	@PostMapping
	public ResponseEntity<Response<Integer>> cadastrar(@Valid @RequestBody UsuarioDTO usuarioDTO, BindingResult result,
			UriComponentsBuilder ucBuilder) {
		var response = new Response<Integer>();
		Integer codigo = 0;
		codigo = this.usuarioService.cadastrar(usuarioDTO);
		response.setData(codigo);
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("/api/v1/usuario?").queryParam("codigo", codigo).build().toUri());
		return new ResponseEntity<>(response, headers, HttpStatus.CREATED);
	}

	@PostMapping("{codigo}")
	public ResponseEntity<?> atualizar(@Valid @RequestBody UsuarioDTO usuarioDTO, BindingResult result,
			UriComponentsBuilder ucBuilder) {
		this.usuarioService.atualizar(usuarioDTO);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping("{codigo}")
	public ResponseEntity<?> deletar(@PathVariable("codigo") Integer codigo) {
		this.usuarioService.deletar(codigo);
		return ResponseEntity.noContent().build();
	}
}
