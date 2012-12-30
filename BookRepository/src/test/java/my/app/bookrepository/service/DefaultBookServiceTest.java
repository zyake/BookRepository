package my.app.bookrepository.service;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;

import my.app.bookrepository.UT;
import my.app.bookrepository.domain.Book;
import my.app.bookrepository.domain.BookRepository;
import my.app.bookrepository.mappers.BookMapper;

import org.junit.Test;
import org.junit.experimental.categories.Category;

@Category(UT.class)
public class DefaultBookServiceTest {


	@Test
	public void testListBooks_normal_returnValue() {
		// init
        BookRepository repository = mock(BookRepository.class);
		stub(repository.listBooks(1, 2)).toReturn(Arrays.asList(
				new Book(),
				new Book()
		));

		DefaultBookService target = new DefaultBookService();
		target.repository = repository;

		// test
		List<Book> books = target.listBooks(1, 2);

		// test
		assertThat(books.size(), is(2));
	}
}
