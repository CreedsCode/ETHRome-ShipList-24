import { useState } from "react";
import dynamic from "next/dynamic";

// @ts-ignore
const Editor = dynamic(() => import("@tinymce/tinymce-react").then(mod => mod.Editor), { ssr: false });

const ChatTextBox = () => {
  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  return (
    <div>
      <Editor
        apiKey="sjc2psnj6kgfubqu3hv4pwhhir6gao5pkcket3f8uyi65qsc"
        value={editorContent}
        init={{
          height: 400,
          menubar: false,
          plugins: "emoticons",
          toolbar: "undo redo | bold italic underline | emoticons",
          emoticons_append: {
            custom_mind_blown: {
              keywords: ["mind", "blown"],
              char: "🤯",
            },
          },
        }}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
};

export default ChatTextBox;
