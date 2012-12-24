package my.app.bookrepository.web;

import java.io.IOException;
import java.util.List;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import my.app.bookrepository.domain.Book;
import my.app.bookrepository.domain.BookService;

import org.codehaus.jackson.map.ObjectMapper;

@WebServlet("/api/books")
public class BooksServlet extends HttpServlet {

	@EJB
	BookService service;

	@Inject
	ObjectMapper mapper;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String sizeText = req.getParameter("size");
		if ( sizeText == null ) {
			throw new ServletException("size was not specified");
		}
		int size = Integer.parseInt(sizeText);

		String indexText = req.getParameter("index");
		if ( indexText == null ) {
			throw new ServletException("index was not specified");
		}
		int index = Integer.parseInt(indexText);

		List<Book> books = service.listBooks(index, size);

		mapper.writeValue(resp.getWriter(), books);
	}
}
