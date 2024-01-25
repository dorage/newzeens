-- ----------------
-- SERVICE
-- ----------------

-- GET /keyword_group/:id

SELECT *
FROM keywords
WHERE id IN (
    SELECT keyword_id
    FROM keyword_group_rels
    WHERE keyword_group_id = {:id}
)

-- GET /keyword/:id/publisher
 
SELECT *
FROM (
    SELECT *
    FROM keyword_publisher_rels
    WHERE keyword_id = {:id}
) AS kpr
LEFT JOIN 
    publishers as p
ON kpr.publisher_id = p.id
    

-- GET /keyword/:id/article

SELECT *
FROM (
    SELECT *
    FROM keyword_article_rels
    WHERE keyword_id = {:id}
) AS kar
LEFT JOIN 
    articles as a
ON kar.article_id = a.id

-- GET /publisher/rank

SELECT *
FROM publishers
ORDER BY subscriber DESC
LIMIT 10;

-- GET /pubisher/:id

SELECT *
FROM publishers
WHERE id = {:id};

-- GET /article/:id

SELECT *
FROM articles
WHERE id = {:id};

-- GET /serach/:term

SELECT fts_publishers({:term});
SELECT fts_articles({:term});


-- ----------------
-- ADMIN
-- ----------------

-- POST /auth/login

-- GET /keyword_group

SELECT *
FROM keyword_groups;

-- POST /keyword_group

-- GET /keyword_group/:id
-- PUT /keyword_group/:id
-- DELETE /keyword_group/:id

-- GET /keyword
-- POST /keyword

-- GET /keyword/:id
-- PUT /keyword/:id
-- DELETE /keyword/:id

-- GET /publisher
-- POST /publisher

-- GET /publisher/:id
-- PUT /publisher/:id
-- DELETE /publisher/:id

-- GET /article
-- POST /article

-- GET /article/:id
-- PUT /article/:id
-- DELETE /article/:id
