CREATE TABLE BookGenre(
  BookId int(11) NOT NULL,
  GenreId int(11) NOT NULL,
  PRIMARY KEY (BookId, GenreId)
) ;

CREATE TABLE Books (
  BookId int(11) NOT NULL AUTO_INCREMENT,
  BookName varchar(30) NOT NULL,
  BookUrl varchar(50) NOT NULL,
  PublisherId int(11) NOT NULL,
  Price int(11) NOT NULL,
  ParchaseDate date NOT NULL,
  ReadingStateId int(11) NOT NULL,
  Comment varchar(100) NOT NULL DEFAULT '',
  RankId int(11) NOT NULL,
  PRIMARY KEY (BookId),
  KEY PublisherId (PublisherId),
  KEY RankId (RankId),
  KEY ReadingStateId (ReadingStateId)
);

 CREATE TABLE Genres (
  GenreId int(11) NOT NULL AUTO_INCREMENT,
  GenreLabel varchar(10) NOT NULL,
  PRIMARY KEY (GenreId)
);

CREATE TABLE Publishers (
  PublisherId int(11) NOT NULL AUTO_INCREMENT,
  PublisherName varchar(50) NOT NULL,
  PRIMARY KEY (PublisherId)
) ;

CREATE TABLE Ranks (
  RankId int(11) NOT NULL AUTO_INCREMENT,
  RankLabel varchar(10) NOT NULL,
  PRIMARY KEY (RankId)
) ;

 CREATE TABLE ReadingStates (
  StateId int(11) NOT NULL AUTO_INCREMENT,
  StateLabel varchar(10) NOT NULL,
  PRIMARY KEY (StateId)
) ;