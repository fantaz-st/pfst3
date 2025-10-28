"use client";
import Image from "next/image";
import NextLink from "next/link";
import { Box, Typography, Link as MUILink } from "@mui/material";

const isInternal = (href = "") => href.startsWith("/");

// turn "200px" -> 200 ; 200 -> 200 ; undefined -> undefined
const pxNumber = (v) => {
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const n = parseFloat(v.replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
};

export default function ImageBlock({ attributes = {} }) {
  const {
    url,
    alt = "",
    caption,
    width,
    height,
    displayWidth, // may be "200px"
    displayHeight, // may be "200px"
    aspectRatio, // e.g. "1/1" or "16/9"
    align, // 'left' | 'center' | 'right'
    scale, // "cover" | "contain" etc.
    linkDestination, // 'none' | 'media' | 'custom'
    href, // when linkDestination === 'custom'
    target,
    rel,
    blurDataURL, // optional
  } = attributes;

  if (!url) return null;

  const justify = align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start";

  // resolve link
  let linkHref;
  if (linkDestination === "media") linkHref = url;
  else if (linkDestination === "custom" && href) linkHref = href;

  const linkProps = linkHref && {
    href: linkHref,
    target: target || (!isInternal(linkHref) ? "_blank" : undefined),
    rel: rel || (!isInternal(linkHref) ? "noopener" : undefined),
    underline: "none",
  };

  // numeric sizes for next/image
  const wNum = pxNumber(displayWidth) ?? pxNumber(width) ?? 1200;
  const hNum = pxNumber(displayHeight) ?? pxNumber(height) ?? Math.round(wNum * 0.66); // fallback ratio

  const objectFit = scale === "contain" ? "contain" : "cover";

  // common props
  const imgCommon = {
    alt: caption || alt || "",
    quality: 100,
    // placeholder: blurDataURL ? "blur" : "empty",
    // blurDataURL,
    // allow CLS-free sizing but let it shrink responsively
    style: { width: "100%", height: "auto", display: "block", objectFit },
    sizes: "(max-width: 360px) 100vw, (max-width: 1024px) 66vw, 50vw",
    "data-lightboxjs": "lightbox1",
  };

  // aspect-ratio mode → use fill inside a ratio box
  if (aspectRatio) {
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
        }}
      >
        <Box
          sx={{
            aspectRatio,
            position: "relative",
            width: "100%",
            // if author set a displayWidth, respect it as max
            maxWidth: typeof displayWidth === "number" ? `${displayWidth}px` : displayWidth || "100%",
          }}
        >
          <Image src={url} fill style={{ objectFit }} alt={alt || caption || ""} />
        </Box>

        {caption ? (
          <Typography component="figcaption" variant="caption" sx={{ mt: 1, opacity: 0.85, textAlign: "center" }}>
            {caption}
          </Typography>
        ) : null}
      </Box>
    );
  }

  // intrinsic mode with numeric width/height
  const imgEl = <Image src={url} width={wNum} height={hNum} {...imgCommon} />;

  const maybeLinked = linkProps ? (
    isInternal(linkProps.href) ? (
      <MUILink component={NextLink} {...linkProps}>
        {imgEl}
      </MUILink>
    ) : (
      <MUILink {...linkProps}>{imgEl}</MUILink>
    )
  ) : (
    imgEl
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
        // use author’s displayWidth as a CSS max-width if present
        maxWidth: typeof displayWidth === "number" ? `${displayWidth}px` : displayWidth || (wNum ? `${wNum}px` : "100%"),
      }}
    >
      {maybeLinked}

      {caption ? (
        <Typography component="figcaption" variant="caption" sx={{ mt: 1, opacity: 0.85, textAlign: "center" }}>
          {caption}
        </Typography>
      ) : null}
    </Box>
  );
}
