# 用本机 PowerPoint 把 .pptx 每页导出为 PNG（Windows，需装 Office）。
# 用法：powershell -File tools/export_png.ps1 deck.pptx [输出目录] [宽度px]
param(
  [Parameter(Mandatory = $true)][string]$Pptx,
  [string]$OutDir = "",
  [int]$Width = 1600
)
$src = (Resolve-Path $Pptx).Path
if (-not $OutDir) { $OutDir = Join-Path (Split-Path $src) "shots" }
if (Test-Path $OutDir) { Remove-Item -Recurse -Force $OutDir -Confirm:$false }
New-Item -ItemType Directory -Force $OutDir | Out-Null
$OutDir = (Resolve-Path $OutDir).Path
$height = [int]($Width * 9 / 16)
$pp = New-Object -ComObject PowerPoint.Application
try {
  $pres = $pp.Presentations.Open($src, $true, $false, $false)
  $i = 1
  foreach ($sl in $pres.Slides) {
    $sl.Export((Join-Path $OutDir ("s{0:D2}.png" -f $i)), "PNG", $Width, $height)
    $i++
  }
  $pres.Close()
} finally {
  $pp.Quit()
  [System.Runtime.Interopservices.Marshal]::ReleaseComObject($pp) | Out-Null
}
Write-Output ("exported {0} slides -> {1}" -f ($i - 1), $OutDir)
