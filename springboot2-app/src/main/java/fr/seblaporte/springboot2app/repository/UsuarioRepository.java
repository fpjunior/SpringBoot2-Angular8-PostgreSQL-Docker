package fr.seblaporte.springboot2app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import fr.seblaporte.springboot2app.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

	@Query("select ev "
			+ "from Usuario ev "
			+ "where (   cast(ev.codigo as string) = :filtro "
			       + "or ev.nome like concat('%',:filtro,'%') "
			      + ")")
    List<Usuario> buscarTodos(String filtro);
}
