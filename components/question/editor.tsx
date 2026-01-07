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
  InsertCodeBlock,
  Separator,
  codeBlockPlugin,
  linkDialogPlugin,
  codeMirrorPlugin,
  InsertTable,
  tablePlugin,
  InsertThematicBreak,
  diffSourcePlugin,
} from "@mdxeditor/editor";
import { FC } from "react";
import { ControllerRenderProps } from "react-hook-form";

interface EditorProps {
  resetKey: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, string>;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
  readonly: boolean;
}

/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */
const Editor: FC<EditorProps> = ({ readonly, resetKey, field, editorRef }) => {
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
        <InsertTable />
        <Separator />
        <InsertCodeBlock />
        <Separator />
        <InsertThematicBreak />
      </>
    ),
  });

  const plugins = [
    codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
    codeMirrorPlugin({
      codeBlockLanguages: {
        // Web & Scripting
        html: "HTML",
        css: "CSS",
        js: "JavaScript",
        javascript: "JavaScript",
        ts: "TypeScript",
        typescript: "TypeScript",
        jsx: "JavaScript (React)",
        tsx: "TypeScript (React)",
        py: "Python",

        // Catch-all fallback
        "": "Unspecified",
      },
      autoLoadLanguageSupport: true,
    }),
    diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "" }),
    headingsPlugin(),
    listsPlugin(),
    quotePlugin(),
    thematicBreakPlugin(),
    markdownShortcutPlugin(),
    tablePlugin(),
    linkDialogPlugin(),
    thematicBreakPlugin(),
    toolbar,
    imagePlugin(),
  ];

  return (
    <MDXEditor
      readOnly={readonly}
      key={resetKey}
      onChange={(val) => field.onChange(val)}
      ref={editorRef}
      markdown={field.value}
      plugins={plugins}
      className="placeholder:text-light-400 dark:dark-gradient caret-primary-500 background-light800_dark300 dark:border-dark-400 focus-visible:border-primary-500 dark:focus-visible:border-primary-500 markdown-editor dark-editor rounded border tracking-wide focus-visible:ring-0"
    />
  );
};

export default Editor;
