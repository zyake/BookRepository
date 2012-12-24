package my.app.bookrepository.domain;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;
import my.app.bookrepository.UT;

import org.junit.Test;
import org.junit.experimental.categories.Category;

@Category(UT.class)
public class PageTest {

	@Test
	public void testGetRange_normal_index1size2() {
		Page target = new Page(1, 2);
		PageRange range = target.getRange();
		assertThat(range.toString(), is(new PageRange(1, 2).toString()));
	}

	@Test
	public void testGetRange_normal_index2size2() {
		Page target = new Page(2, 2);
		PageRange range = target.getRange();
		assertThat(range.toString(), is(new PageRange(3, 4).toString()));
	}

	@Test
	public void testGetRange_normal_index3size3() {
		Page target = new Page(3, 3);
		PageRange range = target.getRange();
		assertThat(range.toString(), is(new PageRange(7, 9).toString()));
	}

	@Test(expected=DomainException.class)
	public void testGetRange_error_fromLessThan1() {
		Page target = new Page(0, 3);
		target.getRange();
	}

	@Test(expected=DomainException.class)
	public void testGetRange_error_toLessThan1() {
		Page target = new Page(-1, 0);
		target.getRange();
	}

	@Test
	public void testRequireIndexChange_normal_nochange() {
		Page page = new Page(1, 2, 2);
		boolean requireIndexChange = page.requireIndexChange(2);
		assertThat(requireIndexChange, is(false));
	}

	@Test
	public void testRequireIndexChange_normal_extendSize() {
		Page page = new Page(1, 2, 2);
		boolean requireIndexChange = page.requireIndexChange(5);
		assertThat(requireIndexChange, is(false));
	}

	@Test
	public void testRequireIndexChange_normal_reduceSizeButNotRequireChange() {
		Page page = new Page(1, 2, 5);
		boolean requireIndexChange = page.requireIndexChange(4);
		assertThat(requireIndexChange, is(false));
	}

	@Test
	public void testRequireIndexChange_normal_reduceSizeAndFromExceed() {
		Page page = new Page(5, 1, 5);
		boolean requireIndexChange = page.requireIndexChange(4);
		assertThat(requireIndexChange, is(true));
	}

	@Test
	public void testRequireIndexChange_normal_reduceSizeAndToExceed() {
		Page page = new Page(2, 3, 6);
		boolean requireIndexChange = page.requireIndexChange(4);
		assertThat(requireIndexChange, is(true));
	}

	@Test
	public void testGetAvailableMaxIndex_normal_hasNoRest() {
		int availableMaxIndex = Page.getAvailableMaxIndex(3, 6);
		assertThat(availableMaxIndex, is(2));
	}

	@Test
	public void testGetAvailableMaxIndex_normal_hasRest() {
		int availableMaxIndex = Page.getAvailableMaxIndex(3, 5);
		assertThat(availableMaxIndex, is(2));
	}
}
