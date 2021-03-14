package fr.seblaporte.springboot2app.enums.convert;
import javax.persistence.AttributeConverter;

import fr.seblaporte.springboot2app.enums.TipoUsuario;


public class TipoUsuarioConverter implements AttributeConverter<TipoUsuario, Integer>  {
	@Override
	public Integer convertToDatabaseColumn(TipoUsuario attribute) {
		return (attribute != null) ? attribute.getCodigo() : null;
	}

	@Override
	public TipoUsuario convertToEntityAttribute(Integer codigo) {
		return TipoUsuario.fromInteger(codigo);
	}
}