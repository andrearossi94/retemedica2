#!/bin/bash
echo "Test get"
echo "should be successful"
sleep 5
hurl invoke cartellaclinica cartellaclinica_get "Cart1" "mr1976" "mario123" -u dottore1
echo "°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°"
sleep 5
hurl invoke cartellaclinica cartellaclinica_get "Cart1" "ab1996" "andrea123" -u paziente1
echo "error: wrong user or password"
sleep 5
hurl invoke cartellaclinica cartellaclinica_get "Cart1" "mr1976" "mario" -u dottore1
echo "°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°"
sleep 5
echo "error: wrong person"
hurl invoke cartellaclinica cartellaclinica_get "Cart1" "gc1996" "giacomo123" -u paziente2
sleep 5
hurl invoke cartellaclinica cartellaclinica_get "Cart1" "mar1976" "mario123" -u dottore2
sleep 5
echo "Test consenso"
echo "should be successful"
sleep 5
hurl invoke cartellaclinica cartellaclinica_cambiaconsenso "Cart1" "ab1996" "andrea123" -u paziente1
echo "error: wrong user or password"
sleep 5
hurl invoke cartellaclinica cartellaclinica_cambiaconsenso "Cart1" "ab1996" "andrea" -u paziente1
echo "°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°"
sleep 5
echo"error: wrong person"
hurl invoke cartellaclinica cartellaclinica_cambiaconsenso "Cart1" "mr1976" "mario123" -u dottore1
echo "°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°"
sleep 5
hurl invoke cartellaclinica cartellaclinica_cambiaconsenso "Cart1" "gc1996" "giacomo123" -u paziente2
sleep 5
echo "Test stato"
echo "should be successful"
hurl invoke cartellaclinica cartellaclinica_degenza "Cart2" "gs1986" "giuseppe123" -u dottore2
sleep 5
echo "error: wrong user or password"
hurl invoke cartellaclinica cartellaclinica_degenza "Cart2" "gs1986" "giuseppe" -u dottore2
echo "°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°"
sleep 5
echo "error: wrong person"
hurl invoke cartellaclinica cartellaclinica_degenza "Cart2" "ab1996" "andrea123" -u paziente1
echo "°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°"
sleep 5
hurl invoke cartellaclinica cartellaclinica_degenza "Cart2" "mr1976" "mario123" -u dottore1
echo "Test username"
echo "should be successful"
hurl invoke cartellaclinica cartellaclinica_getByUsername "Paz1" "mr1976" "mario123" -u dottore1
sleep 5
echo "error: wrong user or password"
hurl invoke cartellaclinica cartellaclinica_getByUsername "Paz1" "mr1976" "mario" -u dottore1
sleep 5
echo "error: wrong person"
hurl invoke cartellaclinica cartellaclinica_getByUsername "Paz1" "gs1986" "giuseppe123" -u dottore2
sleep 2
echo "FINE"