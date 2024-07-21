import Image, { ImageProps } from "next/image";

const customLoader = ({ src }: { src: string }) => {
  return src;
};

const CustomImage = (props: ImageProps) => {
  return (
    <Image {...props} loader={customLoader} unoptimized alt="loading..." />
  );
};

export default CustomImage;
