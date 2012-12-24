package my.app.bookrepository.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.exceptions.PersistenceException;
import org.codehaus.jackson.map.ObjectMapper;

@WebFilter("/api/*")
public class ExceptionHandler implements Filter {

	private ObjectMapper mapper = new ObjectMapper();

	private static final Map<Class<? extends Exception>, String> MESSAGE_MAP;

	static {
		Map<Class<? extends Exception>, String> messageMap = new HashMap<Class<? extends Exception>, String>();
		messageMap.put(SQLException.class, "database access error");
		messageMap.put(PersistenceException.class, "database access error");
		MESSAGE_MAP = Collections.unmodifiableMap(messageMap);
	}

	public void init(FilterConfig filterConfig) throws ServletException {
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		try {
			chain.doFilter(request, response);
		} catch(Exception ex) {
			HttpServletResponse httpResponse = (HttpServletResponse) response;
			httpResponse.reset();
			httpResponse.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);

			PrintWriter writer = httpResponse.getWriter();
			HttpServletRequest httpRequest = (HttpServletRequest) request;
			String message = ex.getMessage();

			boolean useDefaultMessage = message == null && MESSAGE_MAP.containsKey(ex.getClass());
			if ( useDefaultMessage ) {
				message = MESSAGE_MAP.get(ex.getClass());
			}

			boolean messageNotFound = message == null;
			if ( messageNotFound ) {
				message = "internal server error";
			}

			ErrorResponse errorResponse = new ErrorResponse(httpRequest.getRequestURI(), message);
			mapper.writeValue(writer, errorResponse);
		}
	}

	public void destroy() {
	}

	private static class ErrorResponse {

		private String action;

		private String message;

		public ErrorResponse(String action, String message) {
			this.action = action;
			this.message = message;
		}

		public String getAction() {
			return action;
		}

		public String getMessage() {
			return message;
		}
	}
}
