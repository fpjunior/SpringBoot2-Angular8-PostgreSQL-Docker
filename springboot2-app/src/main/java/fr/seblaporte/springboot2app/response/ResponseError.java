package fr.seblaporte.springboot2app.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseError {
    private String campo;
    private String mensagem;
    private Object[] data;

    public ResponseError(String campo, String mensagem) {
        super();
        this.campo = campo;
        this.mensagem = mensagem;
    }

}
