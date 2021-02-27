package fr.seblaporte.springboot2app.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.seblaporte.springboot2app.dto.IndicadorDTO;
import fr.seblaporte.springboot2app.model.IndicadorConfiguracao;
import fr.seblaporte.springboot2app.repository.IndicadorConfiguracaoRepository;
import fr.seblaporte.springboot2app.util.DataUtil;

@Service
public class IndicadorConfiguracaoService {
    
    @Autowired
	private IndicadorConfiguracaoRepository indicadorConfRepository;

    public IndicadorDTO getIndicadorConf(Integer indicador) {
		IndicadorDTO retorno = null;
		
		IndicadorConfiguracao item = indicadorConfRepository.findById(indicador).orElse(null);
		
		if (item == null) {
			retorno = this.getConfPadrao(indicador);
		} else {
			retorno = new IndicadorDTO();
			
			retorno.setConfNivel1(					item.getNivel1());
			retorno.setConfNivel2(					item.getNivel2());
			retorno.setConfFrequencia(				item.getFrequencia());
			retorno.setConfDataProximaAtualizacao(	item.getDataProximaAtualizacao());
		}
		
		return retorno;
	}

    public IndicadorDTO getConfPadrao(Integer codigoIndicador) {
		IndicadorDTO dto = new IndicadorDTO();
		//Indicador - Divergência de Preço
		if (codigoIndicador.equals(1)) {
			dto.setConfNivel1(		"024:00");
			dto.setConfNivel2(		"048:00");
			dto.setConfFrequencia(	"23:59");
			
			dto.setConfDataProximaAtualizacao(DataUtil.converterToDataUtil(LocalDateTime.now().plusDays(1)));
		}
		
		return dto;
	}
}
