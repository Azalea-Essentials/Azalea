function _jsx(Name, Props, Key) {
    return {
        Name,
        Props,
        Key
    }
}
function _jsxs(Name, ...Props) {
    return {
        Name,
        Props: [...Props]
    }
}
let Form = "Form";
let Input = "Input";
let Slider = "Slider";
let SoundDropdown = "SoundDropdown"
let a = _jsxs(Form, {
    type: "Modal",
    title: "{{TITLE}}",
    children: [_jsx(Input, {
      isRequired: true,
      isIconID: true,
      label: "Icon ID",
      placeholder: "Azalea Icon ID",
      defaultValue: "{{DEFAULT_ICON}}"
    }, "Icon"), _jsx(Input, {
      isRequired: true,
      label: "Command",
      placeholder: "Command to run",
      defaultValue: "{{DEFAULT_COMMAND}}"
    }, "Command"), _jsx(Input, {
      isRequired: true,
      label: "Item Name",
      placeholder: "Item Name",
      defaultValue: "{{DEFAULT_ITEM_NAME}}"
    }, "ItemName"), _jsx(Slider, {
      defaultValue: "{{DEFAULT_ROW}}",
      max: "{{MAX_ROW}}",
      min: "{{MIN_ROW}}",
      label: "Row (&aY&r&f)"
    }, "Row"), _jsx(Slider, {
      defaultValue: "{{DEFAULT_COLUMN}}",
      max: "{{MAX_COLUMN}}",
      min: "{{MIN_COLUMN}}",
      label: "Column (&cX&r&f)"
    }, "Column"), _jsx(Slider, {
      defaultValue: "{{DEFAULT_ITEM_AMOUNT}}",
      max: "100",
      min: "1",
      label: "Item Amount"
    }, "ItemLore"), _jsx(Input, {
      isRequired: false,
      label: "Item Name",
      placeholder: "Item Lore",
      defaultValue: "{{DEFAULT_ITEM_LORE}}"
    }, "ItemLore"), _jsx(SoundDropdown, {}, "Sound")]
  }, "Azalea2.0/ChestGUIs/AddItem")
console.log(JSON.stringify(a, null, 2));