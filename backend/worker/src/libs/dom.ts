import ky from "ky";
import { JSDOM } from "jsdom";

// retrieve text from url, then generate DOM
export const getDOM = async (url: string) => {
  const res = await ky.get(url);
  const html = await res.text();
  const dom = new JSDOM(html);

  return dom;
};
