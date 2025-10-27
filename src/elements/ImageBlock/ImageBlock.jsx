"use client";
import Image from "next/image";
import NextLink from "next/link";
import { Box, Typography, Link as MUILink } from "@mui/material";

const isInternal = (href = "") => href.startsWith("/");

export default function ImageBlock({ attributes = {} }) {
  const {
    url,
    alt = "",
    caption,
    width,
    height,
    displayWidth, // optional from plugin
    displayHeight, // optional from plugin
    aspectRatio, // optional custom
    align, // 'left' | 'center' | 'right'
    linkDestination, // 'none' | 'media' | 'custom'
    href, // when linkDestination === 'custom'
    target,
    rel,
    blurDataURL, // optional (if you add it later)
  } = attributes;

  if (!url) return null;

  const justify = align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start";

  let linkHref;
  if (linkDestination === "media") linkHref = url;
  else if (linkDestination === "custom" && href) linkHref = href;

  const linkProps = linkHref
    ? {
        href: linkHref,
        target: target || (!isInternal(linkHref) ? "_blank" : undefined),
        rel: rel || (!isInternal(linkHref) ? "noopener" : undefined),
      }
    : null;

  // Common <Image> props
  const imgCommon = {
    alt: caption || alt || "",
    quality: 100,
    "data-lightboxjs": "lightbox1",
    // placeholder: blurDataURL ? "blur" : "empty",
    // blurDataURL,
  };

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
            maxWidth: displayWidth ? displayWidth : "100%",
          }}
        >
          <Image src={url} fill sizes="(max-width: 360px) 100vw, (max-width: 1024px) 66vw, 33vw" style={{ objectFit: "cover" }} {...imgCommon} />
        </Box>

        {caption ? (
          <Typography component="figcaption" variant="caption" sx={{ mt: 1, opacity: 0.85, textAlign: "center" }}>
            {caption}
          </Typography>
        ) : null}
      </Box>
    );
  }

  const renderImage = (
    <Image
      src={url}
      width={displayWidth || width || 1200}
      height={displayHeight || height || Math.round((displayWidth || width || 1200) * 0.66)}
      sizes="(max-width: 360px) 100vw, (max-width: 1024px) 66vw, 50vw"
      style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
      {...imgCommon}
    />
  );

  const imageWithOptionalLink =
    linkProps && isInternal(linkProps.href) ? (
      <MUILink component={NextLink} {...linkProps} underline="none">
        {renderImage}
      </MUILink>
    ) : linkProps ? (
      <MUILink {...linkProps} underline="none">
        {renderImage}
      </MUILink>
    ) : (
      renderImage
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
        maxWidth: displayWidth || width ? `${displayWidth || width}px` : "100%",
      }}
    >
      {imageWithOptionalLink}

      {caption ? (
        <Typography component="figcaption" variant="caption" sx={{ mt: 1, opacity: 0.85, textAlign: "center" }}>
          {caption}
        </Typography>
      ) : null}
    </Box>
  );
}
