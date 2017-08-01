<?php

// ** Параметры MySQL: Эту информацию можно получить у вашего хостинг-провайдера ** //
/** Имя базы данных для WordPress */
define('DB_NAME', 'medical_ensurance');

/** Имя пользователя MySQL */
define('DB_USER', 'root');

/** Пароль к базе данных MySQL */
define('DB_PASSWORD', 'kljh76RRenJh7');

/** Имя сервера MySQL */
define('DB_HOST', 'localhost');

/** Кодировка базы данных для создания таблиц. */
define('DB_CHARSET', 'utf8');

/** Схема сопоставления. Не меняйте, если не уверены. */
define('DB_COLLATE', '');

/**#@+
 * Уникальные ключи и соли для аутентификации.
 *
 * Смените значение каждой константы на уникальную фразу.
 * Можно сгенерировать их с помощью {@link https://api.wordpress.org/secret-key/1.1/salt/ сервиса ключей на WordPress.org}
 * Можно изменить их, чтобы сделать существующие файлы cookies недействительными. Пользователям потребуется авторизоваться снова.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'CsQ+c!F2}isrDb?7ra>}]>,FK<uPOEEOftLif/LRD`WH 7{hj$JLm=$`Z|DY f03');
define('SECURE_AUTH_KEY',  '/U%jaj3B+wW&&)K:%x9r}*rQ.ni@xh!561ycv|(:IQK]0G.NLpbE@G+?gM#HA=z1');
define('LOGGED_IN_KEY',    '/p>R{@v#Y.OU+f3Wh.8^j86!AgsR|8~bJ]RS%npGu)I3hWIH/#Z+CYc]R98uG<hT');
define('NONCE_KEY',        '@Ly9gR~i!{8|Yx#dXYVNH|u6Qvv#g[yVE5A!KecwNkloKj3:P5S:THRj=N=LA`*x');
define('AUTH_SALT',        '8IX+Kkj#GsE^:Y>2m:|-pE+u^`!U}8*JDgLRmd&.j=9j~sqogKe2|K:8b*U:a^G*');
define('SECURE_AUTH_SALT', 'xs[`7U@g!>S06}8~n#.lbh_2!.RXuK$^[R`K#9@Mt=B3a,P)U+`z>K{3bMdpkt!n');
define('LOGGED_IN_SALT',   'A},[mRGnN_{S>]Yn50FxON6<`:)I|W@@lcJ;ef+w,y@OuL`-*Ct*cpy]|[4{@J?i');
define('NONCE_SALT',       '`*^vad`?CI!x[^GVh37iREwu)=p{I%z=j/cte`6,Mep2cS[l%TkqY#qfz3$:ZB~w');

/**#@-*/

/**
 * Префикс таблиц в базе данных WordPress.
 *
 * Можно установить несколько сайтов в одну базу данных, если использовать
 * разные префиксы. Пожалуйста, указывайте только цифры, буквы и знак подчеркивания.
 */
$table_prefix  = 'wp_';

/**
 * Для разработчиков: Режим отладки WordPress.
 *
 * Измените это значение на true, чтобы включить отображение уведомлений при разработке.
 * Разработчикам плагинов и тем настоятельно рекомендуется использовать WP_DEBUG
 * в своём рабочем окружении.
 * 
 * Информацию о других отладочных константах можно найти в Кодексе.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
//define('WP_DEBUG', true);

// Enable WP_DEBUG mode
define( 'WP_DEBUG', false );


/* Это всё, дальше не редактируем. Успехов! */

/** Абсолютный путь к директории WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Инициализирует переменные WordPress и подключает файлы. */
require_once(ABSPATH . 'wp-settings.php');
