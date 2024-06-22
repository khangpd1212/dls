import { SVGAttributes } from 'react';
function CustomFacebookAds(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <rect width="16" height="16" rx="4" fill="white" />
      <rect
        x="1.35156"
        y="5.17188"
        width="11"
        height="9.37037"
        transform="rotate(-17.3845 1.35156 5.17188)"
        fill="url(#pattern0)"
      />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_2816_64834"
            transform="scale(0.00740741 0.00869565)"
          />
        </pattern>
        <image
          id="image0_2816_64834"
          width="135"
          height="115"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIcAAABzCAMAAACFOuE3AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAASlQTFRFAAAAra2toqGhvLu71NPTREREHR0dIiIiLigoYmFhiomJGhEVDQAAHREMGhMMHRkUFxEST0tLAAAAiYh/3dzc1tLG5ePhwL+1Y19YGBgYyMfIPDs8Cw4A////6unpeHJsGxsb6ObX///y/fvp+/jnwLmv///7//7scWxl7eraLiwql5OK4N3P8vHg0s/Cc3FyTEpE1tPGramfnpySgH5+mZeYsq+tWFBNMykjPjU0IyYwHCAvPjcuKThNSHy1TorJTYXBO3SuIWWrd5e2U5fgPYTKHHbIh6zVSHqwSHqvTn2w4tzH6uHILUBXN0poLSEZPGCLGhggQGWSMlqKH0+HYHaQr7OmOTIqDQ8Xys/DNT1KU2eBZoGibouySFdrQk9gLS44yMfIvLu7q1w5kwAAAGN0Uk5TAP//sxr///////////////////////////9m////////////////////////////////////////////////////////////////////////////////////////////////k154GgAACc9JREFUeJzFWwt72sgVXRDvKrY0dJaH6hKBsJGQBOIZvImdbd0u7HY3Tlo7ceImu/3/P6Izo9dIGsEAiXW+JGBZYY7OuffOk+++ywq5fAihkBkNoVgq+6hUa5nxqP1JfHYiniCcnkgVOTMeVVD/MyT4vtFsZcajrfwFnnn4a+d5ZjzyoKiedQnOvm9mx6MKOt1uD0HrIR6Z+ZJrPe+fX2gEWfKogoGuITE0rZcljzyoNDRdu8hYj4IBhpqpZu5LFTRVy9YvMvZlBMYNzcmcRw0YE0u1PR6Z+VID0hTTsHWSL1nVjxlAMWrZTqBHNjxGiMa5ZYc8MokPoQikCaER8shAj5qEMuVcxzRgdjzaMmh1zK6KaTiZ+VKolYEy1bsmUcPJKE4L8yIAA1uzHBtCzCMTX9o1xGI81XsqJJ7QvjxdHVuMFMRi6Gi6aQc0njpfhFmxBYA8NS3LY4F9eeJ8yWElJKXT0DWL1uIJ86UgzKuIRKk4mNq6pftZ8pQ8CkK+VlWQG5VxZ2qrlqU7niNMHl/dl0JbWORro2qx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"
        />
      </defs>
    </svg>
  );
}

export default CustomFacebookAds;
