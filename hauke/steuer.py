#!/usr/bin/env python
# encoding: utf-8
"""
Created by Hauke Huchzermeyer on 2013-09-13.
Copyright (c) 2011 Hauke Huchzermeyer. All rights reserved.
"""

import sys
import os
import pickle
from time import *
import math

def main():
	print 'hello copter'
	i = 0
	while i != 1:
		print ' -> '
		a = sys.stdin.readline()
		if a[0] == 'q':
			dostuff('stop')
		if a[0] == 'y':
			dostuff('start')
		if a[0] == 'x':
			dostuff('land')
		if a[0] == 'w':
			dostuff('front')
		if a[0] == 's':
			dostuff('back')
		if a[0] == 'a':
			dostuff('turnleft90')
		if a[0] == 'd':
			dostuff('turnright90')
		if a[0] == 't':
			dostuff('hauketest')
	return 0

def dostuff(command):
	print command
	p = os.popen('node %s.js' % (command),"r")
	while 1:
	    line = p.readline()
	    if not line: break
	    print line

if __name__ == '__main__':
	main()