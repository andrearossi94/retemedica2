#!/bin/bash
echo "Inizializzazione progetto"
FILE=log.txt
if [ -f "$FILE" ]; then
    rm log.txt
fi
sh ./reg.sh | tee -a "$log.txt"
sleep 1
sh ./start.sh | tee -a "$log.txt"
sleep 1
sh ./check.sh | tee -a "$log.txt"
