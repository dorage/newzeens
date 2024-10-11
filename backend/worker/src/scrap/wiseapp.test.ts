import { testScrapingTask } from "../libs/testing";
import scrapingTask from "./wiseapp";

testScrapingTask(scrapingTask, { describe, test, expect });
