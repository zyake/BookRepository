package my.app.bookrepository.servlet;


import my.app.bookrepository.domain.Selection;
import my.app.bookrepository.service.RegisterService;
import my.app.bookrepository.util.StringUtils;
import my.app.bookrepository.domain.Book;
import my.lib.net.mime.MultipartMessage;
import my.lib.net.mime.MultipartMessageParser;
import my.lib.net.mime.ofm.MultipartMessageMapper;
import org.codehaus.jackson.map.ObjectMapper;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet("/api/register")
public class RegisterServlet extends HttpServlet {

    @Inject
    ObjectMapper mapper;

    @EJB
    RegisterService service;

    @Inject
    MultipartMessageParser messageParser;

    @Inject
    @Named("register")
    MultipartMessageMapper messageMapper;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        List<Selection> selections = service.listSelections();
        Map<String, List<Selection>> map = new HashMap<>();
        map.put("selections", selections);
        mapper.writeValue(resp.getWriter(), map);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String msgBody = StringUtils.readFully(req.getReader());
        MultipartMessage multipartMessage = messageParser.parseMessage(msgBody);

        Book book = new Book();
        messageMapper.mapToObject(multipartMessage, book);
        service.registerBook(book);
    }
}
