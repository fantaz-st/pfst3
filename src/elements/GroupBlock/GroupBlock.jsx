import BlockRenderer from "@/components/BlockRenderer/BlockRenderer";
import { Box } from "@mui/material";

const GroupBlock = ({ block }) => {
  const a = block?.attributes || {};
  const isFlex = a.layout?.type === "flex";
  const justifyMap = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
    spaceBetween: "space-between",
  };

  let className = "wp-block-group";
  if (a.className) className += ` ${a.className}`;
  if (a.align) className += ` align${a.align}`;

  return (
    <Box
      className={className}
      sx={{
        display: isFlex ? "flex" : undefined,
        gap: isFlex ? "var(--wp--style--block-gap, 1rem)" : undefined,
        justifyContent: isFlex ? justifyMap[a.layout?.justifyContent] : undefined,
        textAlign: a.textAlign || (a.className?.includes("has-text-align-center") ? "center" : undefined),
      }}
    >
      {(block.innerBlocks || []).map((inner, i) => (
        <BlockRenderer key={i} block={inner} />
      ))}
    </Box>
  );
};

export default GroupBlock;
