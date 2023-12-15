import { NextResponse, NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

function fileToGenerativePart(path: any, mimeType: any) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

export async function POST(req: NextRequest) {
  console.log("connected");
  try {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
    let reqBody = await req.json();
    let { question } = reqBody;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // const imageParts = [fileToGenerativePart("jujutsukaisen.jpeg", "image/jpeg")];

    const result = await model.generateContent(question);
    const response = await result.response;

    const text = response.text();

    return NextResponse.json({
      message: text,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
}
