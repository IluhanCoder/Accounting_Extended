import { useEffect, useState } from "react";
import SelectFormOpener from "./selector-form-opener";
import LoadingScreen from "../misc/loading-screen";
import { grayButtonStyle } from "../styles/button-syles";

interface PickerParams<T> {
  fetchData: () => Promise<T[]>,
  onChange: (name: string, value: T | null) => void,
  name: string,
  label?: string,
  closeAfterSubmit?: boolean,
  displayField: (item: T) => string,
  filterField: (item: T, value: string) => boolean,
  searchPanelLabel?: string,
  className?: string,
  placeholder?: string
}

function SelectionPlate<T>({ fetchData, placeholder, filterField, onChange, name, label, closeAfterSubmit, displayField, searchPanelLabel, className }: PickerParams<T>) {
  const [items, setItems] = useState<T[]>();
  const [pickedItem, setPickedItem] = useState<T | null>(null);

  const getData = async () => {
    const data = await fetchData();
    setItems(data);
  };

  const handlePush = (item: T | null) => {
    setPickedItem(item ? { ...item } : null);
    onChange(name, item);
  };

  const handleDrop = () => {
    handlePush(null);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!items) return <LoadingScreen />;

  return (
    <div className={className}>
      <div className="mt-1">{label}</div>
      {(pickedItem || placeholder) && (<div className="flex gap-2 px-2">
        <div className="flex mt-1 text-nowrap font-semibold">{pickedItem ? displayField(pickedItem) : placeholder}</div>
          <button type="button" className={"text-blue-700 text-sm p-2 h-fit"} onClick={handleDrop}>
            скинути
          </button>
      </div>)}
      <SelectFormOpener<T> searchPanelLabel={searchPanelLabel} filterField={filterField} displayField={displayField} closeAfterSubmit={closeAfterSubmit} data={items} onChange={handlePush} />
    </div>
  );
}

export default SelectionPlate;