package my.app.bookrepository.servlet;

import my.app.bookrepository.domain.Selection;
import my.app.bookrepository.service.BookService;
import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Test;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class SelectionServletTest {

    @Test
    public void testDoGet_normal() throws IOException, ServletException {
        // init
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        OutputStream outputStream = new ByteArrayOutputStream();
        PrintWriter writer = new PrintWriter(outputStream);
        when(response.getWriter()).thenReturn(writer);

        List<Selection> selections = new ArrayList<>();
        Collections.addAll(selections,
                new Selection("test1", Arrays.asList("A", "B", "C")),
                new Selection("test2", Arrays.asList("D", "E", "F"))
         );
        BookService service = mock(BookService.class);
        when(service.listSelections()).thenReturn(selections);

        SelectionServlet target = new SelectionServlet();
        target.service = service;
        target.mapper = new ObjectMapper();

        // test
        target.doGet(request, response);

        // assert
        System.out.println(outputStream.toString());
        assertThat(outputStream.toString(),
                is("{\"selections\":[{\"key\":\"test1\",\"list\":[\"A\",\"B\",\"C\"]},{\"key\":\"test2\",\"list\":[\"D\",\"E\",\"F\"]}]}"));
    }
}
