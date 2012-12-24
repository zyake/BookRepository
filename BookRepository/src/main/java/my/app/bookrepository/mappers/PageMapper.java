package my.app.bookrepository.mappers;

import org.apache.ibatis.annotations.Select;

public interface PageMapper {

	@Select("SELECT COUNT(no) FROM Books")
	int countItems();
}
