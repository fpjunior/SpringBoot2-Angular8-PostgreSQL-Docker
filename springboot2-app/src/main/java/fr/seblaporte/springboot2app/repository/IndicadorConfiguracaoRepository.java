package fr.seblaporte.springboot2app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.seblaporte.springboot2app.model.IndicadorConfiguracao;

/**
 * 
 * @author fernando.junior
 * @since 20210205
 * 
 */
public interface IndicadorConfiguracaoRepository  extends JpaRepository<IndicadorConfiguracao, Integer>{
    

}