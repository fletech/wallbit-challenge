import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { Input } from "@/components/ui/input";

const ButtonStepper = ({ operation, children }) => {
  return (
    <Button
      type="button"
      size="icon"
      className="h-auto w-fit-content bg-black text-white rounded-full"
      onClick={operation}
    >
      {children}
    </Button>
  );
};

function Stepper({ form, field, ...props }) {
  const buttonOperation = (x) => {
    const operation = {
      plus: 1,
      minus: -1,
    };
    const currentValue = Number(field.value) || 0;

    if (currentValue + operation[x] < 1) {
      return;
    }
    form.setValue("qy", String(currentValue + operation[x]), {
      shouldValidate: true,
    });
  };
  return (
    <div className="flex items-center gap-1">
      <ButtonStepper operation={() => buttonOperation("minus")}>
        <MinusIcon className="" />
      </ButtonStepper>
      <Input
        {...field}
        placeholder="eg: 1"
        className="w-20 text-center [appearance:number] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        type="number"
        min={1}
        pattern="[1-9]*"
        autoComplete="off"
      />
      <ButtonStepper operation={() => buttonOperation("plus")}>
        <PlusIcon className="" />
      </ButtonStepper>
    </div>
  );
}
export default Stepper;
