const paletteColor = ["#204", "#0dd", "#aaf"];
const cafeTheme = Object.freeze({
  light: Object.freeze({
    backgroundColor: "#aaa",
    frameColor: "#eee",
    cardColor: "#fff",
    textColor: "#000",
    paletteColor,
  }),
  dark: Object.freeze({
    backgroundColor: "#100020",
    frameColor: "#180020",
    cardColor: "#200040",
    textColor: "#fff",
    paletteColor,
  }),
});

export default cafeTheme;
