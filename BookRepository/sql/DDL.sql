CREATE TABLE Publishers(
	Name VARCHAR(30) PRIMARY KEY
);

CREATE TABLE ReadingStates(
	State VARCHAR(15) PRIMARY KEY
);

CREATE TABLE Ranks(
	Rank VARCHAR(10) PRIMARY KEY
);

CREATE TABLE Genres(
	Genre VARCHAR(15) PRIMARY KEY
);

CREATE TABLE Books(
	No INT PRIMARY KEY AUTO_INCREMENT,
	Name VARCHAR(50) NOT NULL,
	Url VARCHAR(200) NOT NULL,
	Publisher VARCHAR(30) NOT NULL,
	Price INT NOT NULL,
	ParchaseDate DATE NOT NULL,
	ReadingState VARCHAR(10) NOT NULL,
	Comment TEXT NOT NULL,
	Rank VARCHAR(15) NOT NULL,
	Genre VARCHAR(15) NOT NULL,
	FOREIGN KEY(Publisher) REFERENCES Publishers(Name),
	FOREIGN KEY(ReadingState) REFERENCES ReadingStates(State),
	FOREIGN KEY(Rank) REFERENCES Ranks(Rank),
	FOREIGN KEY(Genre) REFERENCES Genres(Genre)
);