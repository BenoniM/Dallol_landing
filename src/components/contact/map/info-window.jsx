import DallolLogo from "../../../assets/icon/black.svg";

const InfoWindow = ({ pharmacy }) => {
  return (
    <div className="rounded-full bg-white w-full flex flex-col items-center">
      <div className="flex gap-2">
        <img src={DallolLogo} alt="droga-logo" height={80} className="!h-22" />
      </div>
      <div className="w-full border-t border-t-[#F0F0F0] my-2 mb-3" />
      <a
        href={`https://www.google.com/maps?q=${pharmacy.latitude},${pharmacy.longitude}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-secondary !text-white w-[90px] rounded-full py-2  text-center font-medium"
      >
        More Detail
      </a>
    </div>
  );
};

export default InfoWindow;
