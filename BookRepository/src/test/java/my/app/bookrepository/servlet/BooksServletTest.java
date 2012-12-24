package my.app.bookrepository.servlet;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import java.io.ByteArrayOutputStream;
import java.io.PrintWriter;
import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import my.app.bookrepository.UT;
import my.app.bookrepository.domain.Book;
import my.app.bookrepository.service.BookService;
import my.app.bookrepository.servlet.BooksServlet;

import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Test;
import org.junit.experimental.categories.Category;

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
		stub(bookService.listBooks(3, 3)).toReturn(Arrays.asList(
				new Book(),
				new Book()
		));

		BooksServlet target = new BooksServlet();
		target.service = bookService;
		target.mapper = new ObjectMapper();

		// test
		target.doGet(request, response);

		// assert
		assertThat(outputStream.toString(),
				is("[{\"no\":0,\"name\":null,\"url\":null,\"publisher\":null,\"price\":0,\"parchaseDate\":null,\"readingState\":null,\"comment\":null,\"rank\":null,\"genre\":null}," +
				"{\"no\":0,\"name\":null,\"url\":null,\"publisher\":null,\"price\":0,\"parchaseDate\":null,\"readingState\":null,\"comment\":null,\"rank\":null,\"genre\":null}]"));
	}
}
