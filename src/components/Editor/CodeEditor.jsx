import React, { useContext, useEffect, useRef, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import CodeOutput from "./CodeOutput";
import { AiFillHtml5 } from "react-icons/ai";
import { FaCss3Alt } from "react-icons/fa";
import { BiLogoJavascript } from "react-icons/bi";
import ComponentInfo from "./ComponentInfo";
import { FaRegCopy } from "react-icons/fa";
import { EditorContext } from "../../context/EditorContextProvider";
import { BiLogoTailwindCss } from "react-icons/bi";
import { BiReset } from "react-icons/bi";
import toast from "react-hot-toast";
import {
  editorThemes,
  htmlTemplate,
  cssTemplate,
  jsTemplate,
  tailwindCssTemplate,
} from "./constants";

// const editorThemes = ["vs-dark", "vs-light", "hc-black", "hc-light"];

const CodeEditor = () => {
  const initialValues = {
    html: htmlTemplate,
    css: cssTemplate,
    js: jsTemplate,
    tailwind: tailwindCssTemplate,
  };
  const { langCategory } = useContext(EditorContext);
  const languages = langCategory.language.split("+");
  const { code, setCode } = useContext(EditorContext);
  const [documentContents, setDocumentContents] = useState("");
  const [theme, setTheme] = useState("vs-dark");
  const [activeFile, setActiveFile] = useState("HTML");
  const [html, setHtml] = useState(htmlTemplate);
  const [css, setCss] = useState(cssTemplate);
  const [js, setJs] = useState(jsTemplate);
  const [tailwind, setTailwind] = useState(tailwindCssTemplate);

  const files = {
    HTML: {
      name: (
        <p className="flex items-center">
          <AiFillHtml5 className=" text-red-600" />
          HTML
        </p>
      ),
      language: "html",
      value: htmlTemplate,
    },
    CSS: {
      name: (
        <p className="flex items-center">
          <FaCss3Alt className=" text-blue-600" />
          CSS
        </p>
      ),
      language: "css",
      value: cssTemplate,
    },
    JS: {
      name: (
        <p className="flex items-center">
          <BiLogoJavascript className=" text-yellow-300" />
          JS
        </p>
      ),
      language: "javascript",
      value: jsTemplate,
    },
    Tailwind: {
      name: (
        <p className="flex items-center">
          <BiLogoTailwindCss className="text-sky-400" /> Tailwind
        </p>
      ),
      language: "css",
      value: tailwindCssTemplate,
    },
  };

  const editorRef = useRef(null);

  useEffect(() => {
    const documentContents = `
        <html>
        <head>
        <style>${languages.includes("CSS") && css}</style>
        ${
          languages.includes("Tailwind")
            ? `<script src="https://cdn.tailwindcss.com"></script>`
            : ``
        }
        </head>
        <body>
        ${html}
        <script>${js}</script>
        
        </body>
        </html>
        `;
    setDocumentContents(documentContents);
    setCode({
      ...code,
      html: html,
      css: css,
      javascript: js,
      tailwind: tailwind,
    });
    console.log(code);
  }, [html, css, js, tailwind]);

  const handlChange = (event) => {
    if (activeFile == "HTML") {
      setHtml(editorRef.current.getValue());
    }
    if (activeFile == "CSS") {
      setCss(editorRef.current.getValue());
    }
    if (activeFile == "JS") {
      setJs(editorRef.current.getValue());
    }
    if (activeFile == "Tailwind") {
      setTailwind(editorRef.current.getValue());
    }
  };

  const handleReset = () => {
    // setHtml(files["HTML"].value)
    // setCss(files["CSS"].value)
    // setJs(files["JS"].value)
    // setTailwind(files["Tailwind"].value)
    if (activeFile === "HTML") {
      setHtml(initialValues.html);
      editorRef.current.setValue(initialValues.html);
    }
    if (activeFile === "CSS") {
      editorRef.current.setValue(initialValues.css);
      setCss(initialValues.css);
    }
    if (activeFile === "JS") {
      setJs(initialValues.js);
      editorRef.current.setValue(initialValues.js);
    }
    if (activeFile === "Tailwind") {
      setTailwind(initialValues.tailwind);
      editorRef.current.setValue(initialValues.tailwind);
    }
    toast.success(`Reset ${activeFile.toUpperCase()}`);
  };

  const handleCopy = () => {
    if (activeFile === "HTML") {
      navigator.clipboard.writeText(html);
    }
    if (activeFile === "CSS") {
      navigator.clipboard.writeText(css);
    }
    if (activeFile === "JS") {
      navigator.clipboard.writeText(js);
    }
    if (activeFile === "Tailwind") {
      navigator.clipboard.writeText(tailwind);
    }
    toast.success(`Copied ${activeFile.toUpperCase()}`);
  };

  return (
    <div className="w-full h-full flex max-sm:flex-wrap items-center justify-center gap-[15px] max-sm:gap-[5px]">
      <div className="flex flex-col w-1/2 max-sm:w-full  h-full gap-[5px]">
        <div className="flex flex-row  bg-[#292929] rounded-t-xl px-2 py-1 justify-start items-center">
          {languages.map((fileLang, idx) => {
            return (
              <button
                key={idx}
                className={`p-1 mx-2 max-sm:m-0 text-[18px] max-sm:text-[14px] font-[600] text-[#fff] ${
                  activeFile == fileLang
                    ? "text-opacity-100"
                    : "text-opacity-40 hover:text-opacity-100"
                }`}
                onClick={() => {
                  setActiveFile(fileLang);
                }}
              >
                {files[fileLang].name}
              </button>
            );
          })}
          <select
            className="ml-auto mr-[30px] px-[10px] max-sm:px-0 h-[90%] appearance-none focus:outline-none rounded-lg"
            onChange={(e) => setTheme(e.target.value)}
          >
            {editorThemes.map((themeName, idx) => {
              return (
                <option key={idx} value={themeName.theme}>
                  {themeName.name}
                </option>
              );
            })}
          </select>
          <FaRegCopy
            className="mr-[20px] text-[#5EBE55] scale-150 self-center hover:cursor-pointer"
            title="Copy Code"
            name="copy"
            onClick={handleCopy}
          />
          <BiReset
            className="mr-[20px] text-red-400 scale-150 self-center hover:cursor-pointer"
            title="Reset Code"
            name="reset"
            onClick={handleReset}
          />
        </div>
        <MonacoEditor
          theme={theme}
          language={files[activeFile].language}
          path={activeFile}
          onChange={handlChange}
          defaultValue={files[activeFile].value || "// write your code here..."}
          // value={files[activeFile].value}
          options={{
            minimap: {
              enabled: false,
            },
            fontSize: 16,
            automaticLayout: true,
            fontWeight: 700,
            
            // Add any additional editor options here
          }}
          value={
            activeFile === "HTML"
              ? html
              : activeFile === "CSS"
              ? css
              : activeFile === "JS"
              ? js
              : activeFile === "Tailwind"
              ? tailwind
              : ""
          }
          onMount={(editor, _) => {
            editorRef.current = editor;
          }}
        />
      </div>
      <div className="flex flex-col w-1/2 max-sm:w-full h-full gap-[15px]">
        <CodeOutput sourceCode={documentContents} />
        <ComponentInfo />
      </div>
    </div>
  );
};

export default CodeEditor;
