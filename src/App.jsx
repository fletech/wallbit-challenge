import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";

import { callToApi } from "./lib/services/apiService";
import { cartService } from "./lib/services/cartService";
import { AddProductForm } from "./components/custom/AddProductForm";
import { Headline } from "./components/custom/Headline";
import { ProductCard } from "./components/custom/ProductCard";
import { Brief } from "./components/custom/Brief";
import { useToast } from "./hooks/use-toast";

function App() {
  const { toast } = useToast();

  const [cart, setCart] = useState([]);
  const [cartAction, setCartAction] = useState(null);
  const [error, setError] = useState(null);
  const [cartBrief, setCartBrief] = useState({
    totalItems: 0,
    totalPrice: 0,
    timeStamp: 0,
  });

  const [warning, setWarning] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    callToApi(null, setProducts, null, "products");
    const savedCart = cartService(setCart);
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  useEffect(() => {
    let totalItems = 0;
    let totalPrice = 0;
    cart.forEach((item) => {
      totalItems += item.quantity;
      totalPrice += item.price * item.quantity;
    });

    const timeStampLS = localStorage.getItem("cartTimestamp");
    const timestamp = new Date(timeStampLS).toLocaleDateString("es");
    setCartBrief({
      totalItems,
      totalPrice,
      timeStamp: timestamp,
    });
  }, [cart]);

  const onDelete = (id) => {
    cartService(setCart, { action: "remove", productId: id });
    toast({
      variant: "error",
      className: "bg-red-500 text-white ",
      title: "Producto eliminado",
      description: `Ya no está en el carrito`,
    });
  };

  const onClear = () => {
    cartService(setCart, { action: "clear" });
    toast({
      variant: "error",
      className: "bg-red-500 text-white ",
      title: "Carrito vacío",
      description: `Ya no tiene productos agregados`,
    });
  };

  return (
    <div className="w-screen min-h-screen flex flex-col justify-start items-center p-8 ">
      <div className="p-8 min-w-[75%] rounded-xl">
        <Toaster />
        <Headline
          hierarchy="secondary"
          cn={
            "inline-block border-2 border-black rounded-lg p-2 px-6 mb-4 w-fit-content "
          }
        >
          Tienda el topo
        </Headline>
        <Card className="w-auto flex flex-col  justify-start h-auto border-0 rounded-md">
          <CardHeader className="space-y-2 ">
            <Headline hierarchy="secondary">Agregar un producto</Headline>
          </CardHeader>
          <CardContent>
            <AddProductForm
              products={products}
              cart={cart}
              setCart={setCart}
              cartAction={cartAction}
              currentId={currentId}
              setCurrentId={setCurrentId}
              setCartAction={setCartAction}
              warning={warning}
              error={error}
              setError={setError}
              setWarning={setWarning}
            ></AddProductForm>
          </CardContent>
          <CardFooter>
            <small className="text-red-500">{error}</small>
          </CardFooter>
        </Card>
        {/* CART */}
        <Card className="w-auto flex flex-col  justify-start h-auto border-0 mt-4  rounded-md ">
          <CardHeader className=" border-b rounded-b-md">
            <div className="w-full flex items-center justify-between gap-8 ">
              <Headline hierarchy="secondary" className="inline-block w-max">
                Tu carrito
              </Headline>
              {cart.length != 0 && (
                <>
                  <Brief briefData={cartBrief} />

                  <Button
                    onClick={onClear}
                    className="w-fit bg-red-500 hover:bg-red-600"
                  >
                    Limpiar carrito
                  </Button>
                </>
              )}
            </div>
          </CardHeader>
          {cart.length == 0 ? (
            <CardContent className="pt-4">
              <small className="text-gray-800 ">
                No hay productos cargados, agregá uno para comenzar.
              </small>
            </CardContent>
          ) : (
            <CardContent className="p-0 ">
              <div className="flex flex-col gap-4 ">
                {cart.map((item) => {
                  return (
                    <ProductCard
                      item={item}
                      key={item.id}
                      onDelete={onDelete}
                      onQuantityChange={(quantity) =>
                        cartService(setCart, {
                          action: "update",
                          productId: item.id,
                          quantity,
                        })
                      }
                    />
                  );
                })}
              </div>
            </CardContent>
          )}
          {cart.length != 0 && (
            <CardFooter>
              <div className="flex items-center justify-center w-full mt-6">
                <small className="text-center text-gray-600">
                  Carrito guardado el {cartBrief.timeStamp}
                </small>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
export default App;
