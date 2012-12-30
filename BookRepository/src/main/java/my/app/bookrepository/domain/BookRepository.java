package my.app.bookrepository.domain;

import java.io.Closeable;
import java.util.List;

public interface BookRepository {

    List<Book> listBooks(int from, int to);

    void insertBook(Book newBook);

    int countBooks();

    List<String> listPublishers();

    List<String> listRanks();

    List<String> listGenres();

    void close();
}
