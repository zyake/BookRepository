package my.app.bookrepository.mappers;

import java.util.List;

import my.app.bookrepository.domain.Book;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

public interface BookMapper {

	@Select("SELECT No, Name, Url, Publisher, Price, PurchaseDate, ReadingState, Comment, Rank, Genre, Revision FROM Books WHERE No >= #{0} AND #{1} >= No")
	List<Book> listBooks(int from, int to);

	@Insert("INSERT INTO Books(Name, Url, Publisher, Price, PurchaseDate, ReadingState, Comment, Rank, Genre, Revision) VALUES(#{name}, #{url}, #{publisher}, #{price}, #{purchaseDate}, #{readingState}, #{comment}, #{rank}, #{genre}, 0)")
	void insertBook(Book newBook);

    @Update("UPDATE Books SET Name = #{name}, Url = #{url}, Publisher = #{publisher}, Price = #{price}, PurchaseDate = #{purchaseDate}, ReadingState = #{readingState}, Comment = #{comment}, Rank = #{rank}, Genre = #{genre}, Revision = Revision + 1 WHERE No = #{no} AND Revision = #{revision}")
    int updateBook(Book book);

    @Select("SELECT COUNT(1) FROM Books")
    int countBooks();

    @Select("SELECT Name FROM Publishers ORDER BY Name")
    List<String> listPublishers();

    @Select("SELECT Rank FROM Ranks ORDER BY Rank")
    List<String> listRanks();

    @Select("SELECT Genre FROM Genres ORDER BY Genre")
    List<String> listGenres();
}
