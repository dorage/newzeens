cmd_Release/obj.target/better_sqlite3/src/better_sqlite3.o := c++ -o Release/obj.target/better_sqlite3/src/better_sqlite3.o ../src/better_sqlite3.cpp '-DNODE_GYP_MODULE_NAME=better_sqlite3' '-DUSING_UV_SHARED=1' '-DUSING_V8_SHARED=1' '-DV8_DEPRECATION_WARNINGS=1' '-DV8_DEPRECATION_WARNINGS' '-DV8_IMMINENT_DEPRECATION_WARNINGS' '-D_GLIBCXX_USE_CXX11_ABI=1' '-D_DARWIN_USE_64_BIT_INODE=1' '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-DOPENSSL_NO_PINSHARED' '-DOPENSSL_THREADS' '-DBUILDING_NODE_EXTENSION' '-DNDEBUG' -I/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node -I/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/src -I/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/deps/openssl/config -I/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/deps/openssl/openssl/include -I/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/deps/uv/include -I/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/deps/zlib -I/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/deps/v8/include -I./Release/obj/gen/sqlite3  -O3 -mmacosx-version-min=10.7 -arch arm64 -Wall -Wendif-labels -W -Wno-unused-parameter -std=gnu++17 -stdlib=libc++ -fno-rtti -fno-exceptions -fvisibility-inlines-hidden -std=c++17 -stdlib=libc++ -MMD -MF ./Release/.deps/Release/obj.target/better_sqlite3/src/better_sqlite3.o.d.raw   -c
Release/obj.target/better_sqlite3/src/better_sqlite3.o: \
  ../src/better_sqlite3.cpp ../src/better_sqlite3.hpp \
  Release/obj/gen/sqlite3/sqlite3.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/node.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/cppgc/common.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8config.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-array-buffer.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-local-handle.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-internal.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-version.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-object.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-maybe.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-persistent-handle.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-weak-callback-info.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-primitive.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-data.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-value.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-traced-handle.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-container.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-context.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-snapshot.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-date.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-debug.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-script.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-callbacks.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-promise.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-message.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-exception.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-extension.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-external.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-function.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-function-callback.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-template.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-memory-span.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-initialization.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-isolate.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-embedder-heap.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-microtask.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-statistics.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-unwinder.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-embedder-state-scope.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-platform.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-json.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-locker.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-microtask-queue.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-primitive-object.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-proxy.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-regexp.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-typed-array.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-value-serializer.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-wasm.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/node_version.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/node_api.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/js_native_api.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/js_native_api_types.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/node_api_types.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/node_object_wrap.h \
  /Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/node_buffer.h
../src/better_sqlite3.cpp:
../src/better_sqlite3.hpp:
Release/obj/gen/sqlite3/sqlite3.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/node.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/cppgc/common.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8config.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-array-buffer.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-local-handle.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-internal.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-version.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-object.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-maybe.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-persistent-handle.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-weak-callback-info.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-primitive.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-data.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-value.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-traced-handle.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-container.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-context.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-snapshot.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-date.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-debug.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-script.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-callbacks.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-promise.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-message.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-exception.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-extension.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-external.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-function.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-function-callback.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-template.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-memory-span.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-initialization.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-isolate.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-embedder-heap.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-microtask.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-statistics.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-unwinder.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-embedder-state-scope.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-platform.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-json.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-locker.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-microtask-queue.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-primitive-object.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-proxy.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-regexp.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-typed-array.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-value-serializer.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/v8-wasm.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/node_version.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/node_api.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/js_native_api.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/js_native_api_types.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/node_api_types.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/node_object_wrap.h:
/Users/kanghyunlee/Library/Caches/node-gyp/20.10.0/include/node/node_buffer.h: