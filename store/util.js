export const updateStateObject = (previousState, updateProperties) => ({
    // takes previous state and deconsturecte it -> then assign the "copied" updated state with its properties by deconstructing it and assign it to the previous state
    ...previousState,
    ...updatedProperties,
  });