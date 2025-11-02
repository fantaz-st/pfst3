"use client";
import Image from "next/image";
import NextLink from "next/link";
import { Box, Typography, Link as MUILink } from "@mui/material";

const isInternal = (href = "") => href.startsWith("/");
const pxNumber = (v) => {
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const n = parseFloat(v.replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
};

export default function ImageBlock({ attributes = {} }) {
  const { url, alt = "", caption, width, height, displayWidth, displayHeight, aspectRatio, align, scale, linkDestination, href, target, rel, blurDataURL } = attributes;

  if (!url) return null;

  const justify = align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start";

  let linkHref;
  if (linkDestination === "media") linkHref = url;
  else if (linkDestination === "custom" && href) linkHref = href;

  const isMediaLink = !!linkHref && linkHref === url;

  const linkProps = linkHref && {
    href: linkHref,
    target: target || (!isInternal(linkHref) ? "_blank" : undefined),
    rel: rel || (!isInternal(linkHref) ? "noopener" : undefined),
    underline: "none",
    ...(isMediaLink ? { "data-fancybox": "gallery", "data-caption": caption || alt || "" } : {}),
  };

  const wNum = pxNumber(displayWidth) ?? pxNumber(width) ?? 1200;
  const hNum = pxNumber(displayHeight) ?? pxNumber(height) ?? Math.round(wNum * 0.66);
  const objectFit = scale === "contain" ? "contain" : "cover";
  const commonAlt = caption || alt || "";

  if (aspectRatio) {
    const Img = (
      <Box
        sx={{
          aspectRatio,
          position: "relative",
          width: "100%",
          maxWidth: typeof displayWidth === "number" ? `${displayWidth}px` : displayWidth || "100%",
        }}
      >
        <Image src={url} fill style={{ objectFit }} alt={commonAlt} {...(blurDataURL ? { placeholder: "blur", blurDataURL } : {})} />
      </Box>
    );

    return (
      <Box component="figure" sx={{ m: 0, my: 2, display: "flex", flexDirection: "column", alignItems: justify, width: "100%" }}>
        {linkProps ? (
          isInternal(linkProps.href) ? (
            <MUILink component={NextLink} {...linkProps}>
              {Img}
            </MUILink>
          ) : (
            <MUILink {...linkProps}>{Img}</MUILink>
          )
        ) : (
          <a href={url} data-fancybox="gallery" data-caption={caption || alt || ""}>
            {Img}
          </a>
        )}
        {caption ? (
          <Typography component="figcaption" variant="caption" sx={{ mt: 1, opacity: 0.85, textAlign: "center" }}>
            {caption}
          </Typography>
        ) : null}
      </Box>
    );
  }

  const imgEl = <Image src={url} width={wNum} height={hNum} alt={commonAlt} quality={100} style={{ width: "100%", height: "auto", display: "block", objectFit }} sizes="(max-width: 360px) 100vw, (max-width: 1024px) 66vw, 50vw" {...(blurDataURL ? { placeholder: "blur", blurDataURL } : {})} />;

  const content = linkProps ? (
    isInternal(linkProps.href) ? (
      <MUILink component={NextLink} {...linkProps}>
        {imgEl}
      </MUILink>
    ) : (
      <MUILink {...linkProps}>{imgEl}</MUILink>
    )
  ) : (
    <a href={url} data-fancybox="gallery" data-caption={caption || alt || ""}>
      {imgEl}
    </a>
  );

  return (
    <Box
      component="figure"
      sx={{
        m: 0,
        my: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: justify,
        width: "100%",
        maxWidth: typeof displayWidth === "number" ? `${displayWidth}px` : displayWidth || (wNum ? `${wNum}px` : "100%"),
      }}
    >
      {content}
      {caption ? (
        <Typography component="figcaption" variant="caption" sx={{ mt: 1, opacity: 0.85, textAlign: "center" }}>
          {caption}
        </Typography>
      ) : null}
    </Box>
  );
}
