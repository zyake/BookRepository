package my.app.bookrepository.domain;

import java.util.List;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import my.app.bookrepository.mappers.BookMapper;

@Stateless
public class DefaultBookService implements BookService {

	@Inject
	BookMapper mapper;

	@TransactionAttribute(TransactionAttributeType.REQUIRED)
	public List<Book> listBooks(int index, int size) {
		int from =(index - 1) * size -1;
		int to = index  * size;
		List<Book> books = mapper.listBooks(from, to);

		return books;
	}

	@TransactionAttribute(TransactionAttributeType.REQUIRED)
	public void insertBook(Book newBook) {

	}
}
