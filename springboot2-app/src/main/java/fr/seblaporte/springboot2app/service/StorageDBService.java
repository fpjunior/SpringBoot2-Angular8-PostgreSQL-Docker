package fr.seblaporte.springboot2app.service;

import java.sql.Clob;
import java.sql.SQLException;
import java.time.LocalDateTime;

import javax.sql.rowset.serial.SerialException;

import org.apache.tomcat.util.json.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonProcessingException;

import fr.seblaporte.springboot2app.exception.AlertMensagemException;
import fr.seblaporte.springboot2app.model.StorageDB;
import fr.seblaporte.springboot2app.repository.StorageDBRepository;
import fr.seblaporte.springboot2app.util.JsonUtil;
import fr.seblaporte.springboot2app.util.ClobUtil;

@Service
public class StorageDBService {

	@Autowired
	private StorageDBRepository storageDBRepository;
	
	@Transactional(readOnly = true)
	public Object getStorageDBToObject(Integer codigoUsuario, String keyStorage) {
		Object obj = null;

		StorageDB storage = storageDBRepository.getStorageDB(codigoUsuario, keyStorage).orElse(null);

		if (storage == null)
			return obj;
		
		String valueStorage = "";

		if (storage.getDados() != null) {
			try {
				valueStorage = ClobUtil.toString(storage.getDados());
			} catch (SQLException e) {
				throw AlertMensagemException.createWith("não foi possível ler os dados para usuario="
						+ String.valueOf(codigoUsuario) + ", keyStorage='" + keyStorage + "'.", e);
			}
		}

		try {
			obj = JsonUtil.stringToJsonObject(valueStorage);
		} catch (ParseException e) {
			throw AlertMensagemException.createWith("Parse de String para JSON inválido! Conteúdo: " + valueStorage, e);
		}

		return obj;
	}

	@Transactional
	public Integer setStorageDBFromObject(Integer codigoUsuario, String keyStorage, Object object) {		
		if (object != null) {			 
			return gravarStorageDB(codigoUsuario, keyStorage, object);
		} else {
			return apagarStorageDB(codigoUsuario, keyStorage);				
		}		
	}

	@Transactional(readOnly = true)
	public StorageDB toEntity(Integer codigoUsuario, String keyStorage, Object object) {

		if (codigoUsuario == null)
			throw AlertMensagemException.createWith("Código do usuário não pode ser nulo!");

		if (keyStorage == null || keyStorage.isBlank())
			throw AlertMensagemException.createWith("Chave de armazenamento não pode ser nulo ou vazio!");
		
		final Integer TIPO_DADOS_JSON = 1;
		StorageDB storage = storageDBRepository.getStorageDB(codigoUsuario, keyStorage).orElse(null);
		
		if (storage == null) {
			storage = new StorageDB();			
			storage.setCodigoUsuario(codigoUsuario);
			storage.setKeyStorage(keyStorage);
			storage.setTipoDados(TIPO_DADOS_JSON);			
		}	

		Clob dados = null;
		try {
			dados = ClobUtil.objectToJsonClob(object);
		} catch (JsonProcessingException e) {
			throw AlertMensagemException.createWith("formato dos dados inválidos! Formato JSON esperado.", e);
		} catch (SerialException e) {
			throw AlertMensagemException.createWith("não foi possível carregar os dados para gravação!", e);
		} catch (SQLException e) {
			throw AlertMensagemException.createWith("não foi conversar os dados para CLOB Oracle!", e);
		}			
		
		storage.setDados(dados);
		
		return storage;
	}

	@Transactional
	private Integer gravarStorageDB(Integer codigoUsuario, String keyStorage, Object object) {
		StorageDB storage = toEntity(codigoUsuario, keyStorage, object);
		storage.setDataUltAtualizacao(LocalDateTime.now());
		StorageDB storageSalvo = storageDBRepository.save(storage);		
		return storageSalvo.getId();
	}

	@Transactional
	public Integer apagarStorageDB(Integer codigoUsuario, String keyStorage) {
		StorageDB storage = storageDBRepository.getStorageDB(codigoUsuario, keyStorage).orElse(null);
		if (storage != null) {
			Integer id = storage.getId();
			storageDBRepository.delete(storage);
			return id;
		} else {
			return 0;
		}
	}	

}