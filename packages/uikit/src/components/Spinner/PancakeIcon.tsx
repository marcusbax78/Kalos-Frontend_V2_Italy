import React from "react";
import Svg from "../Svg/Svg";
import { SvgProps } from "../Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 128 128" {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100px" height="100px" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" xmlns:xlink="http://www.w3.org/1999/xlink">
<g><path style="opacity:0.936" fill="#1181e3" d="M 40.5,9.5 C 63.3294,6.54685 79.1628,15.5469 88,36.5C 89.6048,41.3435 89.7715,46.1768 88.5,51C 86.3883,52.4447 84.2216,52.2781 82,50.5C 78.8333,27.324 65.6666,16.824 42.5,19C 36.7796,20.3596 31.7796,23.0263 27.5,27C 30.095,27.2256 32.595,27.7256 35,28.5C 36.9536,30.7851 36.787,32.9517 34.5,35C 26.8406,35.4997 19.1739,35.6664 11.5,35.5C 11.185,27.5803 11.5183,19.747 12.5,12C 14.7851,10.0464 16.9517,10.213 19,12.5C 19.3333,15.5 19.6667,18.5 20,21.5C 25.7732,15.5355 32.6066,11.5355 40.5,9.5 Z"/></g>
<g><path style="opacity:0.936" fill="#1181e3" d="M 12.5,46.5 C 14.1703,46.7512 15.6703,47.4178 17,48.5C 20.1571,71.6648 33.3238,82.1648 56.5,80C 62.2204,78.6404 67.2204,75.9737 71.5,72C 68.905,71.7744 66.405,71.2744 64,70.5C 62.0464,68.2149 62.213,66.0483 64.5,64C 72.1594,63.5003 79.8261,63.3336 87.5,63.5C 87.815,71.4197 87.4817,79.253 86.5,87C 84.2149,88.9536 82.0483,88.787 80,86.5C 79.6667,83.5 79.3333,80.5 79,77.5C 65.8581,89.7373 50.6915,92.9039 33.5,87C 17.3479,79.1883 9.51452,66.355 10,48.5C 10.9947,47.9341 11.828,47.2674 12.5,46.5 Z"/></g>
</svg>
    </Svg>
  );
};

export default Icon;
