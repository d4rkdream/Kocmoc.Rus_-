# Космос.Rus — Аккаунты и скрипты

## Демо-аккаунт для входа

| Поле     | Значение           |
|----------|--------------------|
| Email    | `pilot@kosmos.ru`  |
| Пароль   | `kosmos2026`       |

Нажмите **«Войти»** в правом верхнем углу, введите данные выше.

---

## Пользовательский скрипт (UserScript / Tampermonkey)

```javascript
// ==UserScript==
// @name         Космос.Rus — Авто-вход
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Автоматически заполняет форму входа на сайте Космос.Rus
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const EMAIL = 'pilot@kosmos.ru';
  const PASSWORD = 'kosmos2026';

  function tryAutoLogin() {
    const nativeSetter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype, 'value'
    ).set;

    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');

    if (emailInput && passwordInput) {
      nativeSetter.call(emailInput, EMAIL);
      emailInput.dispatchEvent(new Event('input', { bubbles: true }));

      nativeSetter.call(passwordInput, PASSWORD);
      passwordInput.dispatchEvent(new Event('input', { bubbles: true }));

      console.log('[Космос.Rus] Форма заполнена. Нажмите «Войти в систему».');
    } else {
      console.log('[Космос.Rus] Форма не найдена. Нажмите кнопку «Войти» на сайте.');
    }
  }

  window.addEventListener('load', () => setTimeout(tryAutoLogin, 1500));
})();
```

### Быстрый запуск — вставить прямо в консоль браузера (F12)

```javascript
(function(){
  const s = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
  const em = document.querySelector('input[type="email"]');
  const pw = document.querySelector('input[type="password"]');
  if (!em || !pw) return console.log('Сначала нажмите «Войти» на сайте');
  s.call(em, 'pilot@kosmos.ru'); em.dispatchEvent(new Event('input', { bubbles: true }));
  s.call(pw, 'kosmos2026');     pw.dispatchEvent(new Event('input', { bubbles: true }));
  console.log('Готово! Нажмите «Войти в систему»');
})();
```
