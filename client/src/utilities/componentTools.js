//This is currently not working with implementations but i'm not deleting for the purpose of remembering later

//Alerts the children of a given select DOM element
//@Parameters: options: list of strings, stateAttribute: what stateAttribute you'll be setting
//@Return: select: document element of type 'select' that is filled with the options contents
export const setSelectOptions = (selectList, options, stateAttribute) => {
  if (!Array.isArray(options)) {
    console.log(
      "Function 'getSelectOptions' received wrong type arguments. 'options' was not of type Array"
    );
    return;
  } else if (typeof selectList === null) {
    console.log("selectList is null in Alerts.setSelectOptions()");
    return;
  }

  console.log(options);
  try {
    if (selectList.length < options.length + 1) {
      //This if throws exception when lenght ===0
      //2 for the initial default models
      //Only does it once
      console.log("Adding options");
      for (var i = 0; i < options.length; i++) {
        var endpoint = options[i];
        var newOption = document.createElement("option");
        newOption.value = endpoint;
        newOption.text = options[i];
        selectList.appendChild(newOption);
      }
    } else {
      console.log("Didn't need to add the options. They already exist.");
    }
  } catch (error) {
    console.log(
      `ERROR: options is NULL in Alerts.setSelectOptions(): ${error}`
    );
  }
};
