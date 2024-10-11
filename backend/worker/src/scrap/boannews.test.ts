import { testScrapingTask } from "../libs/testing";
import scrapingTask from "./boannews";

testScrapingTask(scrapingTask, { describe, test, expect });
