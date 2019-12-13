package my.app.bookrepository.service;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import my.app.bookrepository.domain.BookRepository;
import my.app.bookrepository.domain.Pager;

@Stateless
public class DefaultPagerService implements PagerService {

	@Inject
    BookRepository repository;

	@TransactionAttribute(TransactionAttributeType.REQUIRED)
	public Pager evaluate(int serverItemSize, int currentIndex, int maxPerPageSize) {
        Pager currentPage = new Pager(currentIndex, maxPerPageSize, serverItemSize);
        int newServerItemSize = repository.countBooks();
        if ( !currentPage.requireIndexChange(newServerItemSize) ) {
            return new Pager(currentIndex, maxPerPageSize, newServerItemSize);
        }

        if (currentIndex < 0) {
            throw new RuntimeException("HOGE!");
        }

        int maxIndex = Pager.getAvailableMaxIndex(maxPerPageSize, newServerItemSize);
        return new Pager(maxIndex, maxPerPageSize, newServerItemSize);
	}
}
