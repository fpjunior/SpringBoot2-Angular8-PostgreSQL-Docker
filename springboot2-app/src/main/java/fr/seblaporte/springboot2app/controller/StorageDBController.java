package fr.seblaporte.springboot2app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.seblaporte.springboot2app.response.Response;
import fr.seblaporte.springboot2app.service.StorageDBService;
import io.swagger.annotations.Api;
import lombok.var;

@Api(tags = "API StorageDB")
@RestController
@RequestMapping("/api/v1/storagedb")
@PropertySource(value = "/messages.properties", encoding = "UTF-8")
public class StorageDBController {

	@Autowired
	private StorageDBService storageDBService;

	@GetMapping(path="user/{codeUser}/key/{key}", produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Response<Object>> getStorageKeyUser(
			@PathVariable("codeUser") Integer codigo,
			@PathVariable("key") String key) {				
		var response = new Response<Object>();		
		Object value = storageDBService.getStorageDBToObject(codigo, key);
		if (value != null) {
			response.setData(value);
			return ResponseEntity.ok(response);
		} else {
			return ResponseEntity.notFound().build();
		}
			
	}
	
	@PostMapping(path="user/{codeUser}/key/{key}", produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Response<String>> setStorageKeyUser(
			@PathVariable("codeUser") Integer codigo,
			@PathVariable("key") String key,
			@RequestBody Object objectJson) {				
		var response = new Response<String>();		
		Integer id = storageDBService.setStorageDBFromObject(codigo, key, objectJson);		
		if (id != null && id > 0) { 
			response.setData("OK");
			return ResponseEntity.ok(response);
		} else { 
			response.setData("Não foi possível gravar os dados solicitado!");
			return ResponseEntity.badRequest().body(response);
		}		
	}	

	@DeleteMapping(path="user/{codeUser}/key/{key}")
	public ResponseEntity<Response<String>> deleteStorageKeyUser(
			@PathVariable("codeUser") Integer codigo,
			@PathVariable("key") String key) {				
		var response = new Response<String>();		
		Integer id = storageDBService.apagarStorageDB(codigo, key);		
		if (id != null && id > 0) { 
			response.setData("OK");
			return ResponseEntity.ok(response);
		} else { 
			return ResponseEntity.notFound().build();
		}		
	}		
}