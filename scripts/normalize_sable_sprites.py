from pathlib import Path
from PIL import Image, ImageEnhance

SABLE_DIR = Path('/home/capy-test/assets/sprites/sable')
REFERENCE = 'neutral.png'
TARGETS = ['happy.png', 'blush.png', 'teasing.png', 'menhera-cry.png', 'denpa-smile.png']
MAIN_FILES = [REFERENCE, *TARGETS]


def get_skin_stats(img: Image.Image):
    rgba = img.convert('RGBA')
    pixels = rgba.load()
    width, height = rgba.size
    total_r = 0
    total_g = 0
    total_b = 0
    count = 0
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if a > 200 and r > 150 and g > 100 and b > 80 and r > b:
                total_r += r
                total_g += g
                total_b += b
                count += 1
    if not count:
        return None
    avg_r = total_r / count
    avg_g = total_g / count
    avg_b = total_b / count
    brightness = (avg_r + avg_g + avg_b) / 3
    return avg_r, avg_g, avg_b, brightness


def apply_channel_balance(img: Image.Image, channel_ratios, brightness_ratio):
    rgba = img.convert('RGBA')
    r, g, b, a = rgba.split()
    r = r.point(lambda value: min(255, round(value * channel_ratios[0])))
    g = g.point(lambda value: min(255, round(value * channel_ratios[1])))
    b = b.point(lambda value: min(255, round(value * channel_ratios[2])))
    balanced = Image.merge('RGB', (r, g, b))
    balanced = ImageEnhance.Brightness(balanced).enhance(brightness_ratio)
    out = balanced.convert('RGBA')
    out.putalpha(a)
    return out


def main():
    for name in MAIN_FILES:
        path = SABLE_DIR / name
        if not path.exists():
            raise FileNotFoundError(path)

    reference_image = Image.open(SABLE_DIR / REFERENCE)
    reference_stats = get_skin_stats(reference_image)
    if not reference_stats:
        raise RuntimeError('Could not determine reference skin stats')

    for target in TARGETS:
        path = SABLE_DIR / target
        img = Image.open(path)
        stats = get_skin_stats(img)
        if not stats:
            print(f'Skipped {target}: no skin-like pixels found')
            continue

        channel_ratios = tuple(reference_stats[i] / stats[i] for i in range(3))
        brightness_ratio = reference_stats[3] / stats[3]
        adjusted = apply_channel_balance(img, channel_ratios, brightness_ratio)
        adjusted.save(path)

        new_stats = get_skin_stats(adjusted)
        print(
            f'Adjusted {target}: '
            f'RGB ratios {channel_ratios[0]:.3f}/{channel_ratios[1]:.3f}/{channel_ratios[2]:.3f}, '
            f'brightness {brightness_ratio:.3f}, '
            f'new skin avg {new_stats[0]:.2f}/{new_stats[1]:.2f}/{new_stats[2]:.2f} '
            f'({new_stats[3]:.2f})'
        )


if __name__ == '__main__':
    main()
