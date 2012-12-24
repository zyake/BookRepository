package my.app.bookrepository.domain;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import my.app.bookrepository.orm.mappers.PageMapper;

@Stateless
public class DefaultPageService implements PageService {

	@Inject
	PageMapper mapper;

	@TransactionAttribute(TransactionAttributeType.REQUIRED)
	public Page evaluate(int serverItemSize, int currentIndex, int maxPerPageSize) {
		Page currentPage = new Page(currentIndex, maxPerPageSize, serverItemSize);
		int newServerItemSize = mapper.countItems();
		if ( !currentPage.requireIndexChange(newServerItemSize) ) {
			return new Page(currentIndex, maxPerPageSize, newServerItemSize);
		}

		int maxIndex = Page.getAvailableMaxIndex(maxPerPageSize, newServerItemSize);
		return new Page(maxIndex, maxPerPageSize, newServerItemSize);
	}
}
