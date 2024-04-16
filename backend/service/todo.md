# Backend TODO lists

## Admin
- [ ] openapi작성

## Services

### 상세페이지
- [ ] GET publisher/:id
publisher 정보(column: name, subscriber, description, publisher, url_subscribe)
지난 아티클 4개
태그(column: 분야 발행인  발송주기  구독비)
publisher와 동일한 '직무'뉴스레터 4개

-> publisher 태그 정보에 보여줄 태그를 지정할 방법이 필요함
-> 추천 아티클에 띄울 tag를 지정할 방법이 필요함

### 요약모달
- [ ] GET article/:id
article 정보(column: title, summary, url, created_at)
pubilhser 정보(column: title, tags, subscriber, thumbanil, url_subscribe, url_newsletter)
관련 artcle 정보(선택기준 figma 참조)

-> 관련 article 을 지정할 태그를 지정할 방법이 필요함

### 랭킹페이지
- [ ] GET /tag/ranking

-> 랭킹에 사용할 태그를 지정할 방법이 필요함

- [ ] GET /ranking/publihser?tag_id,limit,last

### 메인페이지
- [ ] /campaign/:id/publisher
- [ ] /campaign/:id/article
총 개수 필요

-> 고정 및 순서를 바꿀 수 있어야 함
-> 노출될 키워드 종류를 고를 수 있어야함


### 검색
- [ ] /search?search_term
