import { ContractCard } from "../components/ContractCard";
import { contracts } from "../constants/contracts";
import Dropdown from "../shared-components/Dropdown";

const vestingTypes = [
  "Time Based Vesting",
  "Price Based Vesting",
  "Hybrid Vesting",
];
const statuses = ["Active", "Pending", "Completed"];
const devType = ["Developer", "Non-Developer"];
const Explorer = () => {
  const handleVestingType = (type) => {};
  const handleVestingStatus = (status) => {};
  const handlerDevType = (type) => {};
  return (
    <div className="px-4 py-16 sm:px-12 sm:py-24 flex max-h-screen w-full">
      <div className="rounded-xl shadow-md px-4 sm:px-12 py-8 flex flex-col bg-white dark:bg-[#252A3480] gap-6 border-2 border-white dark:border-black">
        <span className="text-center text-dark-primary dark:text-white font-semibold text-3xl">
          Explore Public Vesting Contracts
        </span>
        <div className="flex gap-4 flex-col sm:flex-row">
          <input
            type="text"
            placeholder="Search by token name or address"
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-secondary text-black dark:text-white bg-[#F2F2F2] dark:bg-secondary w-full"
          />
          <button className="px-8 py-2 rounded-md bg-primary dark:bg-dark-primary text-white">
            Search
          </button>
        </div>
        <div className="flex gap-4 flex-col sm:flex-row">
          <Dropdown
            options={vestingTypes}
            onChange={handleVestingType}
            title="Filter by Vesting Type"
          />
          <Dropdown
            options={statuses}
            onChange={handleVestingStatus}
            title="Filter by Status"
          />
          <Dropdown
            options={devType}
            onChange={handlerDevType}
            title="Filter by Dev Wallet"
          />
        </div>
        <div className="border-t dark:border-[#6F9BFC] border-[#252A3480] flex flex-wrap justify-center items-start gap-12 py-8 overflow-y-auto flex-grow">
          {contracts.map((contract) => (
            <ContractCard key={contract.id} contract={contract} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explorer;
