package my.app.bookrepository.domain;

import java.io.Closeable;
import java.util.List;

/**
 * 書籍情報にアクセスするためのリポジトリ。
 * <p>
 * ライフサイクルは<em>リクエスト単位</em>であるため、
 * サービスクラスなどで使用した後は必ずクローズすること。
 * </p>
 */
public interface BookRepository {

    List<Book> listBooks(int from, int to);

    void insertBook(Book newBook);

    int countBooks();

    List<String> listPublishers();

    List<String> listRanks();

    List<String> listGenres();

    /**
     * リクエスト単位で保持するリソースをクローズする。
     * そのリクエストでの全ての処理が完了した後は、
     * 必ずクローズすること。
     */
    void close();
}
