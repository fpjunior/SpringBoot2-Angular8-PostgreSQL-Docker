package fr.seblaporte.springboot2app.response;

import lombok.Data;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author danilomuniz
 */
@Data
public class Response<T> {
	

	private boolean status;
	private T data;
	private List<ResponseError> errors;

	public Response() {
		this.status = true;
		this.errors = new ArrayList<ResponseError>();
	}

	public void setErrors(List<ResponseError> errors) {
		this.status = (errors != null && (!errors.isEmpty())) ? false : true;
		this.errors = errors;
	}

}