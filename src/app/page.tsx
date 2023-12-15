"use client";
import { useState } from "react";
import axios from "axios";
import "./globals.css";

export default function Home() {
  let [content, setContent] = useState("");
  const [text, setText] = useState("");
  const [response, setReponse] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    setContent(text);

    setReponse(null);

    try {
      let result = await axios.post("api/responseapi", { question: text });

      setReponse(result.data);
      console.log(result.data.success);
      console.log(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    setText("");
  }
  return (
    <main style={{ textAlign: "center" }}>
      <h1>GPT-DEMO</h1>
      <div>
        <input
          style={{ width: "300px", height: "40px", padding: "0px 6px" }}
          type="Message Gpt"
          onChange={e => setText(e.target.value)}
          value={text}
          placeholder="Message GPT..."
        />
        <button style={{ padding: "12px 14px" }} onClick={submit}>
          submit
        </button>
      </div>

      <div
        style={{
          width: "80%",
          margin: "40px auto",
        }}
      >
        {content.length <= 0 ? <h3>How can I help you today?</h3> : ""}
        {loading ? "Please wait..." : ""}
        {response ? <p>{response.message}</p> : ""}
      </div>
    </main>
  );
}
