package my.app.bookrepository.domain;

import java.util.Date;

public class Book {

	private int no;

	private String name;

	private String url;

	private String publishers;

	private int price;

	private Date purchaseDate;

	private int readingStates;

	private String comment;

	private String ranks;

	private String genres;

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
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
		return publishers;
	}

	public void setPublisher(String publisher) {
		this.publishers = publisher;
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
		return readingStates;
	}

	public void setReadingState(int readingState) {
		this.readingStates = readingState;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getRank() {
		return ranks;
	}

	public void setRank(String rank) {
		this.ranks = rank;
	}

	public String getGenre() {
		return genres;
	}

	public void setGenre(String genre) {
		this.genres = genre;
	}

	@Override
	public String toString() {
		return String.format(
				"no=%s, name=%s, url=%s, genre=%s, parcharseDate=%s, price=%d, publisher=%s, rank=%s, readingState=%s",
				no, name, url, genres, purchaseDate, price, publishers, ranks, readingStates
		);
	}
}
