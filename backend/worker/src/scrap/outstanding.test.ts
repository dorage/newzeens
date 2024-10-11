import { testScrapingTask } from "../libs/testing";
import scrapingTask from "./outstanding";

testScrapingTask(scrapingTask, { describe, test, expect });
