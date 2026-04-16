import { ProductDto } from './product.schema';

export interface ProductsDto {
  products: ProductDto[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export type GetProductsResponseDto = ProductsDto;
