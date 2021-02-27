package fr.seblaporte.springboot2app.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Size;

import lombok.Data;
import lombok.EqualsAndHashCode;
/**
 * 
 * @author fernando.junior
 * @since 20210204
 * 
 */
@Entity
@Table(name = "configIndicador")
@Data
@EqualsAndHashCode(callSuper=false)
public class IndicadorConfiguracao extends BaseEntity {
    /**
    *
    */
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "T024_C001_")
    @Max(999999)
    private Integer codigoIndicador;

    @Column(name = "T024_C002_")
	@Size(max = 6)
    private String nivel1;

    @Column(name = "T024_C003_")
	@Size(max = 6)
    private String nivel2;

    @Column(name = "T024_C004_")
	@Size(max = 5)
    private String frequencia;

    @Column(name = "T024_C005_")
    private Date dataProximaAtualizacao;
    
    
}
