import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headline } from "./Headline";
import Stepper from "./Stepper";

export const ProductCard = ({ item, onQuantityChange, onDelete }) => {
  return (
    <Card className="w-full flex items-center  justify-start h-auto border-0 shadow-none border-b-[1px]  ">
      <CardContent className="flex  gap-6 items-center w-full py-6 px-12 justify-between">
        <div className="flex md:flex-row flex-col gap-4 md:w-[50%]">
          <div className="w-auto items-center h-auto justify-between">
            <img
              src={item.image}
              alt={item.title}
              className="w-32 h-32 object-fill"
            />
          </div>
          <div className="flex flex-col w-full md:max-w-[400px]">
            <small className="mb-4 text-white font-normal text-[12px] bg-black w-max px-3 py-1 rounded-full ">
              ID {item.id}
            </small>
            <p className="mb-4 font-extrabold uppercase text-gray-800 w-auto ">
              {item.title}
            </p>
            <Button
              variant="outline"
              onClick={() => onDelete(item.id)}
              className="w-min border-[1px] border-red-400 text-red-400 hover:bg-red-500 hover:text-white py-2 px-4 text-sm "
            >
              Delete
            </Button>
          </div>
        </div>
        <div className="flex sm:flex-row gap-6 flex-col-reverse">
          <Stepper value={item.quantity} onChange={onQuantityChange} />

          <div className="flex gap-4 flex-col items-center">
            <h2 className="font-semibold">Total</h2>
            <p className="font-bold text-xl text-center">
              $ {(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
