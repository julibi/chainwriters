const validateAddress = (ethereumAddress: string) =>{
  if (ethereumAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      return true;
  }
  return false;
}

export default validateAddress;