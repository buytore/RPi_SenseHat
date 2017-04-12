#!/usr/bin/env python
#
# Copyright 2009 Facebook
#
# Licensed under the Apache License, Version 2.0 (the "License"); you may
# not use this file except in compliance with the License. You may obtain
# a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web
from tornado.options import define, options
from jinja2 import Environment, FileSystemLoader #For templating stuff
import rethinkdb as r #For db stuff
from rethinkdb.errors import RqlRuntimeError, RqlDriverError
from conf_old import * #Fetching db and table details here

define("port", default=8000, help="run on the given port", type=int)

#Load the template environment
template_env = Environment(loader=FileSystemLoader("templates"))


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        home_template = template_env.get_template("home.html")
        connection = r.connect(RDB_HOST, RDB_PORT, PROJECT_DB)
        result = r.table(PROJECT_TABLE).order_by(r.desc('date')).limit(200).run(connection)
        jsonResult = list(result)
        print 'log: %s inserted successfully' % jsonResult
        self.write(home_template.render({"name": jsonResult}))

    def get2(self):
        self.write("Hello, world")


def main():
    tornado.options.parse_command_line()
    application = tornado.web.Application([
        (r"/", MainHandler),
    ])
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.current().start()


if __name__ == "__main__":
    main()