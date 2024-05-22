#!/usr/bin/env python3

import os

_menu = []
with open("./html/index.html", "rt", encoding="utf-8") as _index:
    _lines = _index.readlines()
    begin_menu = False
    for _line in _lines:
        if _line.strip() == "<!-- MENU_END -->":
            begin_menu = False
        if begin_menu:
            _menu.append(_line)
        if _line.strip() == "<!-- MENU_BEGIN -->":
            begin_menu = True

# print(_menu)

_files = os.listdir("./html")

for _file in _files:
    _fullpath = os.path.join("./html", _file)
    if not os.path.isfile(_fullpath):
        continue
    if not _fullpath.endswith(".html"):
        continue
    if _fullpath.endswith("index.html"):
        continue
    print(_fullpath)
    _new_lines = []
    with open(_fullpath, "rt", encoding="utf-8") as _index:
        _lines = _index.readlines()
        begin_menu = False
        for _line in _lines:
            if _line.strip() == "<!-- MENU_END -->":
                begin_menu = False
                # _new_lines.append(_line)
            if not begin_menu:
                _new_lines.append(_line)
            if _line.strip() == "<!-- MENU_BEGIN -->":
                begin_menu = True
                print("Found menu in " + _fullpath)
                # _new_lines.append(_line)
                _new_lines.extend(_menu)
    with open(_fullpath, "wt", encoding="utf-8", newline="\n") as _index:
        _index.write("".join(_new_lines))
