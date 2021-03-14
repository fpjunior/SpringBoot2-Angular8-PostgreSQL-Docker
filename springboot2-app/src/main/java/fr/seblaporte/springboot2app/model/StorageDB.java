package fr.seblaporte.springboot2app.model;

import java.sql.Clob;
import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(schema = "MDWBPRC", name = "T900_")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StorageDB {
	@Id
	@Column(name = "T900_C001_", unique = true, nullable = false, precision = 10, scale = 0)
	@SequenceGenerator(name = "S001_T900_C001_", sequenceName = "S001_T900_C001_", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "S001_T900_C001_")	
	private Integer id;

	@Column(name = "T900_C002_", nullable = false)	
	private Integer codigoUsuario;

	@Column(name = "T900_C003_", length = 255, nullable = false)
	private String keyStorage;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "T900_C002_", insertable = false, updatable = false)	
	private Usuario usuario;
	
	@Column(name = "T900_C004_", columnDefinition = "TIMESTAMP")
	private LocalDateTime dataUltAtualizacao;

	@Column(name = "T900_C005_")
	private Integer tipoDados;

	@Column(name = "T900_C006_", columnDefinition = "CLOB")
	private Clob dados;
}

