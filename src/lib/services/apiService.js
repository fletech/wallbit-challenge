import { toast } from "../../hooks/use-toast";

export const callToApi = async (options, setState, setError, url) => {
  const baseURL = "https://fakestoreapi.com";
  const urls = {
    products: `${baseURL}/products`,
    categories: `${baseURL}/products/categories`,
    singleProduct: `${baseURL}/products/${options?.singleProduct}`,
    limitedProducts: `${baseURL}/products?limit=${options?.limit}`,
  };
  let DATA = null;
  try {
    const RES = await fetch(urls[url]);
    DATA = await RES.json();
    setState && setState(DATA);
  } catch (err) {
    toast({
      variant: "error",
      className: "bg-red-500 text-white ",
      title: "Error al agregar producto",
      description: `No se pudo agregar el producto al carrito`,
    });
    setError ?? setError(err);
  }
  return await DATA;
};
