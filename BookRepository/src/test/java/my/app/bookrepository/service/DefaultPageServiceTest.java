package my.app.bookrepository.service;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;
import static org.mockito.Mockito.*;
import my.app.bookrepository.UT;
import my.app.bookrepository.domain.Page;
import my.app.bookrepository.mappers.PageMapper;
import my.app.bookrepository.service.DefaultPageService;

import org.junit.Test;
import org.junit.experimental.categories.Category;

@Category(UT.class)
public class DefaultPageServiceTest {

	@Test
	public void testEvaluate_normal_sameIndex() {
		// init
		PageMapper mapper = mock(PageMapper.class);
		stub(mapper.countItems()).toReturn(10);

		DefaultPageService target = new DefaultPageService();
		target.mapper = mapper;

		// test
		Page page = target.evaluate(10, 1, 2);

		// assert
		assertThat(page.toString(), is(new Page(1, 2, 10).toString()));
	}

	@Test
	public void testEvaluate_normal_changeIndex() {
		// init
		PageMapper mapper = mock(PageMapper.class);
		stub(mapper.countItems()).toReturn(1);

		DefaultPageService target = new DefaultPageService();
		target.mapper = mapper;

		// test
		Page page = target.evaluate(10, 2, 1);

		// assert
		assertThat(page.toString(), is(new Page(1, 1, 1).toString()));
	}
}
