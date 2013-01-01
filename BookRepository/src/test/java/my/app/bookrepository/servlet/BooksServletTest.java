package my.app.bookrepository.servlet;

import my.app.bookrepository.UT;
import my.app.bookrepository.domain.Book;
import my.app.bookrepository.service.BookService;
import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Test;
import org.junit.experimental.categories.Category;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;

@Category(UT.class)
public class BooksServletTest {

	@Test
	public void testDoGet_normal_returnJSON() throws Exception {
		// init
		HttpServletRequest request = mock(HttpServletRequest.class);
		stub(request.getParameter("size")).toReturn("3");
		stub(request.getParameter("index")).toReturn("3");

		HttpServletResponse response = mock(HttpServletResponse.class);
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		PrintWriter writer = new PrintWriter(outputStream);
		stub(response.getWriter()).toReturn(writer);

		BookService bookService = mock(BookService.class);
        List<Book> books = Arrays.asList(new Book(), new Book());
		stub(bookService.listBooks(3, 3)).toReturn(books);

		BooksServlet target = new BooksServlet();
		target.service = bookService;
		target.mapper = mock(ObjectMapper.class);

		// test
		target.doGet(request, response);

		// assert
        verify(target.mapper).writeValue(writer, books);
	}
}
