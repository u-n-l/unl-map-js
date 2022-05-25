const svg = `<svg
width="18px"
height="18px"
viewBox="0 0 18 18"
version="1.1"
xmlns="http://www.w3.org/2000/svg"
>
<g id="Dialog" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
  <g id="06" transform="translate(-15.000000, -85.000000)" fill="#000000">
    <polygon
      id="x-icon"
      points="15 86.6855134 16.6855134 85 23.9888654 92.303352 31.3144866 85 33 86.6855134 25.6743788 93.9888654 33 101.314487 31.3144866 102.999999 23.9888654 95.6743788 16.6855134 102.999999 15 101.314487 22.303352 93.9888654"
    />
  </g>
</g>
</svg>`;

export default () =>
  new DOMParser().parseFromString(svg, "image/svg+xml")
    .firstChild as SVGElement;
