using SandBoxV2.Models;
using SandBoxV2.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SandBoxV2.Repositories
{
    public class ProductRepository : BaseItemRepository<Product>, IProductRepository
    {
        public ProductRepository()
        {
        }

        public override void Add(Product item)
        {
            if (item == null)
            {
                throw new ArgumentException("product contains no values");
            }
            if (Items.Where(i => i.Name == item.Name).Count() == 0)
            {
                base.Add(item);
            }
            else
            {
                throw new ArgumentException("A product with the same name already exists in the system, please provide a different product name");
            }

        }

        private void LoadProducts()
        {
            Items.Add(new Product("Cleets01", "For running", 45));
            Items.Add(new Product("Helmet01", "For head Proection", 59));
            Items.Add(new Product("socks", "Hygenic", 10));
        }
    }
}
