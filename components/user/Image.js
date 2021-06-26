import { useNode } from "@craftjs/core";
import { useState } from "react";
import { StyledBox } from "../styled/StyledBox";
import { StyledImage } from "../styled/StyledImage";
import { TextInput } from "../styled/inputs/TextInput";

export const Image = ({ src, width }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <div style={{ width: `${width}px` }}>
      <StyledImage ref={(ref) => connect(drag(ref))} src={src} />
    </div>
  );
};

const ImageSettings = () => {
  const {
    src,
    width,
    actions: { setProp },
  } = useNode((node) => ({
    src: node.data.props.src,
    width: node.data.props.width,
  }));

  const updateImage = (newImg) => {
    setProp((props) => (props.src = newImg));
  };

  const updateWidth = (newWidth) => {
    setProp((props) => (props.width = newWidth));
  };

  return (
    <StyledBox css={{ backgroundColor: "$black" }}>
      <TextInput
        placeholder="paste image URL here"
        submitValue={updateImage}
        formId="img-src"
        formLabel="Image Source"
      />
      <TextInput
        initialValue={width}
        submitValue={updateWidth}
        formId="img-width"
        formLabel="Width"
      />
    </StyledBox>
  );
};

const ImageDefaultProps = {
  src: "/placeholder.png",
  width: 600,
};

Image.craft = {
  displayName: "Image",
  props: ImageDefaultProps,
  related: {
    settings: ImageSettings,
  },
};
