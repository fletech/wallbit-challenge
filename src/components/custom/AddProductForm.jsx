import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Stepper from "./Stepper";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { callToApi } from "../../lib/services/apiService";
import { cartService } from "../../lib/services/cartService";
import { useToast } from "../../hooks/use-toast";

export const AddProductForm = ({
  warning,
  setWarning,
  cart,
  setCart,
  cartAction,
  currentId,
  error,
  setError,
  products,
  setCurrentId,
  setCartAction,
}) => {
  const { toast } = useToast();
  const formSchema = z.object({
    id: z
      .string({
        required_error: "required field",
        invalid_type_error: "Product ID is required",
      })
      .min(1, "El ID de producto es requerido")
      .transform(Number)
      .refine(
        (val) => !isNaN(val) && val <= products.length,
        "ID de Producto no válido"
      ),

    qy: z.number().int().min(1, "Cantidad debe ser mayor a 0"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      qy: 1,
    },
    mode: "onChange",
  });

  const values = form.getValues();
  const product = cart?.find((item) => item.id == currentId);

  const handleIdChange = (e) => {
    const value = e.target.value;

    if (value === "" || /^\d+$/.test(value)) {
      setCurrentId(value);
      form.setValue("id", value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      return;
    }
  };

  async function onSubmit(values) {
    setError(null);

    const quantity = values.qy;
    const productID = values.id;
    if (cartAction == "Update") {
      cartService(setCart, {
        action: "update",
        productId: productID,
        quantity: quantity,
      });
      toast({
        variant: "success",
        className: "bg-blue-500 text-white ",
        title: "Cantidades actualizadas",
        description: `Ya está en tu carrito`,
      });
      form.setValue("qy", "", { shouldValidate: false });
      setCartAction(null);
      setCurrentId("");
      return;
    }

    try {
      const DATA = await callToApi(
        { singleProduct: productID },
        null,
        setError,
        "singleProduct"
      );
      cartService(setCart, {
        action: "add",
        product: DATA,
        quantity: quantity,
      });
      toast({
        variant: "success",
        className: "bg-green-400 border-green-400 text-white",
        title: "Producto agregado",
        description: `Ya está en tu carrito`,
      });
      setCartAction(null);
      setCurrentId("");
      form.reset();
    } catch (err) {
      toast({
        variant: "error",
        className: "bg-red-500 text-white ",
        title: "Error al agregar producto",
        description: `No se pudo agregar el producto al carrito`,
      });
      console.log(err);
    }
  }

  useEffect(() => {
    if (currentId) {
      setCartAction(null);
      setWarning(null);
      if (product) {
        if (product.id == currentId) {
          setCartAction(`Update`);
          setWarning(
            "Este producto ya está cargago en tu carrito, esta cantidad se sumará"
          );
          return;
        }

        if (product.id != currentId) {
          setCartAction("Add");
          setCurrentId(null);
          return;
        }
      }
    } else {
      setWarning(null);
    }
  }, [currentId, values.qy, products.length, product]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex gap-4"
      >
        <div className="flex gap-4 w-full">
          <FormField
            control={form.control}
            name="qy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad</FormLabel>
                <FormControl className="flex">
                  <Stepper
                    value={Number(field.value)}
                    onChange={(val) =>
                      form.setValue("qy", val, { shouldValidate: true })
                    }
                    isForm={true}
                  />
                </FormControl>
                <div className="absolute">
                  <FormDescription></FormDescription>

                  <FormMessage className="" />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>ID de Producto</FormLabel>
                <FormControl>
                  <Input
                    value={currentId}
                    onChange={handleIdChange}
                    onBlur={field.onBlur}
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder={`Insert a product ID between 1 and ${products.length}`}
                    autoComplete="off"
                  />
                </FormControl>
                <div className="absolute">
                  <FormDescription className="text-green-700">
                    {warning}
                  </FormDescription>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button variant="" type="submit">
          {cartAction == "Update" ? "+ Actualizar" : "+ Agregar"}
        </Button>
      </form>
    </Form>
  );
};
