import { useState } from "react";
import useConvert from "./use-convert";
import Button from "./components/button";
import TextArea from "./components/textarea";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const [convert, isLoading] = useConvert();

  const paste = async () => {
    const text = await navigator.clipboard.readText();
    setInput(text.trim());
    alert("Pasted from clipboard!");
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output.trim());
    alert("Copied to clipboard!");
  };

  const clear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <main className="flex flex-col h-screen w-full max-w-2xl mx-auto gap-4 mt-8">
      <h1 className="text-3xl">MTG LLM Card Normalizer</h1>
      <p className="text-sm">
        This very specialized web app takes a list of MTG cards in the standard
        format ("1 Lightning Bolt") and converts it to the format usable by LLMs
        so they can help with the deck building process.
      </p>

      <div className="flex flex-row w-full gap-4">
        <div className="flex flex-col w-full gap-4">
          <h3 className="text-xl">Input</h3>
          <TextArea value={input} onChange={(e) => setInput(e.target.value)} />
          <div className="flex flex-row w-full gap-2">
            <Button onClick={clear}>Clear</Button>
            <Button onClick={paste}>Paste</Button>
          </div>
        </div>
        <div className="flex flex-col w-full gap-4">
          <h3 className="text-xl">Output</h3>
          <TextArea value={output} disabled />
          <Button onClick={copy}>Copy</Button>
        </div>
      </div>

      <Button onClick={() => setOutput(convert(input))} disabled={isLoading}>
        Convert
      </Button>
    </main>
  );
}

export default App;
