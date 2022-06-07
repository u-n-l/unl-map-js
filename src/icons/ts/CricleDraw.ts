const svg = `<svg
width="20"
height="20"
viewBox="0 0 25 25"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>
<path
    d="M4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12Z"
    stroke="#000000"
    stroke-width="2.5"
  />
</svg>`;

export default () =>
  new DOMParser().parseFromString(svg, "image/svg+xml")
    .firstChild as SVGElement;
