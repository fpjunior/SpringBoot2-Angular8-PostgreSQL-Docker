package fr.seblaporte.springboot2app.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

/**
 * 
 * @author fernando.junior
 * @since 20210204
 */
@Data
public class IndicadorDTO {

    private Integer codigo;
    private String descricao;

    private String confNivel1;
    private String confNivel2;
    private String confFrequencia;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private Date confDataProximaAtualizacao;

}