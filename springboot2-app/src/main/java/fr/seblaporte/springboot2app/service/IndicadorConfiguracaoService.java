package fr.seblaporte.springboot2app.service;

import java.time.LocalDateTime;
import java.util.Date;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.seblaporte.springboot2app.dto.IndicadorDTO;
import fr.seblaporte.springboot2app.exception.AlertMensagemException;
import fr.seblaporte.springboot2app.model.IndicadorConfiguracao;
import fr.seblaporte.springboot2app.repository.IndicadorConfiguracaoRepository;
import fr.seblaporte.springboot2app.util.DataUtil;
import lombok.var;

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

			retorno.setConfNivel1(item.getNivel1());
			retorno.setConfNivel2(item.getNivel2());
			retorno.setConfFrequencia(item.getFrequencia());
			retorno.setConfDataProximaAtualizacao(item.getDataProximaAtualizacao());
		}

		return retorno;
	}

	public IndicadorDTO getConfPadrao(Integer codigoIndicador) {
		IndicadorDTO dto = new IndicadorDTO();
		// Indicador - Divergência de Preço
		if (codigoIndicador.equals(1)) {
			dto.setConfNivel1("024:00");
			dto.setConfNivel2("048:00");
			dto.setConfFrequencia("23:59");

			dto.setConfDataProximaAtualizacao(DataUtil.converterToDataUtil(LocalDateTime.now().plusDays(1)));
		}

		return dto;
	}

	public void setConfIndicador(IndicadorDTO valor) throws Exception {
		// Validações
		if (valor == null)
			throw AlertMensagemException.createWith("Valores não foi informado");
		if (valor.getCodigo() == null)
			throw AlertMensagemException.createWith("Código do Indicador não foi informado");

		String[] horario = this.validarHoraMinuto(valor.getConfNivel1(), "No Prazo");
		Integer hora1 = Integer.parseInt(horario[0]);
		Integer minuto1 = Integer.parseInt(horario[1]);
		if ((hora1 + minuto1) == 0)
			throw AlertMensagemException
					.createWith("Horário para o indicador No Prazo não pode ser maior que 997 horas.");

		horario = this.validarHoraMinuto(valor.getConfNivel2(), "Aceitável");
		Integer hora2 = Integer.parseInt(horario[0]);
		Integer minuto2 = Integer.parseInt(horario[1]);

		if ((hora2 + minuto2) == 0)
			throw AlertMensagemException.createWith("Horário para o indicador Aceitável tem de ser maior que zero.");
		if ((hora2 + (minuto2 / 60)) > 999)
			throw AlertMensagemException
					.createWith("Horário para o indicador Aceitável não pode ser maior que 999 horas.");

		if ((hora2 + minuto2) <= (hora1 + minuto1))
			throw AlertMensagemException
					.createWith("Horário para o indicador Aceitável tem de ser maior que o do indicador No Prazo.");

		horario = this.validarHoraMinuto(valor.getConfFrequencia(), "A Cada");
		Integer hora = Integer.parseInt(horario[0]);
		Integer minuto = Integer.parseInt(horario[1]);
		if ((hora + minuto) == 0)
			throw AlertMensagemException.createWith("Horário para o indicador A Cada tem de ser maior que zero.");
		if ((hora + (minuto / 60)) > 24)
			throw AlertMensagemException.createWith("Horário para o indicador A Cada não pode ser maior que 24 horas.");

		IndicadorConfiguracao item = indicadorConfRepository.findById(valor.getCodigo()).orElse(null);

		if (item == null) {
			IndicadorConfiguracao ic = new IndicadorConfiguracao();

			ic.setCodigoIndicador(valor.getCodigo());

			ic.setNivel1(valor.getConfNivel1());
			ic.setNivel2(valor.getConfNivel2());
			ic.setFrequencia(valor.getConfFrequencia());

			indicadorConfRepository.save(ic);
		} else {
			item.setNivel1(valor.getConfNivel1());
			item.setNivel2(valor.getConfNivel2());
			item.setFrequencia(valor.getConfFrequencia());

			indicadorConfRepository.save(item);
		}

	}

		//////////////
	// PRIVADOS //
	//////////////
		
	/**
	 * Recebe uma string com hora:minuto e devolve separado esses valores.
	 * 
	 * @param valor Ex: 024:03
	 * @return 024, 03
	 * @throws Exception
	 */
	private String[] validarHoraMinuto(String valor, String campo) throws Exception {
		String[] retorno = null;
		
		if (valor == null)
			throw AlertMensagemException.createWith("Horário (" + campo + ") não foi informado.");
		
		if (valor.indexOf(":") < 0)
			throw AlertMensagemException.createWith("Horário (" + campo + ") está incorreto.");
			
		retorno = valor.split(":");
		
		return retorno;
	}

	/**
	 * Atualiza a próxima data de atualização do Motor de Serviços.
	 * @param valor
	 */
	@Transactional
	public void setConfIndicadorProximaAtualizacao(IndicadorDTO valor) {
		//Validações
		if (valor == null)
			throw AlertMensagemException.createWith("A data da Próxima Atualização não pode ser nula.");
		
		var agora = new Date(System.currentTimeMillis());
		
		if (valor.getConfDataProximaAtualizacao().before(agora)) {
			throw AlertMensagemException.createWith("A data da Próxima Atualização não pode ser no passado.");
		}
		//Soma 2 dias a data atual.
		LocalDateTime ldt = LocalDateTime.now().plusDays(2);
		agora = DataUtil.converterToDataUtil(ldt);
		
		if (valor.getConfDataProximaAtualizacao().after(agora))
			throw AlertMensagemException.createWith("A data da Próxima Atualização não pode ser superior a dois dias.");
		
		var indicador = indicadorConfRepository.findById(valor.getCodigo()).orElse(null);
		
		//Se ainda não tem o indicador configurado, utiliza os valores padrões.
		if (indicador == null) {
			indicador = new IndicadorConfiguracao();
			
			var padrao = this.getConfPadrao(valor.getCodigo());
			
			indicador.setCodigoIndicador(valor.getCodigo());
			indicador.setNivel1(		padrao.getConfNivel1());
			indicador.setNivel2(		padrao.getConfNivel2());
			indicador.setFrequencia(	padrao.getConfFrequencia());
		}
		//Atualiza a data.
		indicador.setDataProximaAtualizacao(valor.getConfDataProximaAtualizacao());
		//Sava a data.
		indicadorConfRepository.save(indicador);
	}
}
