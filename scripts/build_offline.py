"""Build the self-contained offline page from the current local site."""
from pathlib import Path
import base64
import mimetypes
import re

ROOT = Path(__file__).resolve().parent.parent

def data_uri(path):
    mime = mimetypes.guess_type(path.name)[0] or 'application/octet-stream'
    return f'data:{mime};base64,' + base64.b64encode(path.read_bytes()).decode('ascii')

def inline_css(match):
    path = ROOT / match.group(1)
    css = path.read_text()
    css = re.sub(r'url\([\'\"]?([^\)\'\"]+)[\'\"]?\)',
                 lambda m: 'url("' + data_uri(path.parent / m.group(1)) + '")', css)
    return '<style>\n' + css + '\n</style>'

html = (ROOT / 'index.html').read_text()
html = re.sub(r'<link href="([^"]+)" rel="stylesheet"\s*/?>', inline_css, html)
html = re.sub(r'src="(img/[^"]+)"', lambda m: 'src="' + data_uri(ROOT / m.group(1)) + '"', html)
html = html.replace('href="assets/plan-de-trabajo-final.pdf"',
                    'href="' + data_uri(ROOT / 'assets/plan-de-trabajo-final.pdf') + '"')
html = re.sub(r'<script[^>]+src="assets/app.js"[^>]*></script>', '', html)
js = (ROOT / 'assets/app.js').read_text()
html = html.replace('</body>', '<script>\n' + js + '\n</script>\n</body>')
(ROOT / 'Planilla Azul - Plan de Trabajo (offline).html').write_text(html)
print('Versión offline actualizada con fotos, fuentes y PDF incorporados.')
