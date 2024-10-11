import { testScrapingTask } from "../libs/testing";
import scrapingTask from "./kokonut";

testScrapingTask(scrapingTask, { describe, test, expect });
