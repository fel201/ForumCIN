CREATE TABLE comments(
    id          SERIAL PRIMARY KEY,
    post_id     INT NOT NULL,
    content     TEXT NOT NULL,
    user_id     INT NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT  fk_text FOREIGN KEY(post_id) REFERENCES submissions(id)
);

SELECT * FROM comments