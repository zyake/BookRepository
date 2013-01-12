package my.app.bookrepository.domain;

import java.util.Date;

public class Book {

	private int no;

    private int revision;

	private String name;

	private String url;

	private String publisher;

	private int price;

	private Date purchaseDate;

	private int readingState;

	private String comment;

	private String rank;

	private String genre;

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

    public int getRevision() {
        return revision;
    }

    public void setRevision(int revision) {
        this.revision = revision;
    }

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public Date getPurchaseDate() {
		return purchaseDate;
	}

	public void setPurchaseDate(Date purchaseDate) {
		this.purchaseDate = purchaseDate;
	}

	public int getReadingState() {
		return readingState;
	}

	public void setReadingState(int readingState) {
		this.readingState = readingState;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getRank() {
		return rank;
	}

	public void setRank(String rank) {
		this.rank = rank;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	@Override
	public String toString() {
		return String.format(
				"no=%s, name=%s, url=%s, genre=%s, parcharseDate=%s, price=%d, publisher=%s, rank=%s, readingState=%s",
				no, name, url, genre, purchaseDate, price, publisher, rank, readingState
		);
	}
}
