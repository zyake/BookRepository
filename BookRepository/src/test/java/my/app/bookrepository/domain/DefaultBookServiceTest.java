package my.app.bookrepository.domain;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;

import my.app.bookrepository.UT;
import my.app.bookrepository.mappers.BookMapper;

import org.junit.Test;
import org.junit.experimental.categories.Category;

@Category(UT.class)
public class DefaultBookServiceTest {


	@Test
	public void testListBooks_normal_returnValue() {
		// init
		BookMapper mapper = mock(BookMapper.class);
		stub(mapper.listBooks(1, 2)).toReturn(Arrays.asList(
				new Book(),
				new Book()
		));

		DefaultBookService target = new DefaultBookService();
		target.mapper = mapper;

		// test
		List<Book> books = target.listBooks(1, 2);

		// test
		assertThat(books.size(), is(2));
	}
	@Test
	public void testListBooks_normal_index1size2() {
		// init
		BookMapper mapper = mock(BookMapper.class);
		stub(mapper.listBooks(1, 2)).toReturn(Arrays.asList(
				new Book(),
				new Book()
		));

		DefaultBookService target = new DefaultBookService();
		target.mapper = mapper;

		// test
		target.listBooks(1, 2);

		// test
		verify(mapper).listBooks(1, 2);
	}

	@Test
	public void testListBooks_normal_index2size2() {
		// init
		BookMapper mapper = mock(BookMapper.class);
		stub(mapper.listBooks(3, 4)).toReturn(Arrays.asList(
				new Book(),
				new Book()
		));

		DefaultBookService target = new DefaultBookService();
		target.mapper = mapper;

		// test
		target.listBooks(2, 2);

		// test
		verify(mapper).listBooks(3, 4);
	}

	@Test
	public void testListBooks_normal_index3size3() {
		// init
		BookMapper mapper = mock(BookMapper.class);
		stub(mapper.listBooks(7, 9)).toReturn(Arrays.asList(
				new Book(),
				new Book(),
				new Book()
		));

		DefaultBookService target = new DefaultBookService();
		target.mapper = mapper;

		// test
		target.listBooks(3, 3);

		// test
		verify(mapper).listBooks(7, 9);
	}


	@Test(expected=DomainException.class)
	public void testListBooks_error_fromLessThan1() {
		DefaultBookService target = new DefaultBookService();
		target.listBooks(0, 3);
	}

	@Test(expected=DomainException.class)
	public void testListBooks_error_toLessThan1() {
		DefaultBookService target = new DefaultBookService();
		target.listBooks(-1, 0);
	}
}
