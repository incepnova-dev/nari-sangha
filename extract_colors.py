import os
import re
import json
from collections import Counter

# Patterns
HEX_PATTERN = r'#(?:[0-9a-fA-F]{3,4}){1,2}\b'
RGB_PATTERN = r'rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)'
HSL_PATTERN = r'hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[\d.]+\s*)?\)'
VAR_PATTERN = r'var\(--[a-zA-Z0-9_-]+\)'
VAR_DEF_PATTERN = r'--[a-zA-Z0-9_-]+\s*:'

NAMED_COLORS = [
    'black', 'silver', 'gray', 'white', 'maroon', 'red', 'purple', 'fuchsia', 'green', 'lime', 'olive', 'yellow', 'navy', 'blue', 'teal', 'aqua',
    'aliceblue', 'antiquewhite', 'aquamarine', 'azure', 'beige', 'bisque', 'blanchedalmond', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse',
    'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkkhaki',
    'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkturquoise',
    'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'gainsboro', 'ghostwhite', 'gold',
    'goldenrod', 'greenyellow', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon',
    'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue',
    'lightslategray', 'lightsteelblue', 'lightyellow', 'limegreen', 'linen', 'magenta', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple',
    'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin',
    'navajowhite', 'oldlace', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip',
    'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna',
    'skyblue', 'slateblue', 'slategray', 'snow', 'springgreen', 'steelblue', 'tan', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'whitesmoke', 'yellowgreen'
]

def get_usage_type(line):
    line = line.lower()
    if 'background' in line: return 'background'
    if 'color' in line and 'background' not in line: return 'text'
    if 'border' in line: return 'border'
    if 'icon' in line: return 'icon'
    if 'shadow' in line: return 'shadow'
    if 'gradient' in line: return 'gradient'
    if 'hover' in line or 'active' in line or 'focus' in line: return 'hover/active/focus'
    if 'animation' in line: return 'animation'
    return 'other'

def scan_codebase(root_dir):
    color_inventory = []
    freq_counter = Counter()

    for root, dirs, files in os.walk(root_dir):
        if 'node_modules' in root or '.git' in root or 'dist' in root:
            continue
        
        for file in files:
            if file.endswith(('.tsx', '.jsx', '.ts', '.js', '.css', '.scss', '.html')):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        lines = f.readlines()
                        for i, line in enumerate(lines):
                            # Search for all patterns
                            matches = []
                            matches.extend(re.findall(HEX_PATTERN, line))
                            matches.extend(re.findall(RGB_PATTERN, line))
                            matches.extend(re.findall(HSL_PATTERN, line))
                            matches.extend(re.findall(VAR_PATTERN, line))
                            
                            # Specific check for named colors in property values
                            if ':' in line:
                                parts = line.split(':')
                                if len(parts) > 1:
                                    value_part = parts[1].strip().lower()
                                    for color in NAMED_COLORS:
                                        if color in value_part:
                                            # Avoid matching named colors within larger words or other hexes
                                            if re.search(fr'\b{color}\b', value_part):
                                                matches.append(color)

                            for match in matches:
                                if match.strip():
                                    usage = get_usage_type(line)
                                    color_inventory.append({
                                        'value': match,
                                        'file': filepath.replace(root_dir, ''),
                                        'line': i + 1,
                                        'usage': usage,
                                        'line_content': line.strip()
                                    })
                                    freq_counter[match] += 1
                except Exception as e:
                    pass
    
    return color_inventory, freq_counter

if __name__ == "__main__":
    root = "C:\\Users\\USER\\Downloads\\nari-sangha"
    inventory, frequency = scan_codebase(root)
    
    result = {
        'inventory': inventory,
        'frequency': dict(frequency.most_common())
    }
    
    with open('color_audit_results.json', 'w') as f:
        json.dump(result, f)
