import { Code } from "bright";
import { MDXRemote } from "next-mdx-remote/rsc";

Code.theme = {
  light: "one-dark-pro",
  dark: "min-light",
  lightSelector: "html.light",
};

const ContentPreview = ({ content = "" }: { content: string }) => {
  const formatedContent = content.replace(/\\/g, "").replace(/&#x20;/g, "");
  return (
    <section className="markdown mt-5 grid wrap-break-word">
      <MDXRemote
        source={formatedContent}
        components={{
          pre: (props) => <Code {...props} lineNumbers className="shadow-light-200 dark:shadow-dark-200" />,
        }}
      />
    </section>
  );
};

export default ContentPreview;
