@echo off
cd ..
taskkill /F /IM nginx.exe >nul 2>&1
timeout /t 1 /nobreak >nul
start nginx
pause
