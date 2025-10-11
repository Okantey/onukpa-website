const PackageCard = ({
  plan,
  isSelected,
  onClick,
}: {
  plan: any;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
        isSelected
          ? "border-primary bg-primary/10"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold text-slate-900">{plan.name}</div>
          <div className="text-sm text-slate-600">{plan.requests}</div>
        </div>
        <div className="font-bold text-slate-900">{plan.price}</div>
      </div>
    </div>
  );
};

export default PackageCard;
