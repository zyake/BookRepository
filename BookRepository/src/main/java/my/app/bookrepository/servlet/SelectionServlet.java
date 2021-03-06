package my.app.bookrepository.servlet;


import my.app.bookrepository.domain.Selection;
import my.app.bookrepository.service.BookService;
import org.codehaus.jackson.map.ObjectMapper;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet("/api/selection")
public class SelectionServlet extends HttpServlet {

    @Inject
    ObjectMapper mapper;

    @EJB
    BookService service;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        List<Selection> selections = service.listSelections();
        Map<String, List<Selection>> map = new HashMap<>();
        map.put("selections", selections);
        mapper.writeValue(resp.getWriter(), map);
    }
}
