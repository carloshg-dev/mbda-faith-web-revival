"""Static feed persistence. Bounded, atomic per file, preserves the last good edition."""
import json
import os
import tempfile
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse


def save_static_feed(root, articles, parse_date, max_items=60):
    prepared = []
    seen = set()
    now = datetime.now(timezone.utc)
    for article in articles[:200]:
        date = parse_date(article.get('date'))
        url = str(article.get('url') or '')[:2049]
        parsed = urlparse(url)
        if (not date or parsed.scheme != 'https' or not parsed.hostname or parsed.username
                or parsed.password or len(url) > 2048 or parsed.path in ('', '/')):
            continue
        date = date.replace(tzinfo=timezone.utc) if date.tzinfo is None else date.astimezone(timezone.utc)
        if date.timestamp() > now.timestamp() + 300 or date.year < 2000:
            continue
        title = str(article.get('title') or '').strip()[:240]
        if len(title) < 8 or url in seen:
            continue
        seen.add(url)
        prepared.append(dict(title=title, summary=str(article.get('summary') or '')[:400],
                             source=str(article.get('source') or '')[:90], url=url,
                             category=str(article.get('category') or 'Notícias cristãs')[:65],
                             image_url=str(article.get('image_url') or '')[:2048],
                             date=date.isoformat(), publication_date_verified=True))
        if len(prepared) >= min(max_items, 60):
            break
    if not prepared:
        raise ValueError('No verified articles; previous edition preserved')
    prepared.sort(key=lambda row: (row['date'], row['url']), reverse=True)
    targets = [Path(root) / folder / 'data' / 'christian_news.json' for folder in ('public', 'src')]
    previous = None
    if targets[0].is_file() and targets[0].stat().st_size <= 1_000_000:
        try:
            previous = json.loads(targets[0].read_text(encoding='utf-8'))
        except (ValueError, OSError):
            pass
    output = (previous if previous and previous.get('schema_version') == 2 and previous.get('articles') == prepared
              else dict(schema_version=2, last_updated=now.isoformat(), total_articles=len(prepared),
                        sources=sorted({row['source'] for row in prepared}), articles=prepared))
    for target in targets:
        target.parent.mkdir(parents=True, exist_ok=True)
        with tempfile.NamedTemporaryFile(mode='w', encoding='utf-8', dir=target.parent, delete=False) as handle:
            temporary = handle.name
            json.dump(output, handle, ensure_ascii=False, indent=2)
            handle.write('\n')
        try:
            os.replace(temporary, target)
        finally:
            if os.path.exists(temporary):
                os.unlink(temporary)
    return str(targets[0])
