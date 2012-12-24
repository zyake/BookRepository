package my.app.bookrepository.domain;

public class Page {

	private int serverItemSize;

	private int currentIndex;

	private int maxPerPageSize;

	public Page(int currentIndex, int maxPerPageSize) {
		this(currentIndex, maxPerPageSize, 0);
	}

	public Page(int currentIndex, int maxPerPageSize, int serverItemSize) {
		this.serverItemSize = serverItemSize;
		this.currentIndex = currentIndex;
		this.maxPerPageSize = maxPerPageSize;

		boolean invalidServerItemSize = serverItemSize < 0;
		if ( invalidServerItemSize ) {
			throw new DomainException("server item size must be greater than  or equal to 0: server item size=" + serverItemSize);
		}

		boolean invalidCurrentIndex = currentIndex <= 0;
		if ( invalidCurrentIndex ) {
			throw new DomainException("current index must be greater than 0: current index=" + currentIndex);
		}

		boolean invalidMaxPerPageSize = maxPerPageSize < 0;
		if ( invalidMaxPerPageSize ) {
			throw new DomainException("max per page size must be greater than or equal to 0: max per page size=" + maxPerPageSize);
		}
	}

	public int getServerItemSize() {
		return serverItemSize;
	}

	public int getCurrentIndex() {
		return currentIndex;
	}

	public int getMaxPerPageSize() {
		return maxPerPageSize;
	}

	public PageRange getRange() {
		int from =(currentIndex - 1) * maxPerPageSize + 1;
		boolean invalidFrom = from <= 0;
		if ( invalidFrom ) {
			throw new DomainException("from value must be greater or equal than 1: from=" +  from);
		}

		int to = currentIndex  * maxPerPageSize;
		boolean invalidTo = to <= 0 || to < from;
		if ( invalidTo ) {
			throw new DomainException("to value must be greater or equal than 1 and greater than from: from=" + from + ", to=" + to);
		}

		return new PageRange(from, to);
	}

	public boolean requireIndexChange(int newServerItemSize) {
		boolean mayRequireIndexChange = serverItemSize > newServerItemSize;
		if ( !mayRequireIndexChange ) {
			return false;
		}

		PageRange range = getRange();
		boolean exceedRange = range.getFrom() > newServerItemSize || range.getTo() > newServerItemSize;

		return exceedRange;
	}

	public static int getAvailableMaxIndex(int maxPerPageSize, int newServerItemSize) {
		double dPageSize = (double) newServerItemSize / (double) maxPerPageSize;
		double ceilPageSize = Math.ceil(dPageSize);

		return (int) ceilPageSize;
	}

	@Override
	public String toString() {
		return "{serverItemSize=" + serverItemSize + ",currentIndex=" + currentIndex + ", maxPerPageSize=" + maxPerPageSize + "}";
	}
}
