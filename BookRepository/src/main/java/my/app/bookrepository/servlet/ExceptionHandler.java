package my.app.bookrepository.servlet;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;

@WebFilter("/api/*")
public class ExceptionHandler implements Filter {

	private static final Logger LOG = Logger.getLogger(ExceptionHandler.class.getName());

	private static final Map<Class<? extends Exception>, String> MESSAGE_MAP;

	ObjectMapper mapper = new ObjectMapper();

	static {
		Map<Class<? extends Exception>, String> messageMap = new HashMap<Class<? extends Exception>, String>();
		messageMap.put(SQLException.class, "database access error");
		MESSAGE_MAP = Collections.unmodifiableMap(messageMap);
	}

	public void init(FilterConfig filterConfig) throws ServletException {
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		try {
			chain.doFilter(request, response);
		} catch(Exception ex) {
			if ( LOG.isLoggable(Level.SEVERE) ) {
				LOG.severe("request handling failed: " + ex);
			}

			configResponse(response);

			ErrorResponse errorResponse = createErrorResponse(request, ex);
			mapper.writeValue(response.getWriter(), errorResponse);
		}
	}

	protected ErrorResponse createErrorResponse(ServletRequest request, Exception ex) {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		String message = getErrorMessage(ex);
		ErrorResponse errorResponse = new ErrorResponse(httpRequest.getRequestURI(), message);

		return errorResponse;
	}

	protected HttpServletResponse configResponse(ServletResponse response) {
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		httpResponse.reset();
		httpResponse.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);

		return httpResponse;
	}

	protected String getErrorMessage(Exception ex) {
		String message = ex.getMessage();

		boolean useSpecificMessage = message == null && MESSAGE_MAP.containsKey(ex.getClass());
		if ( useSpecificMessage ) {
			message = MESSAGE_MAP.get(ex.getClass());
		}

		boolean useDefaultMessage = message == null;
		if ( useDefaultMessage ) {
			message = "internal server error";
		}
		return message;
	}

	public void destroy() {
	}

	class ErrorResponse {

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
