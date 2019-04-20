import React, { Component } from "react";
import { Editor } from "slate-react";
import { renderMark, renderNode, onDropOrPaste } from "./Renderers/Index";
import HoverMenu from "./HoverManu";
import { initialValue, schema } from "./InitialValue";
import { BlogStyles } from "./../BlogsStyles";
import { plugins } from "./Plugings/Plugin";
import { Button, Icon, Toolbar } from "./components";
import SaveButton from "./../SaveButton";

function insertImage(editor, src, target) {
  if (target) {
    editor.select(target);
  }

  editor.insertBlock({
    type: "image",
    data: { src }
  });
}

// isloaded functionality is custom functionality it is to make sure that we are not loading editor before component is loading
class BlogEditor extends Component {
  // Set the initial value when the app is first constructed.
  state = {
    value: initialValue,
    isLoded: false
  };

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
    const content = JSON.stringify(value.toJSON());
    this.setState({ value });
  };

  // change isloded state to true when component is loaded
  componentDidMount() {
    this.updateMenu();
    this.setState({
      isLoded: true
    });
  }

  componentDidUpdate = () => {
    this.updateMenu();
  };

  /**
   * Update the menu's absolute position.
   */

  updateMenu = () => {
    const menu = this.menu;
    if (!menu) return;

    const { value } = this.state;
    const { fragment, selection } = value;

    if (selection.isBlurred || selection.isCollapsed || fragment.text === "") {
      menu.removeAttribute("style");
      return;
    }

    const native = window.getSelection();
    const range = native.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    menu.style.opacity = 1;
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`;

    menu.style.left = `${rect.left +
      window.pageXOffset -
      menu.offsetWidth / 2 +
      rect.width / 2}px`;
  };
  ref = editor => {
    this.editor = editor;
  };

  onClickImage = event => {
    event.preventDefault();
    const src = window.prompt("Enter the URL of the image:");
    if (!src) return;
    this.editor.command(insertImage, src);
  };

  // Render the editor.
  render() {
    return (
      <BlogStyles>
        <div className="editor-container custom-blog-styles">
          <SaveButton />

          {this.state.isLoded && (
            <Editor
              value={this.state.value}
              placeholder="Enter some text..."
              ref={this.ref}
              plugins={plugins}
              onChange={this.onChange}
              renderMark={renderMark}
              onDrop={onDropOrPaste}
              onPaste={onDropOrPaste}
              schema={schema}
              renderNode={renderNode}
              renderEditor={this.renderEditor}
            />
          )}
          <Toolbar>
            <Button onMouseDown={this.onClickImage}>
              <Icon>image</Icon>
              <small>ImageLink or drop/paste image</small>
            </Button>
          </Toolbar>
        </div>
      </BlogStyles>
    );
  }
  renderEditor = (props, editor, next) => {
    const children = next();
    return (
      <React.Fragment>
        {children}
        <HoverMenu innerRef={menu => (this.menu = menu)} editor={editor} />
      </React.Fragment>
    );
  };
}

export default BlogEditor;
