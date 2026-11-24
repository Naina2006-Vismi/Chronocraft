import json
import random
import os

BRANDS = ["Rolex", "Omega", "Seiko", "Tudor", "Grand Seiko", "Cartier"]
MODELS = {
    "Rolex": ["Submariner", "Datejust", "Daytona", "Explorer"],
    "Omega": ["Speedmaster", "Seamaster", "Aqua Terra", "Constellation"],
    "Seiko": ["Prospex", "Presage", "5 Sports", "Astron"],
    "Tudor": ["Black Bay", "Pelagos", "Ranger"],
    "Grand Seiko": ["Snowflake", "White Birch", "Spring Drive"],
    "Cartier": ["Tank", "Santos", "Pasha"]
}

STYLES = ["Diver", "Dress", "Chronograph", "Field", "Aviation"]
CASE_MATERIALS = ["Steel", "Gold", "Rose Gold", "Titanium", "Ceramic"]
DIAL_COLORS = ["Black", "White", "Blue", "Green", "Silver", "Champagne"]
STRAP_TYPES = ["Metal Bracelet", "Leather", "Rubber", "NATO"]

def generate_mock_watches(count=50):
    watches = []
    for i in range(1, count + 1):
        brand = random.choice(BRANDS)
        model = random.choice(MODELS[brand])
        style = random.choice(STYLES)
        case_mat = random.choice(CASE_MATERIALS)
        dial_col = random.choice(DIAL_COLORS)
        strap = random.choice(STRAP_TYPES)

        # Base pricing based on brand
        base_prices = {
            "Rolex": 10000,
            "Omega": 6000,
            "Grand Seiko": 5500,
            "Cartier": 4000,
            "Tudor": 3500,
            "Seiko": 500
        }

        base_price = base_prices[brand]

        # Add variance
        ref_price = base_price * random.uniform(0.8, 1.5)
        # Current price slightly discounted sometimes
        curr_price = ref_price * random.uniform(0.85, 1.0)

        watch = {
            "id": i,
            "brand": brand,
            "model": model,
            "reference_price": round(ref_price, 2),
            "current_price": round(curr_price, 2),
            "currency": "USD",
            "style": style,
            "attributes": {
                "case_material": case_mat,
                "dial_color": dial_col,
                "strap_type": strap
            },
            # Dummy images using placehold.co with colors
            "image_url": f"https://placehold.co/400x400/{'171717' if dial_col == 'Black' else 'e5e7eb'}/cccccc?text={brand.replace(' ', '+')}+{model.replace(' ', '+')}"
        }
        watches.append(watch)

    return watches

if __name__ == "__main__":
    os.makedirs(os.path.join(os.path.dirname(__file__), '..', 'data'), exist_ok=True)
    data = generate_mock_watches(50)
    filepath = os.path.join(os.path.dirname(__file__), '..', 'data', 'watches.json')
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)
    print(f"Generated {len(data)} mock watches at {filepath}")
