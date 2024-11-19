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
    console.error(err);
    //setToast con el error

    setError ?? setError(err);
  }
  return await DATA;
};
