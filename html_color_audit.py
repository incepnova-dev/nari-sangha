#!/usr/bin/env python3
"""
HTML Color Audit Script - Page-wise Color Extraction
Extracts ALL color schemes from HTML files in nari-swasthya-complete folder
"""

import os
import re
import json
from pathlib import Path
from collections import defaultdict

try:
    from bs4 import BeautifulSoup
except ImportError:
    print("ERROR: BeautifulSoup4 not installed. Installing...")
    import subprocess
    subprocess.check_call(['pip', 'install', 'beautifulsoup4'])
    from bs4 import BeautifulSoup

# Color pattern matchers
HEX_PATTERN = r'#(?:[0-9a-fA-F]{3,4}){1,2}\b'
RGB_PATTERN = r'rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)'
HSL_PATTERN = r'hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[\d.]+\s*)?\)'
VAR_PATTERN = r'var\(--[a-zA-Z0-9_-]+\)'

NAMED_COLORS = [
    'white', 'black', 'red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange', 'gray', 
    'brown', 'cyan', 'magenta', 'navy', 'teal', 'lime', 'olive', 'maroon', 'aqua', 'silver',
    'fuchsia', 'coral', 'crimson', 'indigo', 'violet', 'gold', 'tan', 'beige', 'khaki', 
    'lavender', 'plum', 'salmon', 'turquoise', 'ivory', 'snow', 'wheat', 'tomato'
]

def extract_colors_from_text(text):
    """Extract all color values from a text string"""
    colors = []
    
    # Extract hex colors
    colors.extend(re.findall(HEX_PATTERN, text))
    
    # Extract rgb/rgba colors
    colors.extend(re.findall(RGB_PATTERN, text))
    
    # Extract hsl/hsla colors
    colors.extend(re.findall(HSL_PATTERN, text))
    
    # Extract CSS variables
    colors.extend(re.findall(VAR_PATTERN, text))
    
    # Extract named colors (only if followed by semicolon or used in property)
    for color in NAMED_COLORS:
        if re.search(rf'\b{color}\b', text, re.IGNORECASE):
            colors.append(color)
    
    return colors

def categorize_color_usage(property_name, element_type=''):
    """Categorize color usage based on CSS property or HTML context"""
    prop = property_name.lower()
    
    if 'background' in prop:
        if 'gradient' in prop:
            return 'gradient'
        return 'background'
    elif prop in ['color', 'fill']:
        return 'text'
    elif 'border' in prop:
        return 'border'
    elif 'shadow' in prop:
        return 'shadow'
    elif 'hover' in prop or ':hover' in prop:
        return 'hover'
    elif 'active' in prop or ':active' in prop:
        return 'active'
    elif 'focus' in prop or ':focus' in prop:
        return 'focus'
    else:
        return 'other'

def extract_from_inline_style(element, page_name):
    """Extract colors from inline style attribute"""
    results = []
    style = element.get('style', '')
    
    if not style:
        return results
    
    # Parse individual CSS properties
    declarations = style.split(';')
    for decl in declarations:
        if ':' in decl:
            prop, value = decl.split(':', 1)
            prop = prop.strip()
            value = value.strip()
            
            colors = extract_colors_from_text(value)
            for color in colors:
                results.append({
                    'color': color,
                    'source': 'inline style',
                    'property': prop,
                    'category': categorize_color_usage(prop),
                    'element': element.name,
                    'class': element.get('class', []),
                    'context': style[:100]
                })
    
    return results

def extract_from_style_block(style_content, page_name):
    """Extract colors from <style> blocks"""
    results = []
    
    # Remove comments
    style_content = re.sub(r'/\*.*?\*/', '', style_content, flags=re.DOTALL)
    
    # Find all CSS rules
    rules = re.findall(r'([^{}]+)\s*\{([^}]+)\}', style_content)
    
    for selector, declarations in rules:
        selector = selector.strip()
        
        # Parse each declaration
        for decl in declarations.split(';'):
            if ':' not in decl:
                continue
                
            prop, value = decl.split(':', 1)
            prop = prop.strip()
            value = value.strip()
            
            colors = extract_colors_from_text(value)
            for color in colors:
                results.append({
                    'color': color,
                    'source': 'embedded <style>',
                    'property': prop,
                    'category': categorize_color_usage(prop, selector),
                    'selector': selector,
                    'context': decl.strip()[:100]
                })
    
    return results

