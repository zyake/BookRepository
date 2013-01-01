package my.app.bookrepository.service;

import my.app.bookrepository.domain.Selection;
import my.app.bookrepository.domain.Book;

import java.util.List;

public interface RegisterService {

    List<Selection> listSelections();

    void registerBook(Book newBook);
}
