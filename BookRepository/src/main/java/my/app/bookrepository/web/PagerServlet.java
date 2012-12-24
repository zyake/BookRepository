package my.app.bookrepository.web;

import java.io.IOException;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import my.app.bookrepository.domain.Page;
import my.app.bookrepository.domain.PageService;

import org.codehaus.jackson.map.ObjectMapper;

@WebServlet("/pager")
public class PagerServlet extends HttpServlet {

	@EJB
	PageService service;

	@Inject
	ObjectMapper mapper;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		int serverItemSize = Integer.parseInt(req.getParameter("serverItemSize"));
		int currentIndex = Integer.parseInt(req.getParameter("currentIndex"));
		int maxPerPageSize = Integer.parseInt(req.getParameter("maxPerPageSize"));

		Page page = service.evaluate(serverItemSize, currentIndex, maxPerPageSize);
		mapper.writeValue(resp.getWriter(), page);
	}
}
