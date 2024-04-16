import fc from "fast-check";

fc.configureGlobal({ markInterruptAsFailure: true, interruptAfterTimeLimit: 5_000 });
