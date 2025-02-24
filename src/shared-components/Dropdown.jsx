import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function SelectMenu({ options, onChange, title }) {
  const [selected, setSelected] = useState(title);

  return (
    <div className="relative w-full">
      <Listbox
        value={selected}
        onChange={(v) => {
          setSelected(v);
          onChange(v);
        }}
      >
        <ListboxButton className="w-full flex items-center dark:text-white justify-between px-4 py-2 border border-dark-primary dark:border-primary  rounded-md focus:ring-2 focus:ring-blue-500 text-left">
          {selected}
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </ListboxButton>
        <ListboxOptions className="absolute mt-1 w-full bg-white shadow-lg dark:bg-secondary rounded-md border border-gray-300 dark:border-gray-700">
          {options.map((option, index) => (
            <ListboxOption
              key={index}
              value={option}
              className="px-4 py-2 hover:bg-gray-100 dark:text-white cursor-pointer text-left"
            >
              {option}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
