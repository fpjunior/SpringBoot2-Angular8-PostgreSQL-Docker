package fr.seblaporte.springboot2app.enums;

public enum TipoUsuario {
	ADMINSTRADOR(1, "Usuário Administrador"),
	SUPERVISOR(2, "Usuário Supervisor"),
	COMUM(3, "Usuário Comum");

	private Integer codigo;
	private String nome;
	
	TipoUsuario(Integer codigo, String nome) {
		this.codigo = codigo;
		this.nome = nome;
	}

	public Integer getCodigo() {
		return this.codigo;
	}
	
	public String getNome() {
		return this.nome;
	}
	
	public static TipoUsuario fromInteger(Integer codigo) {
		for (TipoUsuario b : TipoUsuario.values()) {
			if (b.codigo.equals(codigo)) {
				return b;
			}
		}
		return null;
	}	
	
	public static TipoUsuario fromString(String nome) {
		for (TipoUsuario b : TipoUsuario.values()) {
			if (b.nome.equalsIgnoreCase(nome)) {
				return b;
			}
		}
		return null;
	}	
}
