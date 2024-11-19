import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

function Stepper({ value, onChange, isForm }) {
  const buttonOperation = (x) => {
    const operation = {
      plus: 1,
      minus: -1,
    };

    if (isForm) {
      const currentValue = Number(value) || 0;
      if (currentValue + operation[x] < 1) return;
      onChange(Number(currentValue + operation[x]));
    } else {
      onChange(operation[x]);
    }
  };

  useEffect(() => {
    if (value < 1) {
      onChange(1);
    }
  }, [value]);

  return (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        size="icon"
        className="h-auto w-fit-content bg-black text-white rounded-full"
        onClick={() => buttonOperation("minus")}
      >
        <MinusIcon className="" />
      </Button>
      <Input
        onChange={(e) => onChange(Number(e.target.value))}
        value={value}
        className="w-20 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        type="number"
        min={1}
      />
      <Button
        type="button"
        size="icon"
        className="h-auto w-fit-content bg-black text-white rounded-full"
        onClick={() => buttonOperation("plus")}
      >
        <PlusIcon className="" />
      </Button>
    </div>
  );
}
export default Stepper;