def audit_html_file(filepath):
    """Audit a single HTML file for color usage"""
    print(f"  Scanning: {filepath.name}")
    
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except Exception as e:
        print(f"    ERROR reading file: {e}")
        return None
    
    soup = BeautifulSoup(content, 'html.parser')
    page_name = filepath.stem
    
    audit = {
        'page': page_name,
        'filename': filepath.name,
        'colors_by_category': defaultdict(list),
        'all_colors': [],
        'linked_css': []
    }
    
    # Extract from inline styles
    for element in soup.find_all(style=True):
        colors = extract_from_inline_style(element, page_name)
        audit['all_colors'].extend(colors)
        for color_info in colors:
            audit['colors_by_category'][color_info['category']].append(color_info)
    
    # Extract from <style> blocks
    for style_tag in soup.find_all('style'):
        if style_tag.string:
            colors = extract_from_style_block(style_tag.string, page_name)
            audit['all_colors'].extend(colors)
            for color_info in colors:
                audit['colors_by_category'][color_info['category']].append(color_info)
    
    # Find linked CSS files
    for link in soup.find_all('link', rel='stylesheet'):
        href = link.get('href', '')
        if href:
            audit['linked_css'].append(href)
    
    # Convert defaultdict to regular dict
    audit['colors_by_category'] = dict(audit['colors_by_category'])
    
    return audit

def audit_css_file(filepath):
    """Audit a CSS file for color definitions"""
    print(f"  Scanning CSS: {filepath.name}")
    
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except Exception as e:
        print(f"    ERROR reading CSS file: {e}")
        return None
    
    colors = extract_from_style_block(content, filepath.stem)
    
    audit = {
        'file': filepath.name,
        'colors': colors,
        'color_count': len(colors)
    }
    
    return audit

def generate_markdown_report(audits, css_audits, output_path):
    """Generate a comprehensive markdown report"""
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write("# HTML Color Audit Report\n\n")
        f.write(f"**Total HTML Pages Scanned:** {len(audits)}\n\n")
        f.write(f"**Total CSS Files Scanned:** {len(css_audits)}\n\n")
        f.write("---\n\n")
        
        # CSS Files Section
        f.write("## Global CSS Files\n\n")
        for css_audit in css_audits:
            f.write(f"### {css_audit['file']}\n\n")
            f.write(f"**Total Colors Found:** {css_audit['color_count']}\n\n")
            
            if css_audit['colors']:
                # Group by category
                by_category = defaultdict(list)
                for color_info in css_audit['colors']:
                    by_category[color_info['category']].append(color_info)
                
                for category, colors in sorted(by_category.items()):
                    f.write(f"#### {category.title()} Colors\n\n")
                    unique_colors = {}
                    for c in colors:
                        color_key = c['color']
                        if color_key not in unique_colors:
                            unique_colors[color_key] = c
                    
                    for color, info in unique_colors.items():
                        f.write(f"- `{color}`\n")
                        f.write(f"  - Property: `{info['property']}`\n")
                        f.write(f"  - Selector: `{info.get('selector', 'N/A')}`\n")
                    f.write("\n")
            
            f.write("---\n\n")
        
        # Page-by-page color audit
        f.write("## Page-Wise Color Schemes\n\n")
        
        for audit in sorted(audits, key=lambda x: x['page']):
            f.write(f"### Page: {audit['page']}.html\n\n")
            
            if audit['linked_css']:
                f.write("**Linked CSS Files:**\n")
                for css in audit['linked_css']:
                    f.write(f"- `{css}`\n")
                f.write("\n")
            
            total_colors = len(audit['all_colors'])
            f.write(f"**Total Color Instances:** {total_colors}\n\n")
            
            if not audit['colors_by_category']:
                f.write("_No inline colors or embedded styles found._\n\n")
                f.write("---\n\n")
                continue
            
            # Background colors
            if 'background' in audit['colors_by_category']:
                f.write("#### Background Colors\n\n")
                colors = audit['colors_by_category']['background']
                unique_bg = {}
                for c in colors:
                    if c['color'] not in unique_bg:
                        unique_bg[c['color']] = c
                
                for color, info in unique_bg.items():
                    f.write(f"- `{color}`\n")
                    f.write(f"  - Source: {info['source']}\n")
                    if info['source'] == 'inline style':
                        f.write(f"  - Element: `<{info['element']}>`\n")
                    else:
                        f.write(f"  - Selector: `{info.get('selector', 'N/A')}`\n")
                f.write("\n")
            
            # Text colors
            if 'text' in audit['colors_by_category']:
                f.write("#### Text Colors\n\n")
                colors = audit['colors_by_category']['text']
                unique_text = {}
                for c in colors:
                    if c['color'] not in unique_text:
                        unique_text[c['color']] = c
                
                for color, info in unique_text.items():
                    f.write(f"- `{color}`\n")
                    f.write(f"  - Source: {info['source']}\n")
                f.write("\n")
            
            # Button/Interactive colors (hover, active, focus)
            interactive_cats = ['hover', 'active', 'focus']
            has_interactive = any(cat in audit['colors_by_category'] for cat in interactive_cats)
            
            if has_interactive:
                f.write("#### Button & Interactive State Colors\n\n")
                for cat in interactive_cats:
                    if cat in audit['colors_by_category']:
                        f.write(f"**{cat.title()} State:**\n\n")
                        colors = audit['colors_by_category'][cat]
                        unique = {c['color']: c for c in colors}
                        for color, info in unique.items():
                            f.write(f"- `{color}` ({info['property']})\n")
                        f.write("\n")
            
            # Border colors
            if 'border' in audit['colors_by_category']:
                f.write("#### Border Colors\n\n")
                colors = audit['colors_by_category']['border']
                unique_border = {c['color']: c for c in colors}
                for color in unique_border.keys():
                    f.write(f"- `{color}`\n")
                f.write("\n")
            
            # Shadow colors
            if 'shadow' in audit['colors_by_category']:
                f.write("#### Shadow Colors\n\n")
                colors = audit['colors_by_category']['shadow']
                unique_shadow = {c['color']: c for c in colors}
                for color in unique_shadow.keys():
                    f.write(f"- `{color}`\n")
                f.write("\n")
            
            # Gradients
            if 'gradient' in audit['colors_by_category']:
                f.write("#### Gradient Colors\n\n")
                colors = audit['colors_by_category']['gradient']
                f.write("_All color stops in gradients:_\n\n")
                for c in colors:
                    f.write(f"- `{c['color']}` in `{c['property']}`\n")
                f.write("\n")
            
            # Other/Special UI colors
            if 'other' in audit['colors_by_category']:
                f.write("#### Other/Special Colors\n\n")
                colors = audit['colors_by_category']['other']
                unique_other = {c['color']: c for c in colors}
                for color, info in unique_other.items():
                    f.write(f"- `{color}` (Property: `{info['property']}`)\n")
                f.write("\n")
            
            f.write("---\n\n")

