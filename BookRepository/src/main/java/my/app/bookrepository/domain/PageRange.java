package my.app.bookrepository.domain;

public class PageRange {

	private int to;

	private int from;

	public PageRange(int from, int to) {
		this.from = from;
		this.to = to;
	}

	public int getFrom() {
		return from;
	}

	public int getTo() {
		return to;
	}

	@Override
	public String toString() {
		return "{from="+ from + ", to=" + to + "}";
	}
}
