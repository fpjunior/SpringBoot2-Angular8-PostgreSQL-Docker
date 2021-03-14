package fr.seblaporte.springboot2app.util;

import org.apache.tomcat.util.json.JSONParser;
import org.apache.tomcat.util.json.ParseException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;

public class JsonUtil {

	public static String converterObjetoEmJsonString(Object objeto) throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
		ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
		String requestJson = ow.writeValueAsString(objeto);
		return requestJson;
	}

	public static Object stringToJsonObject(String jsonStr) throws ParseException {
		Object objParse = null;
		
		if (jsonStr == null)
			return objParse;		
		
		JSONParser jsonParser = new JSONParser(jsonStr);		
		objParse = jsonParser.parse();
			
		return objParse;
	}	
}
