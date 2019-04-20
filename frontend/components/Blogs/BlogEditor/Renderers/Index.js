import { getEventRange, getEventTransfer } from "slate-react";
import imageExtensions from "image-extensions";
import isUrl from "is-url";
import { Button, Icon } from "./../components";
import styled from "react-emotion";
import Video from "./../Video/Video";

const Image = styled("img")`
  display: block;
  max-width: 100%;
  max-height: 20em;
  box-shadow: ${props => (props.selected ? "0 0 0 2px blue;" : "none")};
`;

const DEFAULT_NODE = "paragraph";

export function renderMarkButton(type, icon, editor) {
  const { value } = editor;
  const isActive = value.activeMarks.some(mark => mark.type === type);

  function onClickMark(event, type) {
    event.preventDefault();
    editor.toggleMark(type);
  }
  return (
    <Button
      reversed
      active={isActive}
      onMouseDown={event => onClickMark(event, type, editor)}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
}

const hasBlock = (type, value) => {
  return value.blocks.some(node => node.type === type);
};

const onClickBlock = (event, type, editor) => {
  event.preventDefault();

  const { value } = editor;
  const { document } = value;

  // Handle everything but list buttons.
  if (type !== "bulleted-list" && type !== "numbered-list") {
    const isActive = hasBlock(type, value);
    const isList = hasBlock("list-item", value);

    if (isList) {
      editor
        .setBlocks(isActive ? DEFAULT_NODE : type)
        .unwrapBlock("bulleted-list")
        .unwrapBlock("numbered-list");
    } else {
      editor.setBlocks(isActive ? DEFAULT_NODE : type);
    }
  } else {
    // Handle the extra wrapping required for list buttons.
    const isList = hasBlock("list-item", value);
    const isType = value.blocks.some(block => {
      return !!document.getClosest(block.key, parent => parent.type === type);
    });

    if (isList && isType) {
      editor
        .setBlocks(DEFAULT_NODE)
        .unwrapBlock("bulleted-list")
        .unwrapBlock("numbered-list");
    } else if (isList) {
      editor
        .unwrapBlock(
          type === "bulleted-list" ? "numbered-list" : "bulleted-list"
        )
        .wrapBlock(type);
    } else {
      editor.setBlocks("list-item").wrapBlock(type);
    }
  }
};

function isImage(url) {
  return imageExtensions.includes(getExtension(url));
}
function getExtension(url) {
  return new URL(url).pathname.split(".").pop();
}
function insertImage(editor, src, target) {
  if (target) {
    editor.select(target);
  }

  editor.insertBlock({
    type: "image",
    data: { src }
  });
}

export function renderBlockButton(type, icon, editor) {
  const { value } = editor;
  let isActive = hasBlock(type, value);

  if (["numbered-list", "bulleted-list"].includes(type)) {
    const { document, blocks } = value;

    if (blocks.size > 0) {
      const parent = document.getParent(blocks.first().key);
      isActive = hasBlock("list-item", value) && parent && parent.type === type;
    }
  }

  return (
    <Button
      active={isActive}
      reversed
      onMouseDown={event => onClickBlock(event, type, editor)}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
}

// Add a `renderMark` method to render marks.
export const renderMark = (props, editor, next) => {
  const { children, mark, attributes } = props;

  switch (mark.type) {
    case "bold":
      return <strong {...attributes}>{children}</strong>;
    case "code":
      return <code {...attributes}>{children}</code>;
    case "italic":
      return <em {...attributes}>{children}</em>;
    case "underlined":
      return <u {...attributes}>{children}</u>;
    default:
      return next();
  }
};

export const renderNode = (props, editor, next) => {
  const { attributes, children, node, isFocused } = props;

  switch (node.type) {
    case "paragraph":
      return <p {...addEventListener}>{children}</p>;
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case "image": {
      const src = node.data.get("src");
      return <Image src={src} selected={isFocused} {...attributes} />;
    }
    case "video":
      return <Video {...props} />;

    default:
      return next();
  }
};
export const onDropOrPaste = (event, editor, next) => {
  const target = getEventRange(event, editor);
  if (!target && event.type === "drop") return next();

  const transfer = getEventTransfer(event);
  const { type, text, files } = transfer;

  if (type === "files") {
    for (const file of files) {
      const reader = new FileReader();
      const [mime] = file.type.split("/");
      if (mime !== "image") continue;

      reader.addEventListener("load", () => {
        editor.command(insertImage, reader.result, target);
      });

      reader.readAsDataURL(file);
    }
    return;
  }

  if (type === "text") {
    if (!isUrl(text)) return next();
    if (!isImage(text)) return next();
    editor.command(insertImage, text, target);
    return;
  }

  next();
};
