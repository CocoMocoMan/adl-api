DROP DATABASE IF EXISTS adldb;
CREATE DATABASE IF NOT EXISTS adldb;
USE adldb;
CREATE TABLE IF NOT EXISTS User (
	UserID 	 int PRIMARY KEY auto_increment,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email         VARCHAR(50),
    Biography  text,
    Image        VARCHAR(100),
    AccessToken  VARCHAR(100),
    Active		   boolean,
    CreatedDate datetime,
    ModifiedDate datetime
);
CREATE TABLE IF NOT EXISTS Community (
	CommunityID int PRIMARY KEY auto_increment,
    Name VARCHAR(50),
	Description text, 
	OwnerID int NOT NULL,
    Image        VARCHAR(100),
	Active		   boolean,
    CreatedDate datetime,
    ModifiedDate datetime,
	FOREIGN KEY(OwnerID) REFERENCES User(UserID) 
);
CREATE TABLE IF NOT EXISTS CommunityUser (
	CommunityUserID int PRIMARY KEY auto_increment,
    CommunityID int NOT NULL,
    UserID int NOT NULL,
    Active		   boolean,
    CreatedDate datetime,
    ModifiedDate datetime,
    FOREIGN KEY(CommunityID) REFERENCES Community(CommunityID) ,
	FOREIGN KEY(UserID) REFERENCES User(UserID) 
);
CREATE TABLE IF NOT EXISTS Post (
	PostID int PRIMARY KEY auto_increment,
    Title VARCHAR(200),
    Type ENUM('MEDIA', 'TEXT', 'POLL'),
	TextBody text,
    Image        VARCHAR(100),
	PosterID int NOT NULL,
	CommunityID int NOT NULL,
	Active		   boolean,
    CreatedDate datetime,
    ModifiedDate datetime,
	FOREIGN KEY(CommunityID) REFERENCES Community(CommunityID) ,
    FOREIGN KEY(PosterID) REFERENCES User(UserID) 
);
CREATE TABLE IF NOT EXISTS PollOption (
	PollOptionID int PRIMARY KEY auto_increment,
    body text,
	PostID int NOT NULL,
	Active		   boolean,
    CreatedDate datetime,
    ModifiedDate datetime,
    FOREIGN KEY(PostID) REFERENCES Post(PostID) 
);
CREATE TABLE IF NOT EXISTS PollOptionUser (
	PollOptionUserID int PRIMARY KEY auto_increment,
	PollOptionID int NOT NULL,
    UserID int NOT NULL,
	Active		   boolean,
    CreatedDate datetime,
    ModifiedDate datetime,
    FOREIGN KEY(PollOptionID) REFERENCES PollOption(PollOptionID),
	FOREIGN KEY(UserID) REFERENCES User(UserID) 
);
CREATE TABLE IF NOT EXISTS Upvote (
	UpvoteID int PRIMARY KEY auto_increment,
	PostID int NOT NULL,
    UserID int NOT NULL,
	Active		   boolean,
    CreatedDate datetime,
    ModifiedDate datetime,
    FOREIGN KEY(PostID) REFERENCES Post(PostID),
	FOREIGN KEY(UserID) REFERENCES User(UserID) 
);


