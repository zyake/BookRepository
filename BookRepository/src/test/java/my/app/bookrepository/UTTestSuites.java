package my.app.bookrepository;

import my.app.bookrepository.domain.DefaultBookServiceTest;
import my.app.bookrepository.web.BooksServletTest;

import org.junit.experimental.categories.Categories;
import org.junit.experimental.categories.Categories.ExcludeCategory;
import org.junit.experimental.categories.Categories.IncludeCategory;
import org.junit.runner.RunWith;
import org.junit.runners.Suite.SuiteClasses;

@RunWith(Categories.class)
@IncludeCategory(UT.class)
@ExcludeCategory(IT.class)
@SuiteClasses({BooksServletTest.class, DefaultBookServiceTest.class})
public class UTTestSuites {
}
