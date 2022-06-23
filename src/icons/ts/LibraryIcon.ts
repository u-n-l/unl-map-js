const svg = `<svg
id="library_books_black_24dp"
xmlns="http://www.w3.org/2000/svg"
width="24"
height="24"
viewBox="0 0 24 24"
>
<path
  id="Path_1889"
  data-name="Path 1889"
  d="M0,0H24V24H0Z"
  fill="none"
/>
<path
  id="Path_1890"
  data-name="Path 1890"
  d="M4,6H2V20a2.006,2.006,0,0,0,2,2H18V20H4ZM20,2H8A2.006,2.006,0,0,0,6,4V16a2.006,2.006,0,0,0,2,2H20a2.006,2.006,0,0,0,2-2V4A2.006,2.006,0,0,0,20,2Zm0,14H8V4H20ZM10,9h8v2H10Zm0,3h4v2H10Zm0-6h8V8H10Z"
  fill="#000000"
/>
</svg>`;

export default () =>
  new DOMParser().parseFromString(svg, "image/svg+xml")
    .firstChild as SVGElement;
