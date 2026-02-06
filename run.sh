#!/usr/bin/bash

aether-web-setup dest
aether -c dest/app.abc client/chat.ae
aether server/main.ae
