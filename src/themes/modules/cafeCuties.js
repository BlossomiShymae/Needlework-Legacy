const paletteColor = ["#aaf", "#fd8", "#fad"];
const cafeTheme = Object.freeze({
  light: Object.freeze({
    backgroundColor: "#77a",
    frameColor: "#bbe",
    cardColor: "#aaf",
    textColor: "#000",
    paletteColor,
  }),
  dark: Object.freeze({
    backgroundColor: "#403",
    frameColor: "#430",
    cardColor: "#336",
    textColor: "#fff",
    paletteColor,
  }),
});

export default cafeTheme;
