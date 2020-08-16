# meldcx-filesharing-api

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

## About
MeldCX Coding Exam

### Installing and running the api
via **docker**
```
cp .docker.local.env .env
docker-compose up --build
```

via **docker** using **google**
```
cp .docker.google.env .env
# update your .env values for STORAGE_GOOGLE_PROJECTID, STORAGE_GOOGLE_BUCKET, STORAGE_GOOGLE_PATH
# save your google config json file to STORAGE_GOOGLE_PATH
docker-compose up --build
```
