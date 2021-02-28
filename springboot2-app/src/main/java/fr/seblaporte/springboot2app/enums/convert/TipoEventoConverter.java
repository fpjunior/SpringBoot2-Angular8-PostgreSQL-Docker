package fr.seblaporte.springboot2app.enums.convert;
import javax.persistence.AttributeConverter;

import fr.seblaporte.springboot2app.enums.TipoEvento;


public class TipoEventoConverter implements AttributeConverter<TipoEvento, Integer>  {
	@Override
	public Integer convertToDatabaseColumn(TipoEvento attribute) {
		return (attribute != null) ? attribute.getCodigo() : null;
	}

	@Override
	public TipoEvento convertToEntityAttribute(Integer codigo) {
		return TipoEvento.fromInteger(codigo);
	}
}