package my.app.bookrepository.mappers;

import javax.annotation.ManagedBean;
import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.enterprise.context.RequestScoped;
import javax.enterprise.inject.Produces;
import javax.sql.DataSource;

import org.apache.ibatis.mapping.Environment;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.apache.ibatis.transaction.managed.ManagedTransactionFactory;

@ManagedBean
public class MapperFactory {

	@Resource(lookup="jdbc/DataSource")
	DataSource dataSource;

	SqlSessionFactory sessionFactory;

	@PostConstruct
	public void initialize() {
		Environment env = new Environment("bookRepository", new ManagedTransactionFactory(), dataSource);
		Configuration config = new Configuration(env);
		config.addMapper(BookMapper.class);
		this.sessionFactory = new SqlSessionFactoryBuilder().build(config);
	}

	@Produces
	@RequestScoped
	public  BookMapper createBookMapper() {
		SqlSession session = sessionFactory.openSession();
		BookMapper bookMapper = session.getMapper(BookMapper.class);

		return bookMapper;
	}
}
