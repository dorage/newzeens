import { testScrapingTask } from "../libs/testing";
import scrapingTask from "./dailyprompt";

testScrapingTask(scrapingTask, { describe, test, expect });
