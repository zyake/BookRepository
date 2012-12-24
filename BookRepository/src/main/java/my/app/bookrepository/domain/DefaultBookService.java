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
		Page page = new Page(index, size);
		PageRange range = page.getRange();
		List<Book> books = mapper.listBooks(range.getFrom(), range.getTo());

		return books;
	}

	@TransactionAttribute(TransactionAttributeType.REQUIRED)
	public void insertBook(Book newBook) {
	}
}
