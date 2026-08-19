Video 1: Introduction to JS

Lecture: Browsers inherently understand/execute JS Code. Browsers  can't execute C++, C, etc.
(Not from lecture, but my own learning, Browsers can't execute shit, it's all done by the V8 Engine from (Chromium)
to run JS Code (V8 is in C++), Browsers can run other languages too using Emscripten to compile for web assembly)

Why JS not Other languages?
1. Easy to learn/understand.
2. Massive Security Nightmare (C++ is a relatively low level language than JS and can access files/memory/syscalls/etc.)
// Basically C++ was too powerful and unnecessary for meanial tasks such lol
3. Probably Compilation too, C++ is a compiled lang, JS is interpreted.
4. At that time (~1995) Computers weren't as powerful, needed something lightweight.
5. Automatic Garbage Collection (better memory management)

Okay the video also introduced V8 Engine later
V8 Engine -> Google Chrome (and Chromium based browsers)
SpiderMonkey -> FireFox
I forgot name -> Safari

V8 Engine is a precompiled thing (app/exe/library/dll/ I dont know) in browsers that can execute JS Code
NodeJS basically copied the V8 Engine, added some stuff on top and made it possible to run JS outside browser


Video 2: Variables and Data Types in JS

