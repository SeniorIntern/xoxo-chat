import Image, { StaticImageData } from 'next/image';

type Props = {
  imageSrc: string | StaticImageData;
};

function Card({ imageSrc }: Props) {
  return (
    <Image
      src={imageSrc}
      alt="Gif image"
      fill
      unoptimized
      style={{ objectFit: 'cover' }}
      className="rounded-md"
    />
  );
}

export default Card;
