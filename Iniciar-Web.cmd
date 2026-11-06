@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>&1
if %errorlevel%==0 (
  start "" "http://127.0.0.1:8765"
  node servidor.mjs
  goto end
)
set "QUISUCO_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if exist "%QUISUCO_NODE%" (
  start "" "http://127.0.0.1:8765"
  "%QUISUCO_NODE%" servidor.mjs
  goto end
)
echo Para iniciar a versao web, instale Node.js ou use um servidor HTTP.
echo Consulte INSTRUCOES.md. A versao Windows pode ser aberta diretamente.
pause
:end
endlocal
