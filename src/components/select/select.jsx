import React, { useState, useEffect } from "react";
import { EmptyState } from "../empty-state/empty-state";
import { Arrow } from "../shared/icons";
import { isEmpty } from "lodash";
import styles from "./select.module.scss";
import { Strings } from "../../constants/string";
import { SelectItem } from "../select-item/select-item";

export const Select = ({ options = [], placeholder, multiple, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectAllEnabled, setSelectAllEnabled] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filteredSelectedOptions, setFilteredSelectedOptions] =
    useState(options);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!searchTerm) {
      setFilteredSelectedOptions(options);
      return;
    }
    const caseInsensitiveSearchTerm = searchTerm.toLowerCase();
    const filteredList = options.filter((option) =>
      option.label.toLowerCase().includes(caseInsensitiveSearchTerm)
    );
    setFilteredSelectedOptions(filteredList);
  }, [options, searchTerm]);

  useEffect(() => {
    setSelectAllEnabled(options.length !== selectedOptions.length);
    onChange(selectedOptions);
  }, [onChange, options.length, selectedOptions]);

  const isOptionExist = (id) =>
    selectedOptions.some((option) => option.id === id);

  const handleOnOptionClick = (option) => {
    if (!multiple) {
      setSelectedOptions([option]);
      setIsOpen(!isOpen);
      searchTerm && setSearchTerm("");
    } else {
      const updatedSelectedOptions = isOptionExist(option.id)
        ? selectedOptions.filter(
            (selectedOption) => selectedOption.id !== option.id
          )
        : [...selectedOptions, option];
      setSelectedOptions(updatedSelectedOptions);
    }
  };

  const selectAll = () => {
    if (isEmpty(selectedOptions)) {
      setSelectedOptions(options);
    } else {
      options.forEach((option) => {
        if (!isOptionExist(option.id))
          setSelectedOptions((selected) => [...selected, option]);
      });
    }
    setSelectAllEnabled(false);
  };

  const deselectAll = () => {
    !isEmpty(selectedOptions) && setSelectedOptions([]);
    setSelectAllEnabled(true);
  };

  const handleOnSearchChange = (event) => {
    const {
      target: { value },
    } = event;
    setSearchTerm(value);
  };

  const renderInputValue = () =>
    isEmpty(selectedOptions)
      ? placeholder
      : multiple
      ? selectedOptions.map((option) => option.label).join(", ")
      : selectedOptions[0].label;

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.select} ${isOpen && styles.focused}`}
        onClick={() => setIsOpen(!isOpen)}
        role="button">
        <div
          className={`${isEmpty(selectedOptions) && styles.placeholder} ${styles.input}`}>
          {renderInputValue()}
        </div>
        <Arrow
          direction={`${isOpen ? "up" : "down"}`}
          color={`${isOpen ? "#000" : "#d0d0d0"}`}
        />
      </div>

      {isOpen && (
        <div className={styles.optionsContainer}>
          <input
            value={searchTerm}
            type="search"
            onChange={handleOnSearchChange}
            className={styles.search}
            placeholder={Strings.SEARCH}
          />

          <div className={styles.options}>
            {filteredSelectedOptions.map((option) => (
              <SelectItem
                key={option.id}
                item={option}
                selected={isOptionExist(option.id)}
                onClick={() => handleOnOptionClick(option)}
              />
            ))}
            {!filteredSelectedOptions.length && <EmptyState />}
          </div>

          {multiple && !searchTerm && (
            <div className={styles.selectAllContainer}>
              <button
                className={styles.selectAll}
                onClick={selectAllEnabled ? selectAll : deselectAll}>
                {selectAllEnabled ? Strings.SELECT_ALL : Strings.DESELECT_ALL}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
