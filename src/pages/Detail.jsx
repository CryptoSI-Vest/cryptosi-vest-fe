import { useParams } from "react-router-dom";
import ProgressBar from "../shared-components/ProgressBar";

const contract = {
  id: 1,
  name: "XYZ Token",
  type: "Hybrid",
  duration: "6 months",
  cliff: "2 months",
  releaseTime: Date.now(),
  beneficiaries: ["John Doe", "Jane Doe"],
  contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
  totalSupply: 1000,
  vestedAmount: 600,
  status: "Active",
  target: 5,
  unit: "USD",
  image:
    "https://s3-alpha-sig.figma.com/img/09bf/2eea/4f6bf4de1a0963b24726bb3b1b157c34?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VDQj~~Cj59Ro8ono114w34LEqCDHas4Mp6V0o0R-W5CYTqi9XSIYOECJmHrqqVz9eB7OE~J98LI0i~9Hs9oqg6fw-M12YsyZQS8IeR0ZPAIiZh97eWX4epTskUzYVb7D1lQ5A9Ojixeu2XJyNHivBsOApj8nJ0OlAoYtVweGA8bO9YVNjP3or0nDrlrj8UHHJm8PJNw0XoScTlhRqmuK6jDJi-XR8kXAcGLxTGdw0n6CqjYXqyN38H-uvk2DzXVHzmGIq0VF67W8JuC-DV9xSjOt58MQ-T2RvpTd9dJezsOsXglmOkSSf1T1I1ANnUc2d5ESdDNU6NHvCeO7ZyWfcQ__",
};

const Detail = () => {
  const address = useParams();
  console.log(address);
  return (
    <div className="px-4 py-16 sm:px-12 sm:py-24 flex max-h-screen w-full">
      <div className="rounded-xl shadow-md px-4 sm:px-12 sm:py-8 py-4 flex flex-col bg-[#6F9BFC33] dark:bg-[#252A3480] border-2 border-[#6F9BFC322] dark:border-black gap-4 flex-grow">
        <span className="text-center dark:text-white text-primary font-semibold text-3xl">
          Vesting Contract Details
        </span>
        <div className="flex gap-4 items-center bg-white dark:bg-black rounded-lg p-4 px-6 relative">
          <div className="flex flex-col gap-1 flex-grow dark:text-white">
            <span>
              <strong>Token:</strong> {contract.name}
            </span>
            <span>
              <strong>Total Vested:</strong> {contract.vestedAmount}
            </span>
            <span>
              <strong>Vesting Type:</strong> {contract.type}
            </span>
            <span>
              <strong>Unlock Condition:</strong> When the price recheas $
              {contract.target.toFixed(2)}
            </span>
            <span>
              <strong>And then:</strong> Unlocks linear over {contract.duration}
              , with a cliff of {contract.cliff}
            </span>
          </div>
          <img
            className="sm:w-20 w-16 aspect-square flex justify-center items-center rounded-full object-cover object-center absolute sm:relative top-4 right-4"
            src={contract.image}
            alt="logo"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-secondary text-lg dark:text-white font-semibold">
            Release Progress:
          </p>
          <ProgressBar maximum={100} value={80} />
        </div>
        <div className="flex flex-col gap-1 bg-white dark:bg-black dark:text-white rounded-lg p-4 px-6">
          <span>
            <strong>Token:</strong> {contract.name}
          </span>
          <span>
            <strong>Total Vested:</strong> {contract.vestedAmount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Detail;
