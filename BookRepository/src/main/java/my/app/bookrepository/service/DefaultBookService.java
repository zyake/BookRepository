package my.app.bookrepository.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import my.app.bookrepository.domain.*;
import my.app.bookrepository.mappers.BookMapper;

@Stateless
@TransactionAttribute(TransactionAttributeType.REQUIRED)
public class DefaultBookService implements BookService {

	@Inject
    BookRepository repository;

	public List<Book> listBooks(int index, int size) {
        Pager page = new Pager(index, size);
        PageRange range = page.getRange();
        List<Book> books = repository.listBooks(range.getFrom(), range.getTo());

        return books;
	}

    @Override
    public List<Selection> listSelections() {
        List<String> genres = repository.listGenres();
        List<String> publishers = repository.listPublishers();
        List<String> ranks = repository.listRanks();

        List<Selection> selections = new ArrayList<>();
        Collections.addAll(selections,
                new Selection("genre", genres),
                new Selection("publisher", publishers),
                new Selection("rank", ranks)
        );

        return selections;
    }

    @Override
    public void registerBook(Book newBook) {
        repository.insertBook(newBook);
    }

    @Override
    public void update(Book book) {
        repository.updateBook(book);
    }
}
