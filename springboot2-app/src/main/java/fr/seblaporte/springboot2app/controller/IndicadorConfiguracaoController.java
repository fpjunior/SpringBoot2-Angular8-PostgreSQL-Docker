package fr.seblaporte.springboot2app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.seblaporte.springboot2app.dto.IndicadorDTO;
import fr.seblaporte.springboot2app.repository.IndicadorConfiguracaoRepository;
import fr.seblaporte.springboot2app.response.Response;
import fr.seblaporte.springboot2app.service.IndicadorConfiguracaoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.var;

@Api(tags = "API Indicadores - Configurações")
@RestController
@RequestMapping("/api/v1/indicador-conf")
@PropertySource(value = "/messages.properties", encoding = "UTF-8")
public class IndicadorConfiguracaoController {

    // private final IndicadorConfiguracaoRepository indicadorConfiguracaoRepository;

    @Autowired
	private IndicadorConfiguracaoService confService;

    @ApiOperation(value = "Recupera os parâmetros PADRÕES de Motor Serviço.")
	@GetMapping("motor-servico/parametros-padrao/{codigoIndicador}/indicador")
	public ResponseEntity<Response<IndicadorDTO>> buscarParametrosMotorServicoIndicadoresPadrao(@PathVariable("codigoIndicador") Integer indicador) {
		var retorno = new Response<IndicadorDTO>();
		
		retorno.setData(confService.getConfPadrao(indicador));
		// retorno.setStatus(true);
		
		return ResponseEntity.ok(retorno);
	}
    
}

