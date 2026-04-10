# start_docs.ps1
$workingDir = $PSScriptRoot

Write-Host "🚀 开始在后台静默启动服务..." -ForegroundColor Cyan

# 启动 VitePress 开发服务器并获取进程对象
$docsProcess = Start-Process bun -ArgumentList "run docs:dev" -WorkingDirectory $workingDir -WindowStyle Hidden -PassThru

# 暂停 2 秒等服务器拉起
Start-Sleep -Seconds 2

# 把进程 ID 存起来，方便关闭时精准狙击，不伤及其他进程
Set-Content -Path (Join-Path $workingDir "docs_server.pid") -Value "$($docsProcess.Id)"

Write-Host "✅ 成功! 文档本地服务已驻留后台。" -ForegroundColor Green
Write-Host "🌐 请随时在浏览器打开本地对应网址: http://localhost:5173" -ForegroundColor Yellow
Write-Host "停止服务时请执行同目录下的 stop_docs.ps1 脚本" -ForegroundColor Gray
