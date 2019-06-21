using System.Collections.Generic;

namespace SandBoxV2.Repositories.Interfaces
{
    public interface IBaseItemRepository<T> where T : class
    {
        List<T> Items { get; set; }

        void Add(T item);
    }
}