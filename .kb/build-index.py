#!/usr/bin/env python3
"""
Knowledge Base Index Builder
Scans markdown files and builds searchable index
"""

import os
import json
import re
from pathlib import Path
from datetime import datetime

# Tools to auto-detect
TOOLS = ['git', 'npm', 'node', 'find', 'grep', 'tar', 'sed', 'awk', 
         'go', 'curl', 'tailscale', 'python', 'nvs', 'conda', 'flutter',
         'docker', 'mongodb', 'mongod', 'bash', 'vite', 'react', 'express']

# File types to detect
TYPES = {
    'installation': ['install', 'setup', 'download', 'configure'],
    'troubleshooting': ['error', 'fix', 'problem', 'issue', 'debug'],
    'command': ['usage', 'syntax', 'example', 'command'],
    'script': ['script', 'automation', 'claude generated']
}

def extract_frontmatter(content):
    """Extract YAML frontmatter if exists"""
    match = re.match(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
    if not match:
        return {}, content
    
    fm_text = match.group(1)
    body = content[match.end():]
    
    # Simple YAML parsing (key: value)
    frontmatter = {}
    for line in fm_text.split('\n'):
        if ':' in line:
            key, value = line.split(':', 1)
            frontmatter[key.strip()] = value.strip().strip('"\'')
    
    return frontmatter, body

def detect_tools(content):
    """Auto-detect tools mentioned in content"""
    content_lower = content.lower()
    found = []
    for tool in TOOLS:
        if re.search(r'\b' + tool + r'\b', content_lower):
            found.append(tool)
    return found

def detect_type(content, title):
    """Classify file type"""
    text = (title + ' ' + content).lower()
    detected = []
    for type_name, keywords in TYPES.items():
        if any(kw in text for kw in keywords):
            detected.append(type_name)
    return detected if detected else ['reference']

def extract_title(frontmatter, content):
    """Get title from frontmatter or first heading"""
    if 'title' in frontmatter:
        return frontmatter['title']
    
    # Try to find first # heading
    match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
    if match:
        return match.group(1).strip()
    
    return "Untitled"

def get_excerpt(content, max_length=200):
    """Get first non-empty paragraph"""
    # Remove frontmatter and headings
    text = re.sub(r'^---.*?---\s*', '', content, flags=re.DOTALL)
    text = re.sub(r'^#+\s+.+$', '', text, flags=re.MULTILINE)
    text = text.strip()
    
    # Get first paragraph
    para = text.split('\n\n')[0] if text else ''
    return para[:max_length] + '...' if len(para) > max_length else para

def scan_files(root_path):
    """Scan all markdown files"""
    index = []
    root = Path(root_path)
    
    # Find all .md files, excluding common ignore patterns
    for md_file in root.rglob('*.md'):
        # Skip node_modules, .git, etc.
        if any(part.startswith('.') or part == 'node_modules' 
               for part in md_file.parts):
            if '.kb' not in str(md_file):  # Allow .kb folder
                continue
        
        try:
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            frontmatter, body = extract_frontmatter(content)
            
            # Build entry
            entry = {
                'path': str(md_file.relative_to(root)),
                'title': extract_title(frontmatter, body),
                'tools': detect_tools(content),
                'types': detect_type(content, frontmatter.get('title', '')),
                'excerpt': get_excerpt(body),
                'date': frontmatter.get('publishDate', frontmatter.get('date', '')),
                'modified': datetime.fromtimestamp(md_file.stat().st_mtime).isoformat(),
            }
            
            index.append(entry)
            print(f"✓ {entry['path']}")
            
        except Exception as e:
            print(f"✗ {md_file}: {e}")
    
    return index

def main():
    # Scan from repo root (parent of .kb)
    repo_root = Path(__file__).parent.parent
    print(f"Scanning: {repo_root}\n")
    
    index = scan_files(repo_root)
    
    # Write index
    output = Path(__file__).parent / 'index.json'
    with open(output, 'w', encoding='utf-8') as f:
        json.dump(index, f, indent=2)
    
    print(f"\n✓ Indexed {len(index)} files → {output}")

if __name__ == '__main__':
    main()