def main():
    # Path to nari-swasthya-complete folder
    html_dir = Path("C:/Users/USER/Downloads/nari-sangha/apps/web/nari-swasthya-complete")
    
    if not html_dir.exists():
        print(f"ERROR: Directory not found: {html_dir}")
        return
    
    print(f"Starting HTML Color Audit...")
    print(f"Directory: {html_dir}\n")
    
    # Find all HTML files
    html_files = sorted(html_dir.glob("*.html"))
    print(f"Found {len(html_files)} HTML files\n")
    
    # Find CSS files
    css_files = sorted(html_dir.glob("*.css"))
    assets_dir = html_dir / "assets"
    if assets_dir.exists():
        css_files.extend(sorted(assets_dir.glob("*.css")))
    print(f"Found {len(css_files)} CSS files\n")
    
    # Audit each HTML file
    print("Auditing HTML files...")
    html_audits = []
    for filepath in html_files:
        audit = audit_html_file(filepath)
        if audit:
            html_audits.append(audit)
    
    print(f"\nAuditing CSS files...")
    css_audits = []
    for filepath in css_files:
        audit = audit_css_file(filepath)
        if audit:
            css_audits.append(audit)
    
    # Generate reports
    print("\nGenerating reports...")
    
    # JSON report
    json_output = Path("C:/Users/USER/Downloads/nari-sangha/html_color_audit.json")
    with open(json_output, 'w', encoding='utf-8') as f:
        json.dump({
            'html_pages': html_audits,
            'css_files': css_audits
        }, f, indent=2)
    print(f"✓ JSON report: {json_output}")
    
    # Markdown report
    md_output = Path("C:/Users/USER/Downloads/nari-sangha/HTML_COLOR_AUDIT_REPORT.md")
    generate_markdown_report(html_audits, css_audits, md_output)
    print(f"✓ Markdown report: {md_output}")
    
    print("\n✓ Color audit complete!")
    print(f"\nSummary:")
    print(f"  - {len(html_audits)} HTML pages audited")
    print(f"  - {len(css_audits)} CSS files audited")
    print(f"  - Reports saved to: {json_output.parent}")

if __name__ == "__main__":
    main()
