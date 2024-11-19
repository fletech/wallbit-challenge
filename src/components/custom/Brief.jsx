const BriefItem = ({ title, value, isPrice }) => {
  return (
    <div className="flex flex-col border-[1px] py-2 px-4 rounded-md">
      <span className="font-semibold text-center">{title}</span>
      <p className="font-light text-center">
        {isPrice ? `$ ${value.toFixed(2)}` : value}
      </p>
    </div>
  );
};

export const Brief = ({ briefData }) => {
  return (
    <div className="flex gap-4 w-full rounded-50 text-sm">
      <BriefItem title="Items" value={briefData.totalItems} />
      <BriefItem title="Total" value={briefData.totalPrice} isPrice={true} />
    </div>
  );
};
