CREATE TABLE Publishers(
	Name VARCHAR(30) PRIMARY KEY
);

CREATE TABLE Ranks(
	Rank VARCHAR(10) PRIMARY KEY
);

CREATE TABLE Genres(
	Genre VARCHAR(15) PRIMARY KEY
);

CREATE TABLE Books(
	No INT PRIMARY KEY AUTO_INCREMENT,
	/* 書籍情報更新時のリビジョン番号。更新処理が実行されるたびにインクリメントされる。 */
	Revision INT NOT NULL,
	Name VARCHAR(50) NOT NULL,
	Url VARCHAR(200) NOT NULL,
	Publisher VARCHAR(30) NOT NULL,
	Price INT NOT NULL,
	PurchaseDate DATE NOT NULL,
	ReadingState INT NOT NULL CHECK(ReadingState >= 0 AND 100 >= ReadingState),
	Comment TEXT NOT NULL,
	Rank VARCHAR(15) NOT NULL,
	Genre VARCHAR(15) NOT NULL,
	FOREIGN KEY(Publisher) REFERENCES Publishers(Name),
	FOREIGN KEY(Rank) REFERENCES Ranks(Rank),
	FOREIGN KEY(Genre) REFERENCES Genres(Genre)
);