package my.app.bookrepository.datasource;

import javax.annotation.ManagedBean;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;
import javax.sql.DataSource;

import com.mysql.jdbc.jdbc2.optional.MysqlConnectionPoolDataSource;


@ManagedBean
public class DataSourceFactory {

	@Produces
	@ApplicationScoped
	public DataSource createDataSource() {
		MysqlConnectionPoolDataSource dataSource = new MysqlConnectionPoolDataSource();
		dataSource.setUrl("jdbc:mysql://localhost:3306/bookrepository");
		dataSource.setUser("AppServer");
		dataSource.setPassword("n1k1jkai");

		return dataSource;
	}
}
