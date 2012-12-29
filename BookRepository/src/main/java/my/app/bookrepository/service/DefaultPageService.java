package my.app.bookrepository.service;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import my.app.bookrepository.domain.Pager;
import my.app.bookrepository.mappers.PageMapper;

@Stateless
public class DefaultPageService implements PageService {

	@Inject
	PageMapper mapper;

	@TransactionAttribute(TransactionAttributeType.REQUIRED)
	public Pager evaluate(int serverItemSize, int currentIndex, int maxPerPageSize) {
		Pager currentPage = new Pager(currentIndex, maxPerPageSize, serverItemSize);
		int newServerItemSize = mapper.countItems();
		if ( !currentPage.requireIndexChange(newServerItemSize) ) {
			return new Pager(currentIndex, maxPerPageSize, newServerItemSize);
		}

		int maxIndex = Pager.getAvailableMaxIndex(maxPerPageSize, newServerItemSize);
		return new Pager(maxIndex, maxPerPageSize, newServerItemSize);
	}
}
