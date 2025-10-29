export interface SaleItemResponse {
  product: string;
  price: number;
  amount: number;
  subtotal: number;
}

export interface SaleResponse {
  idSale: number;
  total: number;
  date: string; 
  saleItemRequestList: SaleItemResponse[];
}
