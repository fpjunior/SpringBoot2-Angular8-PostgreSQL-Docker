package fr.seblaporte.springboot2app.dto;

import java.util.Calendar;

import com.fasterxml.jackson.annotation.JsonGetter;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("UsuarioDTO - Usuario")
public class UsuarioDTO {

	public UsuarioDTO(String nomeResponsavel, Integer codigo, String nome, String cpfCnpj, String email, String senha,
			boolean shutdown, Integer usuarioResponsavel, boolean gerirUsuarios, boolean excluido,
			String motivoBloqueio, Calendar dataSenha, boolean permiteDesconectarUsuarios, boolean ativo,
			String codigoUsuarioAD, String assinatura) {
		this.codigo = codigo;
		this.nome = nome;
		this.cpfCnpj = cpfCnpj;
		this.email = email;
		this.senha = senha;
		this.shutdown = shutdown;
		this.usuarioResponsavel = usuarioResponsavel;
		this.gerirUsuarios = gerirUsuarios;
		this.excluido = excluido;
		this.motivoBloqueio = motivoBloqueio;
		this.dataSenha = dataSenha;
		this.permiteDesconectarUsuarios = permiteDesconectarUsuarios;
		this.ativo = ativo;
		this.codigoUsuarioAD = codigoUsuarioAD;
		this.assinatura = assinatura;
		this.label = this.codigo + "-" + this.nome;
		this.nomeResponsavel = nomeResponsavel;
	}

	public UsuarioDTO() {
	}

	private String nomeResponsavel;
	private Integer codigo;
	private String nome;
	private String cpfCnpj;
	private String email;
	private String senha;
	private boolean shutdown;
	private Integer usuarioResponsavel;
	private boolean gerirUsuarios;
	private boolean excluido;
	private String motivoBloqueio;

	@ApiModelProperty()
	private Calendar dataSenha;
	private Integer nivelUsuario = null;
	private String descricaoNivel = "";
	private boolean permiteDesconectarUsuarios;
	private boolean ativo;
	private Integer codigoPerfil = 0;
	private String descricaoPerfil = "";
	private String codigoUsuarioAD;
	private String assinatura;
	private String label;
	
    @JsonGetter
    public String getCodigoComNome() {
    	return (this.codigo == null ? "" : String.valueOf(this.codigo) + " - " + this.nome);
    }	
    
    @JsonGetter
    public String getCodigoResponsavelComNome() {
    	return (this.usuarioResponsavel == null ? "" : String.valueOf(this.usuarioResponsavel) + " - " + this.nomeResponsavel);
    }	    
}
