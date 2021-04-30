package fr.seblaporte.springboot2app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fr.seblaporte.springboot2app.model.User;

public interface UsersRepository extends JpaRepository<User, Long>{
    

    @Query("select ev "
    + "from User ev "
    + "where (   cast(ev.codigo as string) = :filtro "
           + "or ev.nome like concat('%',:filtro,'%') "
          + ")")
List<User> buscarTodos(String filtro);

}
