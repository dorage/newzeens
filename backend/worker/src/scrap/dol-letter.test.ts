import { testScrapingTask } from "../libs/testing";
import scrapingTask from "./dol-letter";

testScrapingTask(scrapingTask, { describe, test, expect });
