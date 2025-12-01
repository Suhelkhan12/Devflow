"use client";

import {
  MDXEditor,
  MDXEditorMethods,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  CreateLink,
  ListsToggle,
  toolbarPlugin,
  imagePlugin,
  InsertImage,
} from "@mdxeditor/editor";
import { FC } from "react";
import { ControllerRenderProps } from "react-hook-form";

interface EditorProps {
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, string>;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */
const Editor: FC<EditorProps> = ({ key, field, editorRef }) => {
  const toolbar = toolbarPlugin({
    toolbarClassName: "dark:bg-dark-200! bg-light-900!",
    toolbarContents: () => (
      <>
        <UndoRedo />
        <BoldItalicUnderlineToggles />
        <CreateLink />
        <ListsToggle />
        <InsertImage />
      </>
    ),
  });

  const plugins = [
    headingsPlugin(),
    listsPlugin(),
    quotePlugin(),
    thematicBreakPlugin(),
    markdownShortcutPlugin(),
    toolbar,
    imagePlugin(),
  ];

  return (
    <MDXEditor
      key={key}
      onChange={(val) => field.onChange(val)}
      ref={editorRef}
      markdown={field.value}
      plugins={plugins}
      className="placeholder:text-light-400 dark:dark-gradient caret-primary-500 background-light800_dark300 dark:border-dark-400 focus-visible:border-primary-500 dark:focus-visible:border-primary-500 markdown-editor rounded border tracking-wide focus-visible:ring-0"
    />
  );
};

export default Editor;
