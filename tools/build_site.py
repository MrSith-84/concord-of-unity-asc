#!/usr/bin/env python3
"""
Simple static include builder.

Replaces include markers like:
  <!-- @@include header.html -->
  <!-- @@include footer.html -->

in files under src/ and writes built HTML to the repository root.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'src'
PARTIALS = ROOT / 'partials'

INCLUDE_MARK = '<!-- @@include '

def build_one(src_file: Path, out_file: Path):
    content = src_file.read_text(encoding='utf-8')
    # Replace all include markers
    pos = 0
    built = ''
    while True:
        idx = content.find(INCLUDE_MARK, pos)
        if idx == -1:
            built += content[pos:]
            break
        built += content[pos:idx]
        end = content.find('-->', idx)
        if end == -1:
            raise ValueError(f'Malformed include in {src_file} near position {idx}')
        spec = content[idx+len(INCLUDE_MARK):end].strip()
        # spec is like 'header.html'
        inc_path = PARTIALS / spec
        if not inc_path.exists():
            raise FileNotFoundError(f'Partial not found: {inc_path}')
        built += inc_path.read_text(encoding='utf-8')
        pos = end + 3
    out_file.write_text(built, encoding='utf-8')
    print(f'Built {out_file.relative_to(ROOT)}')

def main():
    SRC.mkdir(exist_ok=True)
    pages = list(SRC.glob('*.html'))
    if not pages:
        print('No src/*.html pages found.')
        return
    for page in pages:
        out = ROOT / page.name
        build_one(page, out)

if __name__ == '__main__':
    main()

