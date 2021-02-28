package fr.seblaporte.springboot2app.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import fr.seblaporte.springboot2app.dto.EventoDTO;
import fr.seblaporte.springboot2app.response.Response;
import fr.seblaporte.springboot2app.service.EventoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.var;

@Api(tags = "API Evento")
@RestController
@RequestMapping("/api/v1/evento")
@PropertySource(value = "/messages.properties", encoding = "UTF-8")
public class EventoController extends AbstractController {

	@Autowired
	private EventoService eventoService;

	@ApiOperation(value = "Consultar todos eventos.")
	@ApiResponses(value = {
		    @ApiResponse(code = 200, message = "Retorna o Response com lista de eventos"),
		    @ApiResponse(code = 403, message = "Você não tem permissão para acessar este recurso"),
		    @ApiResponse(code = 404, message = "retorna resultado da validações de dados."),
		    @ApiResponse(code = 500, message = "Foi gerada uma exceção"),
		})
	@GetMapping
	public ResponseEntity<Response<List<EventoDTO>>> buscarTodos(
			@RequestParam(value="formacaoPrecoVenda", required = false, defaultValue = "false") Boolean formacaoPrecoVenda,
			@RequestParam(value="filtro", required = false, defaultValue = "") String filtro) {
		var response = new Response<List<EventoDTO>>();
		
		if (formacaoPrecoVenda)
			response.setData(eventoService.buscarEventosFormacaoPrecoVenda(filtro));
		else
			response.setData(eventoService.buscarTodos(filtro));
		
		return ResponseEntity.ok(response);
	}

	@GetMapping("{codigo}")
	public ResponseEntity<Response<EventoDTO>> buscarPorCodigo(@PathVariable("codigo") Integer codigo) {
		var response = new Response<EventoDTO>();
		response.setData(eventoService.buscarPorCodigo(codigo));
		return ResponseEntity.ok(response);
	}

	@ApiOperation(value = "Cadastrar o evento.")
	@ApiResponses(value = {
		    @ApiResponse(code = 200, message = "Retorna o Response com código cadastrado."),
		    @ApiResponse(code = 403, message = "Você não tem permissão para acessar este recurso"),
		    @ApiResponse(code = 404, message = "retorna resultado da validações de dados."),
		    @ApiResponse(code = 500, message = "Foi gerada uma exceção"),
		})
	@PostMapping
	public ResponseEntity<Response<Integer>> cadastrar(@Valid @RequestBody EventoDTO eventoDTO, BindingResult result,
			UriComponentsBuilder ucBuilder) {
		var response = new Response<Integer>();
		Integer codigo = 0;
		codigo = this.eventoService.cadastrar(eventoDTO);
		response.setData(codigo);
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("/api/v1/evento?").queryParam("codigo", codigo).build().toUri());
		return new ResponseEntity<>(response, headers, HttpStatus.CREATED);
	}

	@PostMapping("{codigo}")
	public ResponseEntity<?> atualizar(@Valid @RequestBody EventoDTO eventoDTO, BindingResult result,
			UriComponentsBuilder ucBuilder) {
		this.eventoService.atualizar(eventoDTO);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping("{codigo}")
	public ResponseEntity<?> deletar(@PathVariable("codigo") Integer codigo) {
		this.eventoService.deletar(codigo);
		return ResponseEntity.noContent().build();
	}
}
