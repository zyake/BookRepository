package my.app.bookrepository.domain;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;
import my.app.bookrepository.UT;

import org.junit.Test;
import org.junit.experimental.categories.Category;

@Category(UT.class)
public class PagerTest {

	@Test
	public void testGetRange_normal_index1size2() {
		Pager target = new Pager(1, 2);
		PageRange range = target.getRange();
		assertThat(range.toString(), is(new PageRange(1, 2).toString()));
	}

	@Test
	public void testGetRange_normal_index2size2() {
		Pager target = new Pager(2, 2);
		PageRange range = target.getRange();
		assertThat(range.toString(), is(new PageRange(3, 4).toString()));
	}

	@Test
	public void testGetRange_normal_index3size3() {
		Pager target = new Pager(3, 3);
		PageRange range = target.getRange();
		assertThat(range.toString(), is(new PageRange(7, 9).toString()));
	}

	@Test(expected=DomainException.class)
	public void testGetRange_error_fromLessThan1() {
		Pager target = new Pager(0, 3);
		target.getRange();
	}

	@Test(expected=DomainException.class)
	public void testGetRange_error_toLessThan1() {
		Pager target = new Pager(-1, 0);
		target.getRange();
	}

	@Test
	public void testRequireIndexChange_normal_nochange() {
		Pager page = new Pager(1, 2, 2);
		boolean requireIndexChange = page.requireIndexChange(2);
		assertThat(requireIndexChange, is(false));
	}

	@Test
	public void testRequireIndexChange_normal_extendSize() {
		Pager page = new Pager(1, 2, 2);
		boolean requireIndexChange = page.requireIndexChange(5);
		assertThat(requireIndexChange, is(false));
	}

	@Test
	public void testRequireIndexChange_normal_reduceSizeButNotRequireChange() {
		Pager page = new Pager(1, 2, 5);
		boolean requireIndexChange = page.requireIndexChange(4);
		assertThat(requireIndexChange, is(false));
	}

	@Test
	public void testRequireIndexChange_normal_reduceSizeAndFromExceed() {
		Pager page = new Pager(5, 1, 5);
		boolean requireIndexChange = page.requireIndexChange(4);
		assertThat(requireIndexChange, is(true));
	}

	@Test
	public void testRequireIndexChange_normal_reduceSizeAndToExceed() {
		Pager page = new Pager(2, 3, 6);
		boolean requireIndexChange = page.requireIndexChange(4);
		assertThat(requireIndexChange, is(true));
	}

	@Test
	public void testGetAvailableMaxIndex_normal_hasNoRest() {
		int availableMaxIndex = Pager.getAvailableMaxIndex(3, 6);
		assertThat(availableMaxIndex, is(2));
	}

	@Test
	public void testGetAvailableMaxIndex_normal_hasRest() {
		int availableMaxIndex = Pager.getAvailableMaxIndex(3, 5);
		assertThat(availableMaxIndex, is(2));
	}
}
