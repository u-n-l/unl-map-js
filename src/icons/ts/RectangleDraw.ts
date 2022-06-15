const svg = `<svg
width="20"
height="20"
viewBox="0 0 25 25"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>
<path
  d="M18.5717 17.7144L18.5717 6.28585C18.5717 5.81247 18.1879 5.42871 17.7145 5.42871L6.28594 5.42871C5.81256 5.42871 5.4288 5.81247 5.4288 6.28585L5.4288 17.7144C5.4288 18.1878 5.81255 18.5716 6.28594 18.5716L17.7145 18.5716C18.1879 18.5716 18.5717 18.1878 18.5717 17.7144Z"
  stroke="#000000"
  stroke-width="2.5"
/>
</svg>`;

export default () =>
  new DOMParser().parseFromString(svg, "image/svg+xml")
    .firstChild as SVGElement;
