package my.app.bookrepository.util;

import java.text.SimpleDateFormat;

import javax.annotation.ManagedBean;
import javax.enterprise.inject.Produces;

import org.codehaus.jackson.map.ObjectMapper;

@ManagedBean
public class ObjectMapperFactory {

	@Produces
	public ObjectMapper crateObjectMapper() {
		ObjectMapper mapper = new ObjectMapper();
		mapper.getSerializationConfig().setDateFormat(new SimpleDateFormat("yyyy-MM-dd"));

		return mapper;
	}
}
