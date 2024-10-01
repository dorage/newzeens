import ky from "ky";

const postGenerate = async (prompt: string) => {
  try {
    const res = await ky.post("http://localhost:11434/api/generate", {
      json: {
        model: "llama3.1:8b",
        prompt,
        stream: false,
      },
      timeout: 10 * 60 * 1000,
    });
    const json = (await res.json()) as { response: string };
    return json.response;
  } catch (err) {
    console.error(err);
  }
};

export const LLama3 = {
  postGenerate,
};
