import React from "react";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";

import "react-lazy-load-image-component/src/effects/blur.css";

const Image = ({ src, scrollPosition, ...props }) => {
  return (
    <LazyLoadImage
      {...props}
      alt={src}
      scrollPosition={scrollPosition}
      effect="blur"
      placeholderSrc={
        "https://res.cloudinary.com/james-m/image/upload/c_thumb,h_240,w_180/v1593129344/party_va3kjs.jpg"
      }
      src={src}
      wrapperClassName="gallery-img-wrapper"
    />
  );
};
export default trackWindowScroll(Image);
