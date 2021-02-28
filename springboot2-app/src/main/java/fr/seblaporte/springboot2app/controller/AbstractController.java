package fr.seblaporte.springboot2app.controller;

import java.time.LocalDate;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;

import fr.seblaporte.springboot2app.response.Response;
import fr.seblaporte.springboot2app.response.ResponseError;
import lombok.var;

public abstract class AbstractController {

    protected ResponseEntity<Response<?>> formatarDadosValidacaoRetornoBad(BindingResult result, Response<?> response) {
        result.getFieldErrors().forEach(error -> {
            System.out.println(error.getField() + " | " + error.getDefaultMessage());
            response.getErrors().add(new ResponseError(error.getField(), error.getDefaultMessage()));
        });
        return ResponseEntity.badRequest().body(response);
    }

    protected ResponseEntity<Response<?>> formatarDadosValidacaoRetornoBadListArgs(BindingResult result,
            Response<?> response) {
        result.getFieldErrors().forEach(error -> {
            response.getErrors()
                    .add(new ResponseError(error.getField(), error.getDefaultMessage(), error.getArguments()));
        });
        return ResponseEntity.badRequest().body(response);
    }

    protected ResponseEntity formatarDadosErroRetornoBad(String mensagem) {
        var error = new ResponseError("erro", mensagem);
        var response = new Response();
        response.setData(error);
        response.getErrors().add(error);
        return ResponseEntity.badRequest().body(response);
    }

    protected ResponseEntity formatarDadosErroRetornoBad(String nomeError, String mensagem) {
        var error = new ResponseError(nomeError, mensagem);
        var response = new Response();
        response.setData(error);
        response.getErrors().add(error);
        return ResponseEntity.badRequest().body(response);
    }

}