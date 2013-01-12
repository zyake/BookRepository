package my.app.bookrepository.servlet;


import my.app.bookrepository.domain.Book;
import my.app.bookrepository.service.BookService;
import my.app.bookrepository.util.StringUtils;
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

@WebServlet("/api/register")
public class RegisterServlet extends HttpServlet {

    @Inject
    ObjectMapper mapper;

    @EJB
    BookService service;

    @Inject
    MultipartMessageParser messageParser;

    @Inject
    @Named("register")
    MultipartMessageMapper messageMapper;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String msgBody = StringUtils.readFully(req.getReader());
        MultipartMessage multipartMessage = messageParser.parseMessage(msgBody);

        Book book = new Book();
        messageMapper.mapToObject(multipartMessage, book);
        service.registerBook(book);
    }
}
