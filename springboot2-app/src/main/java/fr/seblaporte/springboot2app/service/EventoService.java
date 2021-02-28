package fr.seblaporte.springboot2app.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.seblaporte.springboot2app.dto.EventoDTO;
import fr.seblaporte.springboot2app.enums.TipoEvento;
import fr.seblaporte.springboot2app.model.Evento;
import fr.seblaporte.springboot2app.repository.EventoRepository;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;
    @Autowired
	private EventoRepository eventoRespository;

	@Transactional(readOnly = true)
	public List<EventoDTO> buscarTodos(String filtro) {
		List<EventoDTO> eventosDTOs = new ArrayList<>();
		// bucar todos os eventos cadastros
		List<Evento> eventos = this.eventoRespository.buscarTodos(filtro);
		// conveter tudo em dto;
		eventos.forEach((e) -> eventosDTOs.add(this.toDTO(e)));
		return eventosDTOs;
	}

	@Transactional(readOnly = true)
	public EventoDTO buscarPorCodigo(Integer codigo) {
		EventoDTO eventoDTO = null;
		Optional<Evento> opEvento = this.eventoRespository.findById(codigo);
		if (opEvento.isPresent()) {
			eventoDTO = this.toDTO(opEvento.get());
		}
		return eventoDTO;
	}

	@Transactional
	public Integer cadastrar(EventoDTO dto) {
		Evento evento = this.salvar(dto);
		return evento.getCodigo();
	}

	@Transactional
	public void atualizar(EventoDTO dto) {
		this.salvar(dto);
	}

	private Evento salvar(EventoDTO dto) {
		Evento evento = this.toEntity(dto);
		evento = this.eventoRespository.save(evento);
		return evento;
	}

	@Transactional
	public void deletar(Integer codigo) {		
		this.eventoRespository.deleteById(codigo);
	}
	
	private EventoDTO toDTO(Evento entity) {
		EventoDTO dto = new EventoDTO();
		
		dto.setCodigo(entity.getCodigo());
		dto.setDescricao(entity.getDescricao());
		
		TipoEvento tipo = entity.getTipo();
		if (tipo != null)
			dto.setTipo(tipo.getCodigo());
		
		// BaseIncidenciaEvento baseIncidencia = entity.getBaseIncidencia();
		// if (baseIncidencia != null)
		// 	dto.setBaseIncidencia(baseIncidencia.getCodigo());
		
		dto.setIcms(entity.getIcms());
		dto.setIcmsSt(entity.getIcmsSt());
		dto.setPis(entity.getPis());
		dto.setCofins(entity.getCofins());
		dto.setIpi(entity.getIpi());
		dto.setImpostoImportacao(entity.getImpostoImportacao());		
		
		return dto;
	}

	private Evento toEntity(EventoDTO dto) {
		if (dto == null)
			return null;
		
		Evento entity = null;
		
		if (dto.getCodigo() != null)
			entity = eventoRespository.findById(dto.getCodigo()).orElse(null);
		
		if (entity == null) {
			entity = new Evento();
			entity.setCodigo(dto.getCodigo());
		}	
		
		entity.setDescricao(dto.getDescricao());
		
		TipoEvento tipo = TipoEvento.fromInteger(dto.getTipo());
		entity.setTipo(tipo);
		
		// BaseIncidenciaEvento baseIncidencia = BaseIncidenciaEvento.fromInteger(dto.getBaseIncidencia());
		// entity.setBaseIncidencia(baseIncidencia);
		
		entity.setIcms(dto.getIcms());
		entity.setIcmsSt(dto.getIcmsSt());
		entity.setPis(dto.getPis());
		entity.setCofins(dto.getCofins());
		entity.setIpi(dto.getIpi());
		entity.setImpostoImportacao(dto.getImpostoImportacao());			
		
		return entity;
	}

	public List<EventoDTO> buscarEventosFormacaoPrecoVenda(String filtro) {
		List<EventoDTO> eventosDTOs = new ArrayList<>();
		// bucar todos os eventos cadastros
		List<Evento> eventos = this.eventoRespository.buscarEventosFormacaoPrecoVenda(filtro);
		// conveter tudo em dto;
		eventos.forEach((e) -> eventosDTOs.add(this.toDTO(e)));
		return eventosDTOs;
	}

	public Evento findById(Integer codigoEvento) {		
		return eventoRespository.findById(codigoEvento).orElse(null);
	}
    
}
