import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export interface IImageProxyOptions {
  height?: number;
  width?: number;
  ratio?: string;
  mode?: string;
  format?: string;
  quality?: number;
}

export interface IImage extends IImageProxyOptions {
  alt: string;
  src: string;
  options?: IImageProxyOptions;
}

const buildSrc = (
  proxyBaseUrl: string,
  src: string,
  options?: IImageProxyOptions,
  dpi: number = 1
) => {
  let imageUrl = `${proxyBaseUrl}?img=${encodeURIComponent(
    src.startsWith("http") ? src : window.location.origin + src
  )}`;

  if (options) {
    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined) {
        // Adjust width and height based on DPI
        if (key === "width" || key === "height") {
          const scaledValue = Math.round(value * dpi);
          imageUrl += `&${key}=${scaledValue}`;
        } else {
          imageUrl += `&${key}=${value}`;
        }
      }
    });
  }

  return imageUrl;
};

const ImageProxy = ({
  options,
  ...props
}: IImage & React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [loading, setLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState<string | undefined>();

  const proxyBaseUrl = import.meta.env.VITE_IMAGE_PROXY_URL;

  const fallback = buildSrc(
    proxyBaseUrl,
    props.src,
    { ...options, format: "jpg" },
    1
  );
  const src1x = buildSrc(proxyBaseUrl, props.src, options, 1);
  const src2x = buildSrc(proxyBaseUrl, props.src, options, 2);
  // const src3x = buildSrc(baseUrl, props.src, options, 3);
  const srcSet = `${src1x} 1x, ${src2x} 2x`;

  useEffect(() => {
    // When src changes, reset state and wait for the new image to load
    setLoading(true);
    setCurrentSrc(undefined);

    const img = new Image();
    img.src = fallback;
    img.onload = () => {
      setCurrentSrc(fallback);
      setLoading(false);
    };
    img.onerror = () => {
      setLoading(false);
    };
  }, [props.src]);

  if (!proxyBaseUrl) {
    return (
      <>
        {loading && (
          <div className="flex items-center justify-center">
            <Loader2 className="animate-spin text-gray-500 w-8 h-8" />
          </div>
        )}
        <img
          {...props}
          className={`max-h-full max-w-full object-contain ${props.className}`}
        />
      </>
    );
  }

  return (
    <>
      {loading && (
        <div className={`flex items-center justify-center h-[${props.height}]`}>
          <Loader2 className="animate-spin text-gray-500 w-8 h-8" />
        </div>
      )}
      {currentSrc && (
        <img
          {...props}
          src={currentSrc}
          srcSet={srcSet}
          className={`max-h-full max-w-full object-contain ${props.className}`}
        />
      )}
    </>
  );
};

export default ImageProxy;
