package my.app.bookrepository.mappers;

import javax.annotation.ManagedBean;
import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.annotation.Resource;
import javax.enterprise.context.RequestScoped;
import javax.enterprise.inject.Produces;
import javax.sql.DataSource;

import my.app.bookrepository.domain.BookRepository;
import org.apache.ibatis.mapping.Environment;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.apache.ibatis.transaction.managed.ManagedTransactionFactory;

import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * MyBatisのMapperインターフェースの実装を提供するファクトリ。
 * ファクトリ内で{@link SqlSession}を開くため、
 * スコープを{@link @RequestScoped}としてリクエストのたびに
 * 新しいセッションを生成する。そのため、リクエストが終了するタイミングで
 * クローズする必要があるので、スコープを変えてはならない。
 */
@ManagedBean
@RequestScoped
public class MapperFactory {

    private static final Logger LOG = Logger.getLogger(MapperFactory.class.getName());

    private static final Object SESSION_FACTORY_LOCK = new Object();

    /**
     * アプリケーション全体で共有されるセッションファクトリのインスタンス。
     * 全てのリクエストで共有され、初めてMapperFactoryのインスタンスが作製された時のみ、
     * インスタンスを生成する。各スレッドから共有するので、必ずvolatileとし、
     * 可視性を保証すること。
     */
    private volatile static SqlSessionFactory sessionFactory;

	@Resource(lookup="jdbc/DataSource")
	DataSource dataSource;

    SqlSession session;

    /**
     * アプリケーション起動から初めて呼ばれたタイミングで、
     * {@link SqlSessionFactory}のインスタンスを生成する。
     * 2回目以降の呼び出しでは、全てのリクエストで、
     * 1回目に生成された{@link SqlSessionFactory}のインスタンスを使用する。
     */
    @PostConstruct
    public void initialize() {
        if ( sessionFactory == null ) {
            synchronized ( SESSION_FACTORY_LOCK ) {
                if ( sessionFactory == null ) {
                   sessionFactory = createSessionFactory();
                }
            }
        }
    }

    @Produces
    @RequestScoped
    public BookMapper createMapper() {
        session = sessionFactory.openSession();
        BookMapper mapper = session.getMapper(BookMapper.class);

        return mapper;
    }

    @PreDestroy
    public void destroy() {
        boolean hasSession = session != null;
        if ( hasSession ) {
            session.close();
        }
    }

    protected SqlSessionFactory createSessionFactory() {
        Environment env = new Environment("bookRepository", new ManagedTransactionFactory(), dataSource);
        Configuration config = new Configuration(env);
        config.setCacheEnabled(false);
        config.addMapper(BookMapper.class);

        return new SqlSessionFactoryBuilder().build(config);
    }
}
