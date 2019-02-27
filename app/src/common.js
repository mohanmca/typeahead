function replaceSymbols(str) {
  if (str) 
    return str.replace(/[{}]/g, "");
  else return str;
}
