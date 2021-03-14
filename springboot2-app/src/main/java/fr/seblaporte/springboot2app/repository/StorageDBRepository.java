package fr.seblaporte.springboot2app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fr.seblaporte.springboot2app.model.StorageDB;


public interface StorageDBRepository extends JpaRepository<StorageDB, Integer> {

	@Query(value = "select s "
			+ "from StorageDB s "
			+ "where s.codigoUsuario = :codigoUsuario "
			+ "and s.keyStorage = :keyStorage ")
	public Optional<StorageDB> getStorageDB(Integer codigoUsuario, String keyStorage);

}
