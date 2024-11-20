import { useEffect, useState } from "react";
import Picker from "./selector";
import LoadingScreen from "../misc/loading-screen";
import { grayButtonStyle } from "../styles/button-syles";

interface PickerParams<T> {
  fetchData: () => Promise<T[]>,
  onChange: (name: string, value: T | null) => void,
  name: string,
  label?: string,
  closeAfterSubmit?: boolean,
  displayField: (item: T) => string,
  filterField: (item: T, value: string) => boolean
}

function SelectionModal<T>({ fetchData, filterField, onChange, name, label, closeAfterSubmit, displayField }: PickerParams<T>) {
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
    <div>
      <Picker<T> filterField={filterField} label={label} displayField={displayField} closeAfterSubmit={closeAfterSubmit} data={items} onChange={handlePush} />
      <div>{pickedItem ? displayField(pickedItem) : null}</div>
      {pickedItem && (
        <div>
          <button type="button" className={grayButtonStyle + " text-sm h-fit mt-2"} onClick={handleDrop}>
            скинути
          </button>
        </div>
      )}
    </div>
  );
}

export default SelectionModal;