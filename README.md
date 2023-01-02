# 小学生用計算練習アプリ

vueの勉強がてら息子の勉強アプリを作成してみる

[こちら](https://calc-train.dev-ing.com/)で公開


## run

```
npm run dev
```

## build

```
npm run build
```

## aws publish

```
aws s3 sync --exact-timestamps --delete ./dist s3://<path>
```

if needed.

```
aws cloudfront create-invalidation --distribution-id <DISTRIBUTION-ID> --paths "/*"
```

