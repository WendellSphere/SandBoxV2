using SandBoxV2.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SandBoxV2.Repositories
{
    public class BaseItemRepository<T> : IBaseItemRepository<T> where T : class
    {
        private static List<T> _items = new List<T>();

        public virtual List<T> Items { get { return _items; }  set { _items = value; } }

        public virtual void Add(T item)
        {
            _items.Add(item);
        }
    }
}
