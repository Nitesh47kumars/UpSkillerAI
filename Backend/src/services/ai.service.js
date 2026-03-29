import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_GENAPI_KEY
});

async function invokeGenAI(){
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "hello gemini! explain me what is an Interview"
    });
    console.log(response.text);
    return response
}

export default invokeGenAI;