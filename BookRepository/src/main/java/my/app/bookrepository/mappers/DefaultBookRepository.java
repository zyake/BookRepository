package my.app.bookrepository.mappers;

import my.app.bookrepository.domain.Book;
import my.app.bookrepository.domain.BookRepository;

import java.util.List;

public class DefaultBookRepository implements BookRepository {

    AutoCloseable session;

    BookMapper mapper;

    public DefaultBookRepository(AutoCloseable session, BookMapper mapper) {
        this.session = session;
        this.mapper = mapper;
    }

    @Override
    public List<Book> listBooks(int from, int to) {
        return mapper.listBooks(from, to);
    }

    @Override
    public void insertBook(Book newBook) {
        mapper.insertBook(newBook);
    }

    @Override
    public int countBooks() {
        return mapper.countBooks();
    }

    @Override
    public List<String> listPublishers() {
        return mapper.listPublishers();
    }

    @Override
    public List<String> listRanks() {
        return mapper.listRanks();
    }

    @Override
    public List<String> listGenres() {
        return mapper.listGenres();
    }

    public void close()  {
        try {
            session.close();
        } catch (Exception e) {
            throw new MapperException(e);
        }
    }
}
