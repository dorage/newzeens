import { testScrapingTask } from "../libs/testing";
import scrapingTask from "./digiq";

testScrapingTask(scrapingTask, { describe, test, expect });
