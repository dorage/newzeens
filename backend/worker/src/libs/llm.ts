import { LLama3 } from "../apis/llama";

// Summarize next article under 6 lines in korean to make people have interest of the article and return the summary only without any markdown syntax:
const prompt = (content: string) => `
다음 규칙에 따라 컨텐츠를 요약해줘.
규칙:
- '~으로 공유' 와 같은 의미없는 문장들을 제외
- 글의 핵심 주제를 찾고 사람들의 흥미를 유발시킬 수 있게 작성
- 6문장 이내로 작성
- 한국어로 작성
컨텐츠: ${content}
`;

export const summarizeNewsletter = async (content: string) => {
  try {
    return LLama3.postGenerate(prompt(content));
  } catch (err) {
    console.error(err);
  }
};
