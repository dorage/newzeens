import { testScrapingTask } from "../libs/testing";
import scrapingTask from "./trendaword";

testScrapingTask(scrapingTask, { describe, test, expect });
