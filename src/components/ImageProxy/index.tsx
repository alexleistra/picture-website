export interface IImageProxyOptions {
  height?: string;
  width?: string;
  ratio?: string;
  mode?: string;
  format?: string;
  quality?: number;
}

export interface IImage extends IImageProxyOptions {
  className?: string;
  alt: string;
  src: string;
  height?: string;
  width?: string;
  options?: IImageProxyOptions;
}

const ImageProxy = ({
  src,
  alt,
  className,
  width,
  height,
  options,
}: IImage) => {
  if (import.meta.env.VITE_IMAGE_PROXY_URL) {
    src = `${import.meta.env.VITE_IMAGE_PROXY_URL}?img=${encodeURIComponent(
      src.startsWith("http") ? src : window.location.origin + src
    )}`;

    for (const key in options) {
      if (Object.prototype.hasOwnProperty.call(options, key)) {
        const value = options[key as keyof IImageProxyOptions];
        src = `${src}&${key}=${value}`;
      }
    }
  }

  return (
    <img
      src={src}
      alt={alt}
      height={height}
      width={width}
      className={`${className}`}
      loading="lazy"
    />
  );
};

export default ImageProxy;
