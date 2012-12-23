package my.app.bookrepository.web;

import java.io.IOException;
import java.util.List;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import my.app.bookrepository.domain.Book;
import my.app.bookrepository.domain.BookService;

import org.codehaus.jackson.map.ObjectMapper;


@WebServlet("/books")
public class BooksServlet extends HttpServlet {

	@EJB
	BookService service;

	ObjectMapper mapper = new ObjectMapper();

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		int size = Integer.parseInt(req.getParameter("size"));
		int index = Integer.parseInt(req.getParameter("index"));
		List<Book> books = service.listBooks(index, size);

		mapper.writeValue(resp.getWriter(), books);
	}
}
