import favicon from "../../assets/favicon.png";

const WhatsAppMockup = () => {
  return (
    <div className="relative animate-on-scroll">
      <div className="relative bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
        <div className="bg-primary rounded-t-xl rounded-b-lg p-4 -mx-6 -mt-6 mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={favicon}
              alt="Onukpa"
              className="w-10 md:w-fit h-10 rounded-full border border-white object-contain"
            />
            <div>
              <div className="text-white font-semibold">Onukpa</div>
              <div className="text-primary-100 text-sm">Online • WhatsApp</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-start">
            <div className="bg-slate-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
              <p className="text-slate-800">
                Hi Onukpa! Looking for a 2-bedroom apartment in East Legon
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-primary/10 rounded-2xl rounded-tr-none px-4 py-3 max-w-xs border border-primary/20">
              <p className="text-slate-800">
                🏠 Found 5 verified apartments in East Legon! Starting from GHS
                1,500/month
              </p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-slate-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
              <p className="text-slate-800">
                Can you show me the one with parking?
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-2xl animate-float border border-slate-200">
        🏠
      </div>
      <div
        className="absolute -bottom-4 -left-4 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-2xl animate-float border border-slate-200"
        style={{ animationDelay: "1s" }}
      >
        🏢
      </div>
    </div>
  );
};

export default WhatsAppMockup;
