import { testScrapingTask } from "../libs/testing";
import scrapingTask from "./careet";

testScrapingTask(scrapingTask, { describe, test, expect });
