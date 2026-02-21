#!/usr/bin/env python3
"""
Knowledge Base CLI Search
Usage: python search.py [query] [--tool TOOL] [--type TYPE]
"""

import json
import sys
from pathlib import Path

def load_index():
    """Load the index.json file"""
    index_path = Path(__file__).parent / 'index.json'
    with open(index_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def search(entries, query=None, tool=None, type_filter=None):
    """Filter entries based on criteria"""
    results = entries
    
    # Filter by tool
    if tool:
        results = [e for e in results if tool.lower() in [t.lower() for t in e['tools']]]
    
    # Filter by type
    if type_filter:
        results = [e for e in results if type_filter.lower() in [t.lower() for t in e['types']]]
    
    # Filter by query (searches in title, excerpt, path)
    if query:
        q = query.lower()
        results = [e for e in results if 
                   q in e['title'].lower() or 
                   q in e['excerpt'].lower() or
                   q in e['path'].lower() or
                   any(q in t.lower() for t in e['tools'])]
    
    return results

def display_results(results):
    """Pretty print search results"""
    if not results:
        print("No results found.")
        return
    
    print(f"\nFound {len(results)} result(s):\n")
    
    for i, entry in enumerate(results, 1):
        print(f"{i}. {entry['title']}")
        print(f"   Path: {entry['path']}")
        if entry['tools']:
            print(f"   Tools: {', '.join(entry['tools'])}")
        if entry['types']:
            print(f"   Type: {', '.join(entry['types'])}")
        if entry['excerpt']:
            print(f"   {entry['excerpt']}")
        print()

def parse_args():
    """Parse command line arguments"""
    args = sys.argv[1:]
    
    query = None
    tool = None
    type_filter = None
    
    i = 0
    while i < len(args):
        arg = args[i]
        
        if arg == '--tool' and i + 1 < len(args):
            tool = args[i + 1]
            i += 2
        elif arg == '--type' and i + 1 < len(args):
            type_filter = args[i + 1]
            i += 2
        else:
            # Collect remaining args as query
            query = ' '.join(args[i:])
            break
    
    return query, tool, type_filter

def show_usage():
    """Show usage examples"""
    print("""
Knowledge Base Search

Usage:
  python search.py [query] [--tool TOOL] [--type TYPE]

Examples:
  python search.py git reset
  python search.py --tool git --type installation
  python search.py "largest files" --tool bash
  python search.py --tool docker
  python search.py mongodb install

Available tools: git, npm, node, find, grep, tar, sed, awk, go, curl, 
                tailscale, python, nvs, conda, flutter, docker, mongodb
                
Available types: installation, troubleshooting, command, script, reference
    """)

def main():
    if '--help' in sys.argv or '-h' in sys.argv:
        show_usage()
        return
    
    try:
        index = load_index()
    except FileNotFoundError:
        print("Error: index.json not found. Run build-index.py first.")
        return
    
    query, tool, type_filter = parse_args()
    
    # Show all if no filters
    if not query and not tool and not type_filter:
        show_usage()
        return
    
    results = search(index, query, tool, type_filter)
    display_results(results)

if __name__ == '__main__':
    main()