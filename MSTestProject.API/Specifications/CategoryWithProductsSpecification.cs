using MSTestProject.API.Entities;

namespace MSTestProject.API.Specifications
{
    public class CategoryWithProductsSpecification : BaseSpecification<Category>
    {
        public CategoryWithProductsSpecification()
            : base()
        {
            AddInclude(c => c.Products);
            ApplyOrderBy(c => c.DisplayOrder);
        }

        public CategoryWithProductsSpecification(int categoryId)
            : base(c => c.Id == categoryId)
        {
            AddInclude(c => c.Products);
        }
    }
}
