import json
import re
import os
import pyperclip

os.chdir(os.path.dirname(os.path.abspath(__file__)))


def hex_to_rgb(hex_color):
    # Remove the '#' if present
    hex_color = hex_color.lstrip('#')
    # Check if the hex is in 3-digit format and expand it
    if len(hex_color) == 3:
        hex_color = ''.join([c*2 for c in hex_color])
    # Convert hex to RGB
    return ', '.join(str(int(hex_color[i:i+2], 16)) for i in (0, 2, 4))


def process_colors(color_obj):
  variables = {}
  for key, value in color_obj.items():
    if isinstance(value, dict):
      for shade, hex_color in value.items():
        var_name = f"{key}-{shade}"
        variables[var_name] = hex_to_rgb(hex_color)
        color_obj[key][shade] = f"rgba(var(--{var_name}))"
    elif isinstance(value, str) and re.match(r'^#[0-9a-fA-F]{6}$', value):
        variables[f"{key}"] = hex_to_rgb(value)
        color_obj[key] = f"rgba(var(--{key}))"
  return color_obj, variables

def generate_css_variables(theme_colors):
    css_vars = []
    for var_name, hex_color in theme_colors.items():
        css_vars.append(f"    --{var_name}: {hex_color};")
    return '\n'.join(css_vars)

# Read the colors.json file
with open('colors.json', 'r') as f:
    colors_data = json.load(f)

# Process light and dark themes
colors_data['themes']['light']['colors'], light_theme = process_colors(colors_data['themes']['light']['colors'])
colors_data['themes']['dark']['colors'], dark_theme = process_colors(colors_data['themes']['dark']['colors'])

# Generate CSS variables
light_css = generate_css_variables(light_theme)
dark_css = generate_css_variables(dark_theme)
  # Using light theme as reference

with open('Mystia.css', 'w') as f:
  f.write(":root {\n")
  f.write(light_css)
  f.write("\n}\n")
with open('Kasodani.css', 'w') as f:
  f.write(".dark {\n")
  f.write(dark_css)
  f.write("\n}\n")

tw_config = {"theme": {"extend": colors_data['themes']['light']}}
print(json.dumps(tw_config, indent=2))
pyperclip.copy(json.dumps(tw_config, indent=2))