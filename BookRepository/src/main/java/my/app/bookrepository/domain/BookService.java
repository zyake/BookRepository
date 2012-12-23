package my.app.bookrepository.domain;

import java.util.List;


public interface BookService {

	/**
	 * 指定された開始インデックスから始まる書籍情報を取得する。
	 *
	 * @param index 1始まりの開始インデックス
	 * @param size 1ページあたりのサイズ
	 * @return
	 */
	List<Book> listBooks(int index, int size);


	void insertBook(Book newBook);
}
