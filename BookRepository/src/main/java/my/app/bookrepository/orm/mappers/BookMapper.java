package my.app.bookrepository.orm.mappers;

import java.util.List;

import my.app.bookrepository.domain.Book;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;

public interface BookMapper {

	@Select("SELECT no, name, url, publisher, price, parchasedate, readingstate, comment, rank, genre FROM Books WHERE no >= #{0} AND #{1} >= no")
	List<Book> listBooks(int from, int to);

	@Insert("INSERT INTO Books(Name, Url, Publisher, Price, ParchaseDate, ReadingState, Comment, Rank, Genre) VALUES(#{name}, #{url}, #{publisher}, #{price}, #{parchaseDate}, #{readingState}, #{comment}, #{rank}, #{genre})")
	void insertBook(Book newBook);
}
