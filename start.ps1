# Ensure docker-compose is available
if (-not (Get-Command "docker-compose" -ErrorAction SilentlyContinue)) {
  Write-Host "docker-compose not found. Please install Docker Desktop." -ForegroundColor Red
  exit 1
}

Write-Host "Starting Job Tracker Services..." -ForegroundColor Cyan

# Start services in detached mode
docker-compose up -d
Start-Sleep -Seconds 2

# Clear and display welcome message
Clear-Host
Write-Host "==========================================" -ForegroundColor DarkCyan
Write-Host "Job Application Tracker is now running!" -ForegroundColor Green
Write-Host ""
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Backend API: http://localhost:5000/api" -ForegroundColor Yellow
Write-Host "MongoDB (Internal): mongodb://mongo:27017" -ForegroundColor Magenta
Write-Host ""
Write-Host "To stop all services: docker-compose down" -ForegroundColor Gray
Write-Host "===========================================" -ForegroundColor DarkCyan
