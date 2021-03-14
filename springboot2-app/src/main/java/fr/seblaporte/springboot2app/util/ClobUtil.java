package fr.seblaporte.springboot2app.util;

import java.io.IOException;
import java.io.Reader;
import java.sql.Clob;
import java.sql.SQLException;

import javax.sql.rowset.serial.SerialException;

import com.fasterxml.jackson.core.JsonProcessingException;

public class ClobUtil {

	public static String getString(Clob clob) throws IOException, SQLException {
		String s = "";

		try (Reader r = clob.getCharacterStream()) {
			StringBuffer buffer = new StringBuffer();
			int ch;
			while ((ch = r.read()) != -1) {
				buffer.append("" + (char) ch);
			}
			s = buffer.toString();
			r.close();
		}

		return s;
	}
	
	public static String toString(Clob clob) throws SQLException {
		if (clob == null)
			return "";
		else
			return clob.getSubString(1, (int) clob.length());
	}

	public static Clob toClob(String value) throws SerialException, SQLException {
		if (value == null)
			return null;
		else
			return new javax.sql.rowset.serial.SerialClob(value.toCharArray());
	}
	
	public static Clob objectToJsonClob(Object object) throws JsonProcessingException, SerialException, SQLException {
		String jsonStr = JsonUtil.converterObjetoEmJsonString(object);
		Clob clob = ClobUtil.toClob(jsonStr);			
		return clob;
	}
	
}
