package fr.seblaporte.springboot2app.dto;

import com.fasterxml.jackson.annotation.JsonGetter;

import fr.seblaporte.springboot2app.enums.TipoEvento;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiModelProperty.AccessMode;
import lombok.Getter;
import lombok.Setter;
import lombok.var;

@Getter
@Setter
@ApiModel(value= "EventoDTO - Evento")
public class EventoDTO {
    
    @ApiModelProperty(value ="Campo numérico com 4 posições, cujo preenchimento será automático", accessMode = AccessMode.READ_ONLY)
    private Integer codigo;

    @ApiModelProperty(value = "Campo alfanumérico, obrigatório, com 30 caracteres")
	private String descricao;

    @JsonGetter
	public String getCodigoComDescricao() {
		return (this.codigo == null ? "" : String.valueOf(this.codigo) + " - " + this.descricao);
	}

    @ApiModelProperty(value = "Campo obrigatório, com 8 opções disponíveis (valor number/ descrição/):\n" + 
    "             1-Créditos na compra;\n" + 
    "             2-Gastos na compra;\n" + 
    "             3-Margem pretendida;\n" + 
    "             4-Despesas variáveis;\n" + 
    "             5-Despesas fixas;\n" + 
    "             6-Despesas financeiras;\n" + 
    "             7-Outras despesas indiretas.\n" + 
    "             8-Redutor de Markup")
private Integer tipo;

@JsonGetter
public String getDescricaoTipoEvento() {
    var tipoEvento = TipoEvento.fromInteger(this.tipo);
    if (tipoEvento != null)
        return tipoEvento.getDescricao().toUpperCase();
    else
        return "";				
}

@JsonGetter
public String getCodigoComDescricaoTipoEvento() {
    var tipoEvento = TipoEvento.fromInteger(this.tipo);
    if (tipoEvento != null)
        return String.valueOf(tipoEvento.getCodigo()) + " - " + tipoEvento.getDescricao().toUpperCase();
    else
        return "";				
}
	// @ApiModelProperty(value = "  Campo de seleção obrigatória, com 2 opções disponíveis: \n" + 
	// 		"                      1-Preço de Lista;\n" + 
	// 		"                      2-Preço da NF;\n" + 
	// 		"                      3-Custo Projetado;\n" + 
	// 		"              OBS: REGRAS: 1 - Porém, este campo ficará habilitado apenas, quando o campo Tipo for 1-Crédito na Compra ou 2-Gastos na Compra;"
	// 		+ "				     2 - Quando a Base de Incidência for 2-Preço da NF, então os seguintes campos de impostos serão apresentados e habilitados para check: ICMS, ICMS ST, PIS, COFINS, IPI e Imp. IMPORTAÇÃO. ")
	// private Integer baseIncidencia;

	@JsonGetter
	public String getDescricaoBaseIncidencia() {
		// var baseIncidencia = BaseIncidenciaEvento.fromInteger(this.baseIncidencia);
		// if (baseIncidencia != null)
		// 	return baseIncidencia.getDescricao().toUpperCase();
		// else
			return "";				
	}
	
	@ApiModelProperty(value = "Campo condição sim ou não. Valores: 'S' para sim, 'N' para não. Somente quando Base de Incidência for 2-Preço da NF.")
	private String icms;

	@ApiModelProperty(value = "Campo condição sim ou não. Valores: 'S' para sim, 'N' para não. Somente quando Base de Incidência for 2-Preço da NF.")
	private String icmsSt;

	@ApiModelProperty(value = "Campo condição sim ou não. Valores: 'S' para sim, 'N' para não. Somente quando Base de Incidência for 2-Preço da NF.")
	private String pis;

	@ApiModelProperty(value = "Campo condição sim ou não. Valores: 'S' para sim, 'N' para não. Somente quando Base de Incidência for 2-Preço da NF.")
	private String cofins;

	@ApiModelProperty(value = "Campo condição sim ou não. Valores: 'S' para sim, 'N' para não. Somente quando Base de Incidência for 2-Preço da NF.")
	private String ipi;

	@ApiModelProperty(value = "Campo condição sim ou não. Valores: 'S' para sim, 'N' para não. Somente quando Base de Incidência for 2-Preço da NF.")
	private String impostoImportacao;	
}

