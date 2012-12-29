package my.app.bookrepository.servlet;

import static org.mockito.Matchers.*;
import static org.mockito.Mockito.*;

import java.io.PrintWriter;

import javax.servlet.FilterChain;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Test;

public class ExceptionHandlerTest {

	@Test
	public void testDoFilter_normal_requestHandlingSuccess() throws Exception {
		// init
		ServletRequest request = mock(ServletRequest.class);
		ServletResponse response = mock(ServletResponse.class);
		FilterChain filterChain = mock(FilterChain.class);
		ExceptionHandler target = new ExceptionHandler();

		// test
		target.doFilter(request, response, filterChain);

		// assert
		verify(filterChain).doFilter(request, response);
	}

	@Test
	public void testDoFilter_error_setStatusCode() throws Exception {
		// init
		HttpServletRequest request = mock(HttpServletRequest.class);
		HttpServletResponse response = mock(HttpServletResponse.class);
		stub(response.getWriter()).toReturn(mock(PrintWriter.class));

		FilterChain filterChain = mock(FilterChain.class);
		doThrow(new RuntimeException()).when(filterChain).doFilter(request, response);

		ExceptionHandler target = new ExceptionHandler();

		// test
		target.doFilter(request, response, filterChain);

		// verify
		verify(response).setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
	}

	@Test
	public void testDoFilter_error_resetResponse() throws Exception {
		// init
		HttpServletRequest request = mock(HttpServletRequest.class);
		HttpServletResponse response = mock(HttpServletResponse.class);
		stub(response.getWriter()).toReturn(mock(PrintWriter.class));

		FilterChain filterChain = mock(FilterChain.class);
		doThrow(new RuntimeException()).when(filterChain).doFilter(request, response);

		ExceptionHandler target = new ExceptionHandler();

		// test
		target.doFilter(request, response, filterChain);

		// verify
		verify(response).reset();
	}

	@Test
	public void testDoFilter_error_writeErrorResponse() throws Exception {
		// init
		HttpServletRequest request = mock(HttpServletRequest.class);
		HttpServletResponse response = mock(HttpServletResponse.class);
		stub(response.getWriter()).toReturn(mock(PrintWriter.class));

		FilterChain filterChain = mock(FilterChain.class);
		doThrow(new RuntimeException()).when(filterChain).doFilter(request, response);

		ObjectMapper mapper = mock(ObjectMapper.class);

		ExceptionHandler target = new ExceptionHandler();
		target.mapper = mapper;

		// test
		target.doFilter(request, response, filterChain);

		// verify
		verify(mapper).writeValue(
				any(PrintWriter.class),
				any(ExceptionHandler.ErrorResponse.class));
	}
}
