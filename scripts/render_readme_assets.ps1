$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$screenshots = Join-Path $root "screenshots"
New-Item -ItemType Directory -Force -Path $screenshots | Out-Null
Get-ChildItem -Path $screenshots -File -ErrorAction SilentlyContinue | Remove-Item -Force

Add-Type -AssemblyName System.Drawing

function New-ScenarioImage {
  param(
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets,
    [string]$OutputPath
  )

  $width = 1600
  $height = 900
  $bmp = New-Object System.Drawing.Bitmap($width, $height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = "AntiAlias"
  $bg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(7, 10, 15))
  $panelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(60, 120, 255, 170), 2)
  $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(233, 243, 255))
  $mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(186, 200, 218))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(55, 255, 139))
  $dotBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(25, 199, 255))
  $fontTitle = New-Object System.Drawing.Font("Georgia", 30, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 14)

  $g.FillRectangle($bg, 0, 0, $width, $height)
  $rect = New-Object System.Drawing.Rectangle(40, 40, 1520, 820)
  $g.DrawRectangle($panelPen, $rect)
  $g.DrawString("Board Capital Reallocation Brief", $fontSub, $accentBrush, 70, 85)
  $g.DrawString($Title, $fontTitle, $textBrush, 70, 135)
  $subtitleRect = New-Object System.Drawing.RectangleF(70, 220, 1400, 80)
  $g.DrawString($Subtitle, $fontSub, $mutedBrush, $subtitleRect)

  $y = 320
  foreach ($bullet in $Bullets) {
    $g.FillEllipse($dotBrush, 85, $y + 8, 10, 10)
    $bulletRect = New-Object System.Drawing.RectangleF(110, $y, 1320, 48)
    $g.DrawString($bullet, $fontBody, $textBrush, $bulletRect)
    $y += 72
  }

  $g.DrawString("Synthetic scenario render for README packaging.", $fontSub, $mutedBrush, 70, 800)
  $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

New-ScenarioImage -Title "Board-ready overview for capital reallocation" -Subtitle "One executive brief for trims, protections, holds, redeployment readiness, timing, and capital shift." -Bullets @(
  "The overview keeps the strongest trim, protect, and redeploy lanes visible in one committee-safe surface.",
  "Leadership can see where capital should move next and where proof quality still blocks a redeployment ask.",
  "This layer turns scattered scorecards into one capital-rotation packet instead of another manual synthesis cycle."
) -OutputPath (Join-Path $screenshots "01-overview-proof.png")

New-ScenarioImage -Title "Reallocation brief keeps source and destination connected" -Subtitle "Every route retains the audience, owner, action, trim source, reinvest target, and next move." -Bullets @(
  "The reallocation-brief view makes it obvious which systems should be trimmed, protected, held, or funded next.",
  "Board questions stay attached to actual sources of savings and concrete redeployment targets.",
  "Leadership can tighten the committee packet before the next board, investor, or diligence review begins."
) -OutputPath (Join-Path $screenshots "02-reallocation-brief-proof.png")

New-ScenarioImage -Title "Trim candidates show which lanes can release capital cleanly" -Subtitle "Savings release, downside containment, timing, and company-tag signals stay visible in one decision readout." -Bullets @(
  "This view keeps procurement, FinTech, and adjacent overlap traces tied to actual release-of-capital candidates.",
  "Weak trim stories stay visible before the committee cuts into a lane that still protects the board narrative.",
  "Leadership can see which trim move will release savings fastest without causing hidden risk."
) -OutputPath (Join-Path $screenshots "03-trim-candidates-proof.png")

New-ScenarioImage -Title "Redeployment plan keeps capital shift and urgency together" -Subtitle "Capital shift, redeployment readiness, board alignment, and urgency stay grounded in the same sequence view." -Bullets @(
  "The executive story stays tied to actual rotation timing instead of vague transformation language.",
  "Thin proof remains visible before it turns into another inconclusive board discussion.",
  "This creates a repeatable packet that can travel into diligence, investor, and operating reviews."
) -OutputPath (Join-Path $screenshots "04-redeployment-plan-proof.png")
