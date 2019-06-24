using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


namespace SandBoxV2.Models
{
    public class Product
    {
        public  Product(string name, string description, int quantity)
        {
            Name = name;
            Description = description;
            Quantity = quantity;
        }

        [Required(ErrorMessage = "Product Name is required")]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required(ErrorMessage = "Quantity is required")]
        public int Quantity { get; set; }
    }
}
