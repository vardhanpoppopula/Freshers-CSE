@echo off
title Nexora Freshers 2K26 Portal
echo ========================================================
echo  Starting NEXORA Freshers 2K26 Web Portal...
echo  Sri Vasavi Engineering College (Autonomous)
echo  Opening http://localhost:3000 in your browser...
echo ========================================================
timeout /t 2 /nobreak >nul
start "" "http://localhost:3000"
npm run dev
pause
