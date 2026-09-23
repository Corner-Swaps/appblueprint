import sys
import os
from PIL import Image, ImageDraw

def composite_device(raw_screen_path, device_type, out_path):
    raw_img = Image.open(raw_screen_path).convert('RGBA')
    
    if device_type == 'iphone':
        bezel_path = os.path.join(os.path.dirname(__file__), 'apple_bezels', 'iphone_18_pro_max_black.png')
        bezel = Image.open(bezel_path).convert('RGBA')
        bw, bh = bezel.size # (1470, 3000)
        
        # Target screen size in bezel: 1320 x 2868, offset: (75, 66)
        if raw_img.size != (1320, 2868):
            raw_img = raw_img.resize((1320, 2868), Image.Resampling.LANCZOS)
        
        # Rounded corner mask for screen (iPhone 16/18 Pro Max radius ~ 170px at 3x)
        mask = Image.new('L', (1320, 2868), 0)
        draw = ImageDraw.Draw(mask)
        draw.rounded_rectangle([(0, 0), (1320, 2868)], radius=170, fill=255)
        raw_img.putalpha(mask)
        
        # Create framed device
        framed = Image.new('RGBA', (bw, bh), (0, 0, 0, 0))
        framed.paste(raw_img, (75, 66), raw_img)
        framed.paste(bezel, (0, 0), bezel)
        
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        framed.save(out_path, 'PNG', optimize=True)
        print(f'Saved iPhone framed device: {out_path} ({bw}x{bh})')
        
    elif device_type == 'ipad':
        bezel_path = os.path.join(os.path.dirname(__file__), 'apple_bezels', 'ipad_pro_13_space_black.png')
        bezel = Image.open(bezel_path).convert('RGBA')
        bw, bh = bezel.size # (2300, 3000)
        
        # Target screen size in bezel: 2064 x 2752, offset: (118, 124)
        if raw_img.size != (2064, 2752):
            raw_img = raw_img.resize((2064, 2752), Image.Resampling.LANCZOS)
            
        # Rounded corner mask for iPad (radius ~ 50px at 2x)
        mask = Image.new('L', (2064, 2752), 0)
        draw = ImageDraw.Draw(mask)
        draw.rounded_rectangle([(0, 0), (2064, 2752)], radius=50, fill=255)
        raw_img.putalpha(mask)
        
        # Create framed device
        framed = Image.new('RGBA', (bw, bh), (0, 0, 0, 0))
        framed.paste(raw_img, (118, 124), raw_img)
        framed.paste(bezel, (0, 0), bezel)
        
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        framed.save(out_path, 'PNG', optimize=True)
        print(f'Saved iPad framed device: {out_path} ({bw}x{bh})')
    else:
        raise ValueError(f'Unknown device_type: {device_type}')

if __name__ == '__main__':
    if len(sys.argv) < 4:
        print('Usage: python3 composite_device.py <raw_screen_path> <iphone|ipad> <out_path>')
        sys.exit(1)
    composite_device(sys.argv[1], sys.argv[2], sys.argv[3])
