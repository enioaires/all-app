/* eslint-disable react/jsx-key */
import { Dispatch, FC, SetStateAction } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Input from "../Input";
import { Button } from "../Button";

interface FilterProps {
  inputLabels?: string[];

  selectLabels?: string[];
  selectOptions?: string[][];

  setFilter: Dispatch<SetStateAction<FieldValues>>;
}

const Filter: FC<FilterProps> = ({
  inputLabels,
  selectLabels,
  selectOptions,
  setFilter,
}) => {
  const inputArray = Array.from(Array(inputLabels?.length).keys());
  const selectArray = Array.from(Array(selectLabels?.length).keys());

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({});

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const onSubmit = (data: FieldValues) => {
    setFilter(data);
  };
  return (
    <form
      className="bg-gray-600 max-w-xs p-4 rounded text-white flex flex-col gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      {inputLabels &&
        inputArray.map((item, index) => (
          <div key={item} className="flex flex-col gap-4">
            <label>{inputLabels?.[index]}</label>
            <Input
              id={inputLabels?.[index]}
              register={register}
              errors={errors}
            />
          </div>
        ))}

      {selectLabels &&
        selectArray.map((item, index) => (
          <div key={item} className="flex flex-col gap-4">
            <label>{selectLabels?.[index]}</label>
            <select
              className="bg-white text-gray-900 rounded px-2 py-1 outline-none"
              onChange={(e) => {
                setCustomValue(selectLabels[item], e.target.value);
              }}
            >
              {selectOptions?.[index].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        ))}

      <Button type="submit">Teste</Button>
    </form>
  );
};

export default Filter;
