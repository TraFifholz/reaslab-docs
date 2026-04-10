# stop_docs.ps1
$workingDir = $PSScriptRoot
$pidFile = Join-Path $workingDir "docs_server.pid"

if (Test-Path $pidFile) {
    # 读出 pid 列表并精准终止
    $pids = (Get-Content $pidFile) -split ","
    
    foreach ($pidStr in $pids) {
        $id = [int]$pidStr
        try {
            Stop-Process -Id $id -Force -ErrorAction Stop
            Write-Host "🛑 成功结束后台进程 (PID: $id)" -ForegroundColor Green
        } catch {
            Write-Host "⚠️ 进程 (PID: $id) 可能已经被手动关闭或结束了。" -ForegroundColor Yellow
        }
    }
    # 删掉记录文件
    Remove-Item -Path $pidFile -Force
    Write-Host "✅ 该项目下挂载的网页后台服务已全部安全退出！" -ForegroundColor Cyan
} else {
    Write-Host "ℹ️ 没有发现运行记录文件 (docs_server.pid)，可能服务尚未运行或已被清理。" -ForegroundColor Gray
}
