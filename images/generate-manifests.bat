@echo off
setlocal enabledelayedexpansion

cd /d "%~dp0images"

for /d %%Y in (*) do (
  for /d %%C in ("%%Y\*") do (
    > "%%C\manifest.txt" (
      for %%I in ("%%C\*.jpg" "%%C\*.jpeg" "%%C\*.png" "%%C\*.webp" "%%C\*.gif" "%%C\*.mp4") do (
        echo %%~nxI
      )
    )
    echo Created manifest.txt in %%C
  )
)

echo All manifests updated!
pause
