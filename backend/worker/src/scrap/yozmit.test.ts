import { testScrapingTask } from "../libs/testing";
import scrapingTask from "./yozmit";

testScrapingTask(scrapingTask, { describe, test, expect });
