const BenefitCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex items-start space-x-4 p-4 rounded-lg bg-slate-50">
      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h4 className="font-semibold text-slate-900 mb-1">{title}</h4>
        <p className="text-slate-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default BenefitCard;
