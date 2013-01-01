package my.app.bookrepository.util;

public class UtilException extends RuntimeException {

    public UtilException(String msg, Exception ex) {
        super(msg, ex);
    }
}

