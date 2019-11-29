build:
	yarn build
	rm -rf ../tm-api/src/build/*
	mv  build/* ../tm-api/src/build/
	rm -rf build

localtest:
	pm2 delete api_dev
	cd ../tm-api && pm2 start ecosystem.config.js  --env dev --name "api_dev"
	cd ../TestMaster
