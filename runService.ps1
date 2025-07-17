# Paths to your projects
$frontendPath = ".\frontend"
$backendPath  = ".\backend"

# Ensure npm is available
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "Error: npm is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

# Start MongoDB service if it exists (and is not already running)
$mongoService = Get-Service -Name MongoDB -ErrorAction SilentlyContinue
if ($mongoService) {
    if ($mongoService.Status -ne 'Running') {
        Write-Host "Starting MongoDB service..." -ForegroundColor Cyan
        Start-Service MongoDB
        # Wait a few seconds for it to come online
        Start-Sleep -Seconds 3
    } else {
        Write-Host "MongoDB service is already running." -ForegroundColor Green
    }
} else {
    Write-Host "Warning: MongoDB service 'MongoDB' not found. Make sure MongoDB is installed as a service." -ForegroundColor Yellow
}

# Function to start a Node service in its own hidden PowerShell window
function Start-ServiceProcess {
    param(
        [string] $Path,
        [string] $Name
    )

    # check package.json
    if (-not (Test-Path (Join-Path $Path 'package.json'))) {
        Write-Host "Error: package.json not found in $Path" -ForegroundColor Red
        return
    }

    Write-Host "Launching $Name (hidden) in: $Path" -ForegroundColor Cyan

    # Build the command to run
    $cmd = "cd `"$Path`"; npm install; npm run dev"

    # Start a hidden PowerShell
    Start-Process -FilePath "powershell.exe" `
                  -ArgumentList "-NoProfile", "-WindowStyle Hidden", "-Command", $cmd `
                  -WindowStyle Hidden `
                  -WorkingDirectory $Path
}

# Launch frontend and backend
Start-ServiceProcess -Path $frontendPath -Name "Frontend"
Start-ServiceProcess -Path $backendPath  -Name "Backend"

Write-Host "Frontend and Backend launched (in hidden windows)." -ForegroundColor Green
