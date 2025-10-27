"use client";
import ParagraphBlock from "@/elements/ParagraphBlock/ParagraphBlock";
import HeadingBlock from "@/elements/HeadingBlock/HeadingBlock";
import QuoteBlock from "@/elements/QuoteBlock/QuoteBlock";
import Spacer from "@/elements/Spacer/Spacer";
import FileBlock from "@/elements/FileBlock/FileBlock";
import HtmlBlock from "./HtmlBlock";
import ImageBlock from "@/elements/ImageBlock/ImageBlock";
import ColumnsBlock from "@/elements/ColumnsBlock/ColumnsBlock";
import ListBlock from "@/elements/ListBlock/ListBlock";
import ListItemBlock from "@/elements/ListItemBlock/ListItemBlock";

export default function BlockRenderer({ block }) {
  if (!block) return null;
  const { name, attributes = {}, dynamicContent, innerBlocks } = block;
  switch (name) {
    case "core/paragraph":
      return <ParagraphBlock content={attributes.content} align={attributes.textAlign || attributes.align} />;
    case "core/heading":
      return <HeadingBlock content={attributes.content} level={attributes.level || 2} />;
    case "core/quote":
      return <QuoteBlock html={dynamicContent} />;
    case "core/spacer":
      return <Spacer height={attributes.height} divider={attributes.divider} />;
    case "core/columns":
      return <ColumnsBlock innerBlocks={innerBlocks} />;
    case "core/file":
      return <FileBlock href={attributes.href} title={attributes.fileLabel || attributes.fileTitle || attributes.fileName} size={attributes.filesizeHuman} />;
    case "core/image":
      return <ImageBlock attributes={attributes} />;
    case "core/list":
      return <ListBlock block={block} />;
    case "core/list-item":
      return <ListItemBlock block={block} />;
    default:
      return dynamicContent ? <HtmlBlock html={dynamicContent} /> : innerBlocks?.length ? innerBlocks.map((b, i) => <BlockRenderer key={b?.clientId || i} block={b} />) : null;
  }
}
