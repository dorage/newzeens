cmd_Release/test_extension.node := c++ -bundle -undefined dynamic_lookup -Wl,-search_paths_first -Wl,-dead_strip -mmacosx-version-min=10.7 -arch arm64 -L./Release -stdlib=libc++  -o Release/test_extension.node Release/obj.target/test_extension/deps/test_extension.o Release/sqlite3.a 