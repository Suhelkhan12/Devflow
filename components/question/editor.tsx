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
  CodeToggle,
  InsertCodeBlock,
  Separator,
  codeBlockPlugin,
  linkDialogPlugin,
  codeMirrorPlugin,
} from "@mdxeditor/editor";
import { FC } from "react";
import { ControllerRenderProps } from "react-hook-form";

// Import Prism themes and all languages
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-go";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-php";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";

interface EditorProps {
  resetKey: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, string>;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */
const Editor: FC<EditorProps> = ({ resetKey, field, editorRef }) => {
  const toolbar = toolbarPlugin({
    toolbarClassName: "dark:bg-dark-200! bg-light-900!",
    toolbarContents: () => (
      <>
        <UndoRedo />
        <Separator />
        <BoldItalicUnderlineToggles />
        <Separator />
        <ListsToggle />
        <Separator />
        <CreateLink />
        <InsertImage />
        <Separator />
        <CodeToggle />
        <InsertCodeBlock />
      </>
    ),
  });

  const plugins = [
    codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
    codeMirrorPlugin({ codeBlockLanguages: { js: "Javascript", css: "CSS" } }),
    headingsPlugin(),
    listsPlugin(),
    quotePlugin(),
    thematicBreakPlugin(),
    markdownShortcutPlugin(),
    linkDialogPlugin(),
    toolbar,
    imagePlugin(),
  ];

  return (
    <MDXEditor
      key={resetKey}
      onChange={(val) => field.onChange(val)}
      ref={editorRef}
      markdown={field.value}
      plugins={plugins}
      className="placeholder:text-light-400 dark:dark-gradient caret-primary-500 background-light800_dark300 dark:border-dark-400 focus-visible:border-primary-500 dark:focus-visible:border-primary-500 markdown-editor rounded border tracking-wide focus-visible:ring-0"
    />
  );
};

export default Editor;
