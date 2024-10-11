import { testScrapingTask } from "../libs/testing";
import scrapingTask from "./designcompass";

testScrapingTask(scrapingTask, { describe, test, expect });
