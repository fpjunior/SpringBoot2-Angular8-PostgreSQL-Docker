package fr.seblaporte.springboot2app.dto;

import java.util.Calendar;
import java.util.Date;

import javax.persistence.Column;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonGetter;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiModelProperty.AccessMode;
import lombok.Data;

@Data
@ApiModel(value = "UsuarioDTO - Usuario")
public class UsuarioDTO {

	@ApiModelProperty(value = "Campo numérico com 4 posições, cujo preenchimento será automático", accessMode = AccessMode.READ_ONLY)
	private Integer codigo;

	@ApiModelProperty(value = "Campo alfanumérico, obrigatório, com 150 caracteres")
	private String nome;

	@JsonGetter
	public String getCodigoComNome() {
		return (this.codigo == null ? "" : String.valueOf(this.codigo) + " - " + this.nome);
	}

	@ApiModelProperty(value = "Campo email.")
	private String email;

	@ApiModelProperty(value = "Campo senhha.")
	private String senha;

	@JsonFormat(pattern = "dd/MM/yyyy HH:mm")
	private Date dataSenha;

}
