import { LLama3 } from "../apis/llama";

// Summarize next article under 6 lines in korean to make people have interest of the article and return the summary only without any markdown syntax:
const prompt = (content: string) => `
다음 규칙에 따라 컨텐츠를 요약해줘.
규칙:
- '~으로 공유' 와 같은 의미없는 문장들을 제외
- 주어진 텍스트의 주요 내용을 5개의 핵심 포인트로 요약해 주세요.
- 각 포인트는 핵심 아이디어나 트렌드를 간결하게 담아야 합니다.
- 각 포인트는 점(·)으로 시작하고, 54자 이내여야 하며, 단어로 끝나야 합니다.
- 원문에서 논의된 가장 중요한 정보와 트렌드를 다루어야 합니다.
컨텐츠: ${content}
`;

export const summarizeNewsletter = async (content: string) => {
  try {
    return LLama3.postGenerate(prompt(content));
  } catch (err) {
    console.error(err);
  }
};
