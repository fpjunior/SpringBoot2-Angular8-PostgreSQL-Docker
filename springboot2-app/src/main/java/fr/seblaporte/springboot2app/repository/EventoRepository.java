package fr.seblaporte.springboot2app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import fr.seblaporte.springboot2app.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventoRepository extends JpaRepository<Evento, Integer> {
    
	@Query("select ev "
			+ "from Evento ev "
			+ "where (   cast(ev.codigo as string) = :filtro "
			       + "or ev.descricao like concat('%',:filtro,'%') "
			      + ")")
    List<Evento> buscarTodos(String filtro);

	@Query("select ev "
			+ "from Evento ev "
			+ "where ev.tipo in (3,4,5,6,7,8) "
			+ "and ( cast(ev.codigo as string) = :filtro "
			     + "or ev.descricao like concat('%',:filtro,'%') "
			     + ")")
	List<Evento> buscarEventosFormacaoPrecoVenda(String filtro);
}
