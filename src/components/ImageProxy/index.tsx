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
  options?: IImageProxyOptions;
}

const ImageProxy = ({ src, alt, className, options }: IImage) => {
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
      className={`${className} max-h-full max-w-full object-contain`}
      loading="lazy"
    />
  );
};

export default ImageProxy;
