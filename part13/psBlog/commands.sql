CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs (author, url, title) values ('Matti Luukkainen', 'https://medium.com/', 'fullstackopen course for dev development');

insert into blogs (author, url, title) values ('James Bond', 'https://stackoverflow.com/', 'Add at least two blogs to the database.');

select * from blogs;


insert into readinglists (user_id,blog_id) values (3, 10);

DELETE FROM migrations WHERE name = '20230227104456-remove_user_id_from_blog.js';

DELETE FROM migrations WHERE name = '20230228080129-create_sessions.js';