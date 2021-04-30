package fr.seblaporte.springboot2app.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


import lombok.Data;
import lombok.EqualsAndHashCode;


@Data
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "users")
public class User {

    @Id
	@Column(name = "T005_C001_", unique = true, nullable = false, precision = 10, scale = 0)
	@SequenceGenerator(name = "S001_T005_C001_", sequenceName = "S001_T005_C001_", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "S001_T005_C001_")
	private Integer codigo;

	@Column(name = "T005_C002_", length = 150, nullable = true)
	private String nome;

    @Column(name = "T005_C004_", length = 100)
	private String email;

	@Column(name = "T005_C005_", length = 200)
	private String senha;

	private Date dataSenha;


}
