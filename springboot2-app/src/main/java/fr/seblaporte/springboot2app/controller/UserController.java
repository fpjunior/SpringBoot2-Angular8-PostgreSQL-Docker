package fr.seblaporte.springboot2app.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import fr.seblaporte.springboot2app.dto.UsersDTO;
import fr.seblaporte.springboot2app.model.User;
import fr.seblaporte.springboot2app.repository.UsersRepository;
import fr.seblaporte.springboot2app.response.Response;
import fr.seblaporte.springboot2app.service.UsersService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.var;
import org.springframework.http.HttpHeaders;



// @Controller
@Api(tags = "API Users")
@RestController
@RequestMapping("/api/v1/users")
@PropertySource(value = "/messages.properties", encoding = "UTF-8")
public class UserController {

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    UsersService usersService;

	@CrossOrigin
    @GetMapping
    @ApiOperation(value = "Consultar todos usuarios.")
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Retorna o Response com lista de eventos"),
            @ApiResponse(code = 403, message = "Você não tem permissão para acessar este recurso"),
            @ApiResponse(code = 404, message = "retorna resultado da validações de dados."),
            @ApiResponse(code = 500, message = "Foi gerada uma exceção"), })
    public ResponseEntity<Response<List<User>>> getAllUsers(
       @RequestParam(value = "filtro", required = false, defaultValue = "") String filtro) {
       var response = new Response<List<User>>();
       response.setData(usersRepository.findAll());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/add")
    public String usersForm(Model model) {
        model.addAttribute("users", new User());
        return "usersForm";
    }


    @ApiOperation(value = "Cadastrar o usuario.")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Retorna o Response com código cadastrado."),
			@ApiResponse(code = 403, message = "Você não tem permissão para acessar este recurso"),
			@ApiResponse(code = 404, message = "retorna resultado da validações de dados."),
			@ApiResponse(code = 500, message = "Foi gerada uma exceção"), })
	@CrossOrigin
	@PostMapping
	public ResponseEntity<Response<Integer>> cadastrar(@Valid @RequestBody UsersDTO usuarioDTO, BindingResult result,
			UriComponentsBuilder ucBuilder) {
		var response = new Response<Integer>();
		Integer codigo = 0;
		codigo = this.usersService.cadastrar(usuarioDTO);
		response.setData(codigo);
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("/api/v1/usuario?").queryParam("codigo", codigo).build().toUri());
		return new ResponseEntity<>(response, headers, HttpStatus.CREATED);
	}

    // @PostMapping("/process")
    // public ResponseEntity<Response<Integer>> cadastrarUser(@Valid @RequestBody User users, BindingResult result,
    // UriComponentsBuilder ucBuilder) {
    //     var response = new Response<Integer>();
    //     Integer codigo = 0;
    //     codigo = this.usersRepository.f
    //     if (result.hasErrors()) {
    //         return "usersForm";
    //     }
    //     usersRepository.save(users);
    //     return "redirect:/";
    // }



}
