package fr.seblaporte.springboot2app.exception;

public class AlertMensagemException extends RuntimeException {
    /**
     *
     */
    private static final long serialVersionUID = 1L;

    public static AlertMensagemException createWith(String message) {
        return new AlertMensagemException(message);
    }

	public static AlertMensagemException createWith(String message, Throwable cause) {
		return new AlertMensagemException(message, cause);
	}

	private AlertMensagemException(String message) {
    	super(message);
    }

	private AlertMensagemException(String message, Throwable cause) {
		super(message, cause);
		
	}

}
