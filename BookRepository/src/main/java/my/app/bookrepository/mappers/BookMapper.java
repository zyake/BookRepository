package my.app.bookrepository.mappers;

import java.util.List;

import my.app.bookrepository.domain.Book;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;

public interface BookMapper {

	@Select("SELECT no, name, url, publisher, price, purchasedate, readingstate, comment, rank, genre FROM Books WHERE no >= #{0} AND #{1} >= no")
	List<Book> listBooks(int from, int to);

	@Insert("INSERT INTO Books(Name, Url, Publisher, Price, PurchaseDate, ReadingState, Comment, Rank, Genre) VALUES(#{name}, #{url}, #{publishers}, #{price}, #{purchaseDate}, #{readingStates}, #{comment}, #{ranks}, #{genres})")
	void insertBook(Book newBook);

    @Select("SELECT COUNT(no) FROM Books")
    int countBooks();

    @Select("SELECT Name FROM Publishers ORDER BY Name")
    List<String> listPublishers();

    @Select("SELECT Rank FROM Ranks ORDER BY Rank")
    List<String> listRanks();

    @Select("SELECT Genre FROM Genres ORDER BY Genre")
    List<String> listGenres();
}
