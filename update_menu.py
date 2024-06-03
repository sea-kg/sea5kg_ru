#!/usr/bin/env python3

import os
import platform
import datetime

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
_files_with_menu = [
    "./html/index.html",
]
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
                _files_with_menu.append(_fullpath)
                _new_lines.extend(_menu)
    with open(_fullpath, "wt", encoding="utf-8", newline="\n") as _index:
        _index.write("".join(_new_lines))


# update sitemap
def creation_date(path_to_file):
    """
    Try to get the date that a file was created, falling back to when it was
    last modified if that isn't possible.
    See http://stackoverflow.com/a/39501288/1709587 for explanation.
    """
    if platform.system() == 'Windows':
        return os.path.getctime(path_to_file)
    else:
        stat = os.stat(path_to_file)
        try:
            return stat.st_birthtime
        except AttributeError:
            # We're probably on Linux. No easy way to get creation dates here,
            # so we'll settle for when its content was last modified.
            return stat.st_mtime


_sitemap = ''
_sitemap += '<?xml version="1.0" encoding="UTF-8"?>\n'
_sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
for _filepath in _files_with_menu:
    _file = _filepath.split('./html/')[1]
    _mtime = creation_date(_filepath)
    _lastmod = datetime.datetime.fromtimestamp(_mtime).strftime('%Y-%m-%d')
    _sitemap += '    <url>\n'
    _sitemap += '        <loc>https://sea5kg.ru/' + _file + '</loc>\n'
    _sitemap += '        <lastmod>' + _lastmod + '</lastmod>\n'
    _sitemap += '        <changefreq>monthly</changefreq>\n'
    _sitemap += '        <priority>1.0</priority>\n'
    _sitemap += '    </url>\n'
_sitemap += '</urlset>\n'

with open("./html/sitemap.xml", "wt", encoding="utf-8", newline="\n") as _sitemap_file:
    _sitemap_file.write(_sitemap)
