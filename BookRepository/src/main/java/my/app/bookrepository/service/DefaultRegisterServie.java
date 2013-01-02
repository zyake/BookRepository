package my.app.bookrepository.service;

import my.app.bookrepository.domain.BookRepository;
import my.app.bookrepository.domain.Selection;
import my.app.bookrepository.domain.Book;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Stateless
public class DefaultRegisterServie implements RegisterService {

    @Inject
    BookRepository repository;

    @Override
    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public List<Selection> listSelections() {
        try {
            List<String> genres = repository.listGenres();
            List<String> publishers = repository.listPublishers();
            List<String> ranks = repository.listRanks();

            List<Selection> selections = new ArrayList<>();
            Collections.addAll(selections,
                new Selection("genres", genres),
                new Selection("publishers", publishers),
                new Selection("ranks", ranks)
            );

            return selections;
        } finally {
            repository.close();
        }
    }

    @Override
    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public void registerBook(Book newBook) {
        try {
            repository.insertBook(newBook);
        } finally {
            repository.close();
        }
    }
}
