using AutoMapper;
using MSTestProject.API.DTOs;
using MSTestProject.API.Entities;

namespace MSTestProject.API.Mappings.Automapper;

public class DefaultProfile : Profile
{
    public DefaultProfile()
    {
        // Category Mapping
        CreateMap<Category, CategoryDto>().ReverseMap()
            .ForMember(
                dest => dest.Products,
                opt => opt.Ignore());

        // Product Mapping
        CreateMap<Product, ProductDto>().ReverseMap()
            .ForMember(
                dest => dest.Category,
                opt => opt.Ignore());
    }
}
