package my.app.bookrepository.servlet;

import java.io.IOException;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import my.app.bookrepository.domain.Pager;
import my.app.bookrepository.service.PageService;

import org.codehaus.jackson.map.ObjectMapper;

@WebServlet("/api/pager")
public class PagerServlet extends HttpServlet {

	@EJB
	PageService service;

	@Inject
	ObjectMapper mapper;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		validateRequest(req);

		String serverItemSizeText = req.getParameter("serverItemSize");
		int serverItemSize = Integer.parseInt(serverItemSizeText);

		String currentIndexText = req.getParameter("currentIndex");
		int currentIndex = Integer.parseInt(currentIndexText);

		String maxPerPageSizeText = req.getParameter("maxPerPageSize");
		int maxPerPageSize = Integer.parseInt(maxPerPageSizeText);

		Pager page = service.evaluate(serverItemSize, currentIndex, maxPerPageSize);
		mapper.writeValue(resp.getWriter(), page);
	}

	protected void validateRequest(HttpServletRequest request) throws ServletException {
		String serverItemSizeText = request.getParameter("serverItemSize");
		if ( serverItemSizeText == null ) {
			throw new ServletException("serverItemSize was not specified");
		}

		String currentIndexText = request.getParameter("currentIndex");
		if ( currentIndexText == null ) {
			throw new ServletException("currentIndex was not specified");
		}

		String maxPerPageSizeText = request.getParameter("maxPerPageSize");
		if ( maxPerPageSizeText == null ) {
			throw new ServletException("maxPerPageSize was not specified");
		}
	}
}
