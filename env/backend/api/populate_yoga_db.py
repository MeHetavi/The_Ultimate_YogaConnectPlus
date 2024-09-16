from django.core.management.base import BaseCommand
from .models import Category, Company, Product, ProductImage
from django.core.files.images import ImageFile
from django.conf import settings
import os

class Command(BaseCommand):
    help = 'Populates the database with yoga-related sample data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Populating database with yoga products...')

        # Create main category
        yoga = Category.objects.create(name='Yoga')

        # Create subcategories
        wearables = Category.objects.create(name='Wearables', parent=yoga)
        essentials = Category.objects.create(name='Essentials', parent=yoga)
        accessories = Category.objects.create(name='Accessories', parent=yoga)
        storage = Category.objects.create(name='Storage & Maintenance', parent=yoga)

        # Create companies
        zen_harmony = Company.objects.create(name='Zen Harmony', website='https://www.zenharmony.com')
        lotus_leaf = Company.objects.create(name='Lotus Leaf', website='https://www.lotusleaf.com')
        om_serenity = Company.objects.create(name='Om Serenity', website='https://www.omserenity.com')
        chakra_balance = Company.objects.create(name='Chakra Balance', website='https://www.chakrabalance.com')
        mindful_motion = Company.objects.create(name='Mindful Motion', website='https://www.mindfulmotion.com')

        # Create products
        products = [
            # Wearables
            Product(name='Harmony Leggings', description='High-waisted, moisture-wicking leggings', price=78.00, category=wearables, company=zen_harmony, sku='ZENH-HL-001', stock_quantity=100),
            Product(name='Serenity Tank Top', description='Breathable, stretchy tank top', price=48.00, category=wearables, company=om_serenity, sku='OMSR-ST-001', stock_quantity=150),
            
            # Essentials
            Product(name='Lotus Pro Mat', description='High-density cushion, non-slip surface', price=110.00, category=essentials, company=lotus_leaf, sku='LTLF-PM-001', stock_quantity=75),
            Product(name='Chakra Cork Block', description='Sustainable cork block for support', price=24.00, category=essentials, company=chakra_balance, sku='CHKB-CB-001', stock_quantity=200),
            
            # Accessories
            Product(name='Mindful Strap', description='Durable cotton strap for stretching', price=18.00, category=accessories, company=mindful_motion, sku='MNDM-MS-001', stock_quantity=250),
            Product(name='Zen Meditation Cushion', description='Comfortable zafu cushion for meditation', price=65.00, category=accessories, company=zen_harmony, sku='ZENH-MC-001', stock_quantity=100),
            
            # Storage & Maintenance
            Product(name='Lotus Carry-All Bag', description='Spacious bag for mat and accessories', price=40.00, category=storage, company=lotus_leaf, sku='LTLF-CB-001', stock_quantity=120),
            Product(name='Om Fresh Mat Spray', description='Natural, non-toxic mat cleaner', price=14.00, category=storage, company=om_serenity, sku='OMSR-MS-001', stock_quantity=300),
            
            # Additional products
            Product(name='Chakra Alignment Towel', description='Non-slip, absorbent yoga towel', price=42.00, category=accessories, company=chakra_balance, sku='CHKB-AT-001', stock_quantity=180),
            Product(name='Mindful Motion Wheel', description='Dharma wheel for backbends and stretching', price=38.00, category=accessories, company=mindful_motion, sku='MNDM-MW-001', stock_quantity=90),
        ]

        # Bulk create products
        Product.objects.bulk_create(products)

        # Add product images
        image_dir = os.path.join(settings.BASE_DIR, 'media/product_images')
        
        if os.path.exists(image_dir):
            for product in Product.objects.all():
                image_path = os.path.join(image_dir, f'{product.name.lower().replace(" ", "_")}.jpg')
                if os.path.exists(image_path):
                    with open(image_path, 'rb') as f:
                        image = ImageFile(f)
                        ProductImage.objects.create(
                            product=product,
                            image=image,
                            is_primary=True,
                            alt_text=f'{product.name} image'
                        )
                else:
                    self.stdout.write(self.style.WARNING(f'Image not found for {product.name}'))

        self.stdout.write(self.style.SUCCESS('Database populated successfully with yoga products!'))
