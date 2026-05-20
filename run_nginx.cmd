@echo off
cd ..
taskkill /F /IM nginx.exe >nul 2>&1
timeout /t 1 /nobreak >nul
echo.
echo  nginx running on http://localhost
echo  Close this window or press Ctrl+C to stop nginx
echo.
nginx -g "daemon off;"
