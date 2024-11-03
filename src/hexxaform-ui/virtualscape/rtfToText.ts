export default function rtfToText(rtf: string) {
  // https://stackoverflow.com/questions/29922771/convert-rtf-to-and-from-plain-text
  rtf = rtf.replace(/\\par[d]?/g, '')
  return rtf
    .replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, '')
    .trim()
}
