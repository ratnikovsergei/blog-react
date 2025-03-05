<!-- Области хранения данных: -->

- база данных на JSON-server
- BFF (backend for frontend)
- redux store

<!-- Сущности приложения: -->

- пользователь: БД (список пользователей), BFF (сессия текущего пользователя), Redux Store (для отображения в браузере)
- роль пользователя: БД (список ролей), BFF (сессия), Redux Store (для использования)
- статья: БД (список статей), Redux Store (отображение)
- комментарий: БД (список комментариев), Redux Store (отображение)

<!-- Таблицы БД: -->

- users: id / login / password / registered_ad / role_id
- roles: id / name
- posts: id / title / image_url / content / published_at
- comments: id / author_id / post_id / content / published_at

<!-- Схема состояния на BFF: -->

- current user session: login / password / role

<!-- Схема для Redux Store: -->

- user: id, login, roleId/ session
- posts: [id, title, imageUrl, publishedAt, commentsCount]
- post: id, title, imageUrl, content, publishedAt, comments: [id, author, content, publishedAt]
- users: user[id, login, registredAt, role]
