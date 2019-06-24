using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SandBoxV2.Models;
using SandBoxV2.Repositories.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SandBoxV2.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly IProductRepository _productRepo;

        public ProductController(IProductRepository productRepo)
        {
            _productRepo = productRepo;
        }
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<Product> Get()
        {
            try
            {
                return _productRepo.Items;
            }
            catch (Exception)
            {

                throw;
            }
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody] Product product)
        {
            _productRepo.Add(product);
        }

        [HttpPost("{name}")]
        public Product Post(string name, [FromBody] Product submittedProduct)
        {
            try
            {
                Product product = _productRepo.Items.Where(p => p.Name == name).FirstOrDefault();

                if(product == null)
                {
                    _productRepo.Add(submittedProduct);
                }

                return product;
            }
            catch (Exception)
            {

                throw;
            }
        }

        #region Later Implmentation
        /*
       

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
        */
        #endregion
    }
}
