import Image, { ImageProps } from "next/image";

interface ScratchImageProps {
  src: ImageProps["src"];
  alt: ImageProps["alt"];
}

const ScratchImage: React.FC<ScratchImageProps> = ({ src, alt }) => {
  const inTestEnv = process.env.NODE_ENV === "test";

  // @ts-ignore
  return <Image src={src} alt={alt} layout={inTestEnv ? "fill" : undefined} />;
};

export default ScratchImage;
