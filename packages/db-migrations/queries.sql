-- ----------------
-- SERVICE
-- ----------------

-- GET /nl
SELECT * FROM newsletters

-- GET /nl?{filter_query}
SELECT nl_id FROM nl_categories
WHERE name IN (category[]);

SELECT nl_id FROM nl_keywords
WHERE name IN (name[]) AND id IN (nl_c);

SELECT nl_id FROM nl_periods
WHERE name IN (period[]) AND id IN (nl_k);

SELECT nl_id FROM nl_price
WHERE name IN (price[]) AND id IN (nl_p);

SELECT nl.* FROM filtered_nl fnl
LEFT JOIN newsletters nl
ON fnl.id = nl.id

-- GET /nl/:id
-- GET /nl/:id/related

-- GET /article/:id
-- GET /article/:id/related


-- ----------------
-- ADMIN
-- ----------------

-- POST /auth/login

-- GET /admin/nl
-- POST /admin/nl

-- GET /admin/nl/:id
-- PUT /admin/nl/:id
-- DELETE /admin/nl/:id

-- POST /admin/article

-- GET /admin/article/:id
-- PUT /admin/article/:id
-- DELETE /admin/article/:id