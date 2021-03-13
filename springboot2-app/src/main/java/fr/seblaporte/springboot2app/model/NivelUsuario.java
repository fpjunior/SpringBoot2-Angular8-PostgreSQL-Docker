package fr.seblaporte.springboot2app.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(schema = "MDWBPRC", name = "T011_")
public class NivelUsuario extends BaseEntity{

	private static final long serialVersionUID = -4021756313722115556L;

	@Id
	@Column(name = "T011_C001_", unique = true, nullable = false, precision = 10, scale = 0)
	@SequenceGenerator(schema="MDWBPRC", name = "S001_T011_C001_", sequenceName = "S001_T011_C001_", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "S001_T011_C001_")
	private Integer codigo;

	@Column(name = "T011_C002_", length = 50, nullable = true)
	private String descricao;
	
	@Column(name= "T011_C003_", nullable = true)
	private Integer nivel;
	
}
