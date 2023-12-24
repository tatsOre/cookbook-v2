import Image from "next/image";

/**
 * Figure component for displaying images.
 * @prop {string} src - The source URL of the image.
 * @prop {string} className - The class names for the parent container to set its size/attributes.
 * @prop {string} alt - The alternative text for the image.
 * @prop {number} [width=0] - The width of the image. Defaults to 0.
 * @prop {number} [height=0] - The height of the image. Defaults to 0.
 * @returns {JSX.Element} - The rendered Figure component.
 */

const Figure: React.FC<{
  src: string;
  className?: string;
  alt: string;
  width?: number;
  height?: number;
}> = ({ src, className, alt, width = 0, height = 0, ...rest }): JSX.Element => {
  return (
    <div className={className} {...rest}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="100vw"
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default Figure;
