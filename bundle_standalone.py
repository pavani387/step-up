import os
import re

def create_standalone_html(dist_dir='dist', output_file='dist/standalone.html'):
    index_path = os.path.join(dist_dir, 'index.html')
    if not os.path.exists(index_path):
        raise FileNotFoundError(f"Cannot find {index_path}. Please run npm run build first.")

    with open(index_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # Find and inline CSS
    css_pattern = re.compile(r'<link\s+rel=["\']stylesheet["\']\s+crossorigin\s+href=["\']\./(assets/[^"\']+\.css)["\']\s*>', re.IGNORECASE)
    for match in css_pattern.finditer(html):
        css_rel = match.group(1)
        css_full = os.path.join(dist_dir, css_rel)
        if os.path.exists(css_full):
            with open(css_full, 'r', encoding='utf-8') as cf:
                css_data = cf.read()
            html = html.replace(match.group(0), f'<style>\n{css_data}\n</style>')

    # Find and inline JS
    js_pattern = re.compile(r'<script\s+type=["\']module["\']\s+crossorigin\s+src=["\']\./(assets/[^"\']+\.js)["\']\s*></script>', re.IGNORECASE)
    for match in js_pattern.finditer(html):
        js_rel = match.group(1)
        js_full = os.path.join(dist_dir, js_rel)
        if os.path.exists(js_full):
            with open(js_full, 'r', encoding='utf-8') as jf:
                js_data = jf.read()
            html = html.replace(match.group(0), f'<script type="module">\n{js_data}\n</script>')

    # Write standalone
    with open(output_file, 'w', encoding='utf-8') as out:
        out.write(html)

    print(f"Successfully generated standalone bundle: {output_file} ({len(html)} bytes)")
    return html

if __name__ == '__main__':
    create_standalone_html()
