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
		int from =(index - 1) * size + 1;
		boolean fromIsInvalid = from <= 0;
		if ( fromIsInvalid ) {
			throw new DomainException("from value must be greater or equal than 1: from=" +  from);
		}

		int to = index  * size;
		boolean toIsInvalid = to <= 0 || to < from;
		if ( toIsInvalid ) {
			throw new DomainException("to value must be greater or equal than 1 and greater than from: from=" + from + ", to=" + to);
		}

		List<Book> books = mapper.listBooks(from, to);

		return books;
	}

	@TransactionAttribute(TransactionAttributeType.REQUIRED)
	public void insertBook(Book newBook) {

	}
}
