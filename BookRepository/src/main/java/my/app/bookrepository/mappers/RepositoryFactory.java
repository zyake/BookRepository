package my.app.bookrepository.mappers;

import javax.annotation.ManagedBean;
import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.enterprise.context.RequestScoped;
import javax.enterprise.inject.Produces;
import javax.sql.DataSource;

import my.app.bookrepository.domain.BookRepository;
import org.apache.ibatis.logging.LogFactory;
import org.apache.ibatis.mapping.Environment;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.apache.ibatis.transaction.managed.ManagedTransactionFactory;

@ManagedBean
public class RepositoryFactory {

	@Resource(lookup="jdbc/DataSource")
	DataSource dataSource;

	SqlSessionFactory sessionFactory;

    @PostConstruct
    public void initialize() {
        Environment env = new Environment("bookRepository", new ManagedTransactionFactory(), dataSource);
        Configuration config = createConfiguration(env);

        this.sessionFactory = new SqlSessionFactoryBuilder().build(config);
    }

    @Produces
    @RequestScoped
	public BookRepository createBookRepository() {
		final SqlSession session = sessionFactory.openSession();
		BookMapper mapper = session.getMapper(BookMapper.class);
       AutoCloseable closableSession =  new AutoCloseable() {
            @Override
            public void close() throws Exception {
                session.close();
            }
        };

       return  new DefaultBookRepository(closableSession, mapper);
	}

    protected Configuration createConfiguration(Environment env) {
        Configuration config = new Configuration(env);
        config.setCacheEnabled(false);
        config.addMapper(BookMapper.class);

        return config;
    }
}
