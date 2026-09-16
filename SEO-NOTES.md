# SEO перевірка

Перевірено вихідний HTML у main, метадані та структуру репозиторію. Живу сторінку інструмент перевірки не відкрив; HTTP-заголовки, robots.txt на корені домену, індексація, Core Web Vitals та Rich Results Test не перевірені.

Додано canonical, повний Open Graph, Twitter summary card із логотипом, sitemap.xml та JSON-LD Organization/WebSite/WebPage з п'ятьма послугами. Один H1, lang=uk, описові alt на статичних зображеннях. Порожній alt у динамічному лайтбоксі замінюється при відкритті фото.

Не додано вигаданих адрес, годин, цін, рейтингів. Використано Organization, не LocalBusiness із непідтвердженою фізичною адресою. Розмітка не гарантує розширених результатів.

Подальші кроки:
- Підключити Search Console і надіслати https://irynal93.github.io/yakiv-bud-rem/sitemap.xml.
- robots.txt має бути на https://irynal93.github.io/robots.txt; файл у /yakiv-bud-rem/ не керуватиме обходом. Інший репозиторій для цього не змінено.
- При зміні домену одночасно оновити canonical, og:url, URL зображень, JSON-LD та sitemap.
- Розглянути H1 «Будівництво будинків в Одесі та області». Поточний дизайнерський заголовок залишено.
- Додати реальні фото робіт та окрему обкладинку соцмереж; зараз використано існуючий квадратний логотип.
- Підключити надсилання форми; вона поки вимкнена за домовленістю.

Джерела: https://schema.org/Organization ; https://developers.google.com/search/docs/appearance/structured-data/local-business ; https://developers.google.com/crawling/docs/robots-txt/create-robots-txt
