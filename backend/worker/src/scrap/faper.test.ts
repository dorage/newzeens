import { testScrapingTask } from "../libs/testing";
import scrapingTask from "./faper";

testScrapingTask(scrapingTask, { describe, test, expect });
