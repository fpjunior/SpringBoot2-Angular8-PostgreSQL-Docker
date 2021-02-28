package fr.seblaporte.springboot2app.model;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import fr.seblaporte.springboot2app.enums.TipoEvento;
import fr.seblaporte.springboot2app.enums.convert.TipoEventoConverter;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "eventos")
public class Evento extends BaseEntity {

	private static final long serialVersionUID = -2771500391867845166L;

	@Id
	@Column(name = "T012_C001_", unique = true, nullable = false, precision = 10, scale = 0)
	@SequenceGenerator(name = "S001_T012_C001_", sequenceName = "S001_T012_C001_", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "S001_T012_C001_")
	private Integer codigo;

	@Column(name = "T012_C002_", length = 50, nullable = true)
	private String descricao;

	@Column(name = "T012_C003_", precision = 1, scale = 0, nullable = true)
	@Convert(converter = TipoEventoConverter.class)
	private TipoEvento tipo;

	// @Column(name = "T012_C004_", precision = 1, scale = 0, nullable = true)
	// @Convert(converter = BaseIncidenciaEventoConverter.class)
	// private BaseIncidenciaEvento baseIncidencia;

	@Column(name = "T012_C005_", length = 1)
	private String icms;

	@Column(name = "T012_C006_", length = 1)
	private String icmsSt;

	@Column(name = "T012_C007_", length = 1)
	private String pis;

	@Column(name = "T012_C008_", length = 1)
	private String cofins;

	@Column(name = "T012_C009_", length = 1)
	private String ipi;

	@Column(name = "T012_C010_", length = 1)
	private String impostoImportacao;

}
