-- 어드민
CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nickname VARCHAR(20) NOT NULL,
    password VARCHAR(99) NOT NULL
);

-- 키워드 그룹
CREATE TABLE IF NOT EXISTS keyword_groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(30) NOT NULL UNIQUE,
    is_enabled BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP    
);
CREATE INDEX IF NOT EXISTS keyword_groups_name ON keyword_groups(name);

-- 키워드
CREATE TABLE IF NOT EXISTS keywords (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(30) NOT NULL,
    is_enabled BOOLEAN DEFAULT FALSE,
    keyword_group_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(keyword_group_id, name),
    FOREIGN KEY (keyword_group_id) REFERENCES keyword_groups(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS keywords_name ON keywords(name);

-- 뉴스레터 발행자
CREATE TABLE IF NOT EXISTS publishers (
    id CHAR(6) PRIMARY KEY,
    thumbnail TEXT,
    name VARCHAR(99) NOT NULL,
    description TEXT NOT NULL,
    subscriber INTEGER DEFAULT 0,
    url_subscribe TEXT NOT NULL,
    publisher_main TEXT NOT NULL,
    publisher_spec TEXT NOT NULL,
    is_enabled BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS publishers_subscriber ON publishers(subscriber);

-- 키워드 - 뉴스레터 발행자 관계
CREATE TABLE IF NOT EXISTS keyword_publisher_rels(
    keyword_group_id INTEGER NOT NULL,
    keyword_id INTEGER NOT NULL,
    publisher_id CHAR(6) NOT NULL,
    UNIQUE(publisher_id, keyword_group_id),
    FOREIGN KEY (keyword_group_id) REFERENCES keyword_groups(id) ON DELETE CASCADE,
    FOREIGN KEY (publisher_id) REFERENCES publishers(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS keyword_publisher_rels_id ON keyword_publisher_rels(publisher_id, keyword_group_id);

-- 뉴스레터 컨텐츠
CREATE TABLE IF NOT EXISTS articles (
    id CHAR(6) PRIMARY KEY,
    thumbnail TEXT,
    title VARCHAR(99) NOT NULL,
    summary TEXT NOT NULL,
    publisher_id CHAR(6) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_enabled BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (publisher_id) REFERENCES publishers(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS articles_id ON articles(id);

-- 키워드 - 뉴스레터 컨텐츠 관계
CREATE TABLE IF NOT EXISTS keyword_article_rels(
    keyword_id INTEGER NOT NULL,
    article_id CHAR(6) NOT NULL,
    UNIQUE(article_id, keyword_id),
    FOREIGN KEY (keyword_id) REFERENCES keywords(id) ON DELETE CASCADE,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS keyword_article_rels_id ON keyword_article_rels(article_id, keyword_id);

-- 뉴스레터 배너
CREATE TABLE IF NOT EXISTS banners (
    id INTEGER,
    url TEXT,
    is_enabled BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS banners_is_enabled ON banners(is_enabled);

-- 캠페인 관련 정보
CREATE TABLE IF NOT EXISTS campaigns(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name CHAR(50),
    description TEXT,
    -- 어드민 단에서 볼 설명
    comment TEXT, 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 캠페인 내의 슬롯
CREATE TABLE IF NOT EXISTS slots(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    campaign_id INTEGER,
    name CHAR(50),
    description TEXT,
    -- 어드민 단에서 볼 설명
    comment TEXT, 
    preferences INTEGER,
    is_enabled BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(id, campaign_id),
    FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE
);

-- 슬롯의 아티클
CREATE TABLE IF NOT EXISTS slot_articles(
    slot_id INTEGER,
    article_id CHAR(6),
    preferences INTEGER,
    UNIQUE(slot_id, article_id),
    FOREIGN KEY (slot_id) REFERENCES slots(id) ON DELETE CASCADE,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS slot_articles_id ON slot_articles(slot_id, article_id);

-- 슬롯의 퍼블리셔
CREATE TABLE IF NOT EXISTS slot_publishers(
    slot_id INTEGER,
    publisher_id CHAR(6),
    preferences INTEGER,
    UNIQUE(slot_id, publisher_id),
    FOREIGN KEY (slot_id) REFERENCES slots(id) ON DELETE CASCADE,
    FOREIGN KEY (publisher_id) REFERENCES publishers(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS slot_publishers_id ON slot_publishers(slot_id, publisher_id);

-- Full Text Search table
CREATE VIRTUAL TABLE IF NOT EXISTS fts_articles USING FTS5(title, body, tags);
CREATE VIRTUAL TABLE IF NOT EXISTS fts_publishers USING FTS5(title, body, tags);


-- 크롤링
-- 구독자 / 뉴스레터 내용