export const cartService = (setState = null, options = null) => {
  const cartID = "cart";
  const cartTimestampID = "cartTimestamp";

  const getCart = () => {
    const storedCart = localStorage.getItem(cartID);
    return storedCart ? JSON.parse(storedCart) : null;
  };

  const saveCart = (cart) => {
    if (!cart || cart.length === 0) clearCart();
    localStorage.setItem(cartID, JSON.stringify(cart));
    console.log(cart);
    setState?.(cart);
    return cart;
  };

  const getTimestamp = () => {
    return localStorage.getItem(cartTimestampID);
  };

  const saveTimestamp = () => {
    localStorage.setItem(cartTimestampID, new Date().toISOString());
  };

  const clearCart = () => {
    localStorage.removeItem(cartID);
    localStorage.removeItem(cartTimestampID);
    setState?.([]);
  };

  if (!options) {
    const existingCart = getCart();

    if (existingCart) {
      setState?.(existingCart);
    }
    return existingCart;
  }

  switch (options.action) {
    case "add": {
      let cart = getCart() || [];

      if (cart.length === 0) {
        saveTimestamp();
      }

      return saveCart([
        ...cart,
        { ...options.product, quantity: options.quantity },
      ]);
    }

    case "remove": {
      const cart = getCart();
      const newCart = cart.filter((item) => item.id !== options.productId);
      return saveCart(newCart);
    }

    case "update": {
      const cart = getCart();
      const newCart = cart.map((item) => {
        if (item.id == options.productId) {
          return { ...item, quantity: item.quantity + options.quantity };
        }
        return item;
      });

      return saveCart(newCart);
    }

    case "clear": {
      localStorage.removeItem(cartID);
      localStorage.removeItem(cartTimestampID);
      setState?.([]);
      return [];
    }
    case "getTimestamp": {
      return getTimestamp();
    }

    default:
      return getCart();
  }
};
