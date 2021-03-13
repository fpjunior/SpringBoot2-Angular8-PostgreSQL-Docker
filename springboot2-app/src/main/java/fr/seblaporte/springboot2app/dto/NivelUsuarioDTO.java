package fr.seblaporte.springboot2app.dto;

import fr.seblaporte.springboot2app.model.NivelUsuario;
import lombok.Data;

@Data
public class NivelUsuarioDTO implements Comparable<NivelUsuarioDTO> {
	
	private Integer codigo;

	private String descricao;
	
	private Integer nivel;

	private Integer operacao;
	
	@Override
    public int compareTo(NivelUsuarioDTO outroObjeto) {
		if (this.nivel > outroObjeto.getNivel()) {
	          return 1;
	    }
	    if (this.nivel < outroObjeto.getNivel()) {
	          return -1;
	    }
	    return 0;
	}
	
	public NivelUsuario toEntity() {
			
		NivelUsuario nu = new NivelUsuario();
		nu.setCodigo(this.getCodigo());
		nu.setDescricao(this.getDescricao());
		nu.setNivel(this.getNivel());
		
		return nu;
	}
	
}

