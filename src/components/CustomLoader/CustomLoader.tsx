import Image, { ImageProps } from "next/image";

const customLoader = ({ src }: { src: string }) => {
  return src;
};

export const CustomImage = (props: ImageProps) => {
  return (
    <Image {...props} loader={customLoader} unoptimized alt="loading..." />
  );
};

export default CustomImage;
