export function capitalizeFirstLetter(input: string) {
  if (input.length) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  } else {
    return input;
  }
}