#!/bin/bash

sudo docker run --name skynet-rethink -p 8080:8080 -p 28015:28015 -d rethinkdb
