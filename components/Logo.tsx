import Image from "next/image";

const assets = {
  lockup: {
    src: "/brand/lockup-on-dark.png",
    width: 2158,
    height: 420,
    className: "h-10 w-auto sm:h-12 xl:h-[3.15rem]",
  },
  stacked: {
    src: "/brand/logo-on-dark.png",
    width: 938,
    height: 788,
    className: "h-auto w-40 sm:w-48",
  },
} as const;

export function Logo({
  variant = "lockup",
  priority = false,
}: {
  variant?: keyof typeof assets;
  priority?: boolean;
}) {
  const asset = assets[variant];
  return (
    <Image
      src={asset.src}
      alt="Tommy Savin QA — Construction Advisor, Quality Assurance"
      width={asset.width}
      height={asset.height}
      priority={priority}
      className={asset.className}
    />
  );
}
