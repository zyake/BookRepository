package my.app.bookrepository.service;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;
import static org.mockito.Mockito.*;
import my.app.bookrepository.UT;
import my.app.bookrepository.domain.BookRepository;
import my.app.bookrepository.domain.Pager;

import org.junit.Test;
import org.junit.experimental.categories.Category;

@Category(UT.class)
public class DefaultPageServiceTest {

	@Test
	public void testEvaluate_normal_sameIndex() {
		// init
        BookRepository repository = mock(BookRepository.class);
		stub(repository.countBooks()).toReturn(10);

		DefaultPageService target = new DefaultPageService();
		target.repository = repository;

		// test
		Pager page = target.evaluate(10, 1, 2);

		// assert
		assertThat(page.toString(), is(new Pager(1, 2, 10).toString()));
	}

	@Test
	public void testEvaluate_normal_changeIndex() {
		// init
        BookRepository repository = mock(BookRepository.class);
		stub(repository.countBooks()).toReturn(1);

		DefaultPageService target = new DefaultPageService();
		target.repository = repository;

		// test
		Pager page = target.evaluate(10, 2, 1);

		// assert
		assertThat(page.toString(), is(new Pager(1, 1, 1).toString()));
	}
}
