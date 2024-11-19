import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Stepper from "./Stepper";
import { useEffect } from "react";
import { callToApi } from "../../lib/services/apiService";
import { cartService } from "../../lib/services/cartService";

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
  const formSchema = z.object({
    id: z
      .string({
        required_error: "required field",
        invalid_type_error: "Product ID is required",
      })
      .min(1, "Product ID is required")
      .transform(Number)
      .refine(
        (val) => !isNaN(val) && val <= products.length,
        `Product ID not found`
      ),

    qy: z
      .string()
      .regex(/^\d+$/)
      .refine((val) => {
        const num = Number(val);

        return num >= 1;
      }, "Must be greater than 0")
      .transform(Number),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      qy: "",
    },
    mode: "onChange",
  });

  const values = form.getValues();
  console.log(cart);
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
      setCartAction(null);
      setCurrentId("");
      form.reset();
    } catch (err) {
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
            "This product is already in your cart, this quantity will be added"
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
                <FormLabel>Quantity</FormLabel>
                <FormControl className="flex">
                  <Stepper form={form} field={field} productAdded={product} />
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
                <FormLabel>Product ID</FormLabel>
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
          {cartAction || "Add"}
        </Button>
      </form>
    </Form>
  );
};
