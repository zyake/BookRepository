package my.app.bookrepository.mappers;

public class MapperException extends RuntimeException {
    public MapperException(Exception e) {
        super(e);
    }
}
