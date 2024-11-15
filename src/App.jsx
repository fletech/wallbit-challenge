import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

function Headline({ children, ...props }) {
  const classNames = "mb-8 uppercase font-extrabold tracking-wider";
  const hierarchyClasses = {
    main: { className: `${classNames} text-lg tracking-wider` },
    secundary: { className: `${classNames} text-sm tracking-lg` },
  };
  const { hierarchy } = props;

  return <h3 className={hierarchyClasses[hierarchy].className}>{children}</h3>;
}

function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center p-8 ">
      <div className="p-8 min-w-[75%] bg-white border-[1px] rounded-xl ">
        <Headline hierarchy="main">Tienda de snippets</Headline>
        <Card className="w-auto">
          <CardHeader>
            <Headline hierarchy="secundary">Agregar un producto</Headline>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
export default App;
