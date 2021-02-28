package fr.seblaporte.springboot2app.enums;

public enum TipoEvento {
	CREDITOS_COMPRA(1, "Créditos na compra"),
	GASTOS_COMPRA(2, "Gastos na compra"),
	MARGEM_PRETENDIDA(3, "Margem pretendida"),
	DESPESAS_VARIAVEIS(4, "Despesas variáveis"),
	DESPESAS_FIXAS(5, "Despesas fixas"),
	DESPESAS_FINANCEIRAS(6, "Despesas financeiras"),
	OUTRAS_DESPESAS_INDIRETAS(7, "Outras despesas indiretas"),
	REDUTOR_MARKUP(8, "Redutor de Markup");

	private Integer codigo;
	private String descricao;
	
	TipoEvento(Integer codigo, String descricao) {
		this.codigo = codigo;
		this.descricao = descricao;
	}

	public Integer getCodigo() {
		return this.codigo;
	}
	
	public String getDescricao() {
		return this.descricao;
	}
	
	public static TipoEvento fromInteger(Integer codigo) {
		for (TipoEvento b : TipoEvento.values()) {
			if (b.codigo.equals(codigo)) {
				return b;
			}
		}
		return null;
	}	
	
	public static TipoEvento fromString(String descricao) {
		for (TipoEvento b : TipoEvento.values()) {
			if (b.descricao.equalsIgnoreCase(descricao)) {
				return b;
			}
		}
		return null;
	}	
}
