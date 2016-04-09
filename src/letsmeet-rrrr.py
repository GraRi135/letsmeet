#!/usr/bin/env python2
import rrrr
import sys
import os.path
import time

if len(sys.argv) < 2 or not os.path.isfile(sys.argv[1]): 
    print ("Create a timetable from GTFS using rrtimetable.")
    sys.exit(-1)

router = rrrr.Raptor(timetable = sys.argv[1])

now = int(time.time())

# print router.stops()[0:10]
best_times_a = router.meet(from_idx = 1, to_idx = 100, depart = now)
best_times_b = router.meet(from_idx = 10, to_idx = 100, depart = now)

calc = []

for sp_index in range(0, len(best_times_a['best_time'])):
   a = best_times_a['best_time'][sp_index]
   b = best_times_b['best_time'][sp_index]

   if a == 65535 or b == 65535:
       continue

   d = abs(a - b)
   calc.append((sp_index, (a - d) + (b - d),))

s = sorted(calc, key=lambda x: x[1])
print s[0:10]

for x in s[0:10]:
	print best_times_a['stop_name'][x[0]]
