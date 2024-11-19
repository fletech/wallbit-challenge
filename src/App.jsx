import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { callToApi } from "./lib/services/apiService";
import { cartService } from "./lib/services/cartService";
import { AddProductForm } from "./components/custom/AddProductForm";

import { Headline } from "./components/custom/Headline";

function App() {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const [cartAction, setCartAction] = useState(null);
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

  const onDelete = (id) => {
    cartService(setCart, { action: "remove", productId: id });
  };

  const onClear = () => {
    cartService(setCart, { action: "clear" });
  };

  return (
    <div className="w-screen min-h-screen flex flex-col justify-start items-center p-8 ">
      <div className="p-8 min-w-[75%] rounded-xl">
        <Headline
          hierarchy="main"
          cn={
            "inline-block border-2 border-black rounded-lg p-2 px-6 mb-4 w-fit-content"
          }
        >
          {"{GuessID App}"}
        </Headline>
        <Card className="w-auto flex flex-col  justify-start h-auto border-0 rounded-md">
          <CardHeader className="space-y-2 ">
            <Headline hierarchy="secondary">Add a product</Headline>
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
          <CardHeader className="space-y-2 ">
            <Headline hierarchy="secondary">Cart</Headline>
          </CardHeader>
          {cart.length == 0 ? (
            <CardContent>
              <small className="text-gray-800">
                Your cart is empty, may you adding a product by its ID
              </small>
            </CardContent>
          ) : (
            <CardContent className="p-0 ">
              <div className="flex flex-col gap-4 ">
                {cart.map((item) => {
                  return (
                    <Card
                      key={item.id}
                      className="w-auto flex flex-col  justify-start h-auto border-0 shadow-none border-b-[1px] "
                    >
                      <CardHeader className="space-y-2 ">
                        <Headline hierarchy="secondary">{item.title}</Headline>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-4">
                          <div className="flex flex-col gap-4">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-32 h-32"
                            />
                            <small className="text-red-500">{item.price}</small>
                          </div>
                          <div className="flex gap-4">
                            <div className="flex gap-4">
                              <Button
                                className="bg-red-500"
                                onClick={() => onDelete(item.id)}
                              >
                                Delete
                              </Button>
                              <small>Quantity: {item.quantity}</small>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-auto w-fit-content bg-black text-white rounded-full"
                                onClick={() => {
                                  form.setValue("id", String(item.id), {
                                    shouldValidate: true,
                                  });
                                  form.setValue("qy", String(item.quantity), {
                                    shouldValidate: true,
                                  });
                                }}
                              >
                                <PlusIcon className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-auto w-fit-content bg-black text-white rounded-full"
                                onClick={() => {
                                  form.setValue("id", String(item.id), {
                                    shouldValidate: true,
                                  });
                                  form.setValue("qy", String(item.quantity), {
                                    shouldValidate: true,
                                  });
                                }}
                              >
                                <MinusIcon className="h-2 w-2" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
export default App;
