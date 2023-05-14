<h1 align="center">CurrencyConverter</h1>

# Работа находится по адресу [CurrencyConverter](http://exchangetest.webtm.ru)

### Запуск проекта

```
yarn watch
```
Запускается на порте 3000

### Билд проекта

```
yarn build
```

##  Технологии

- CRA
- REDUX
- REDUX-THAGA
- TYPESCRIPT

### Архитектура проекта


+ pages
  + conversion -  страница с обменом валюты
  + table - страница с таблицей валют

+ store
  + store - главный стор приложения
  + reducers - содержит combineReducers
  + папки для каждого стора

+ index - Root component
+ App.tsx - начальный компонент с глобальными стилями