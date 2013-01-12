package my.app.bookrepository.domain;

import my.app.bookrepository.mappers.BookMapper;

import javax.annotation.ManagedBean;
import javax.inject.Inject;
import java.util.List;

@ManagedBean
public class DefaultBookRepository implements BookRepository {

    @Inject
    BookMapper mapper;

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
    public void updateBook(Book book) {
        int updateCount = mapper.updateBook(book);
        boolean updateFailed = updateCount == 0;
        if ( updateFailed ) {
            throw new DomainException("update failed: " + book);
        }
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
}
