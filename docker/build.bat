rem call npm install
rem call npm run build

RMDIR /s /q .\www\

xcopy ..\dist .\www\ /s /e

docker build -t aptero-hub .
