#!/bin/bash
# Define a timestamp function
timestamp() {
  date +"%T"
}
echo "Test creazione cartella clinica"
curl -H "Content-Type: application/json" --request POST --data '{"cartellaclinica": { "id":"Cart44", "patologia":"infezione", "pazienteID":"Paz1", "dottoreID":"Dot1", "stato":true, 
"consenso":true } }' http://localhost:8000/cartellaclinica/create
echo "°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°"
sleep 1
echo "Test get di una cartella clinica"
echo "Dovrebbe funzionare"
curl http://localhost:8000/cartellaclinica/get/Cart33
echo "°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°"
sleep 1
echo "Dovrebbe dare errore"
curl http://localhost:8000/cartellaclinica/get/Cart22
echo "°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°"

curl http://localhost:8000/cartellaclinica/getByUsername/Paz2

echo "Test cambio consenso di una cartella clinica"
echo "Dovrebbe funzionare"
curl -H "Content-Type: application/json" --request POST --data '{ "id":"Cart33" }' http://localhost:8000/cartellaclinica/cambiaconsenso
echo "°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°"
sleep 1
echo "Dovrebbe dare errore"
curl -H "Content-Type: application/json" --request POST --data '{ "id":"Cart22" }' http://localhost:8000/cartellaclinica/cambiaconsenso
echo "°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°"
sleep 1
echo "Test degenza cartella clinica"
echo "Dovrebbe funzionare"
curl -H "Content-Type: application/json" --request POST --data '{ "id":"Cart33", "stato":false }' http://localhost:8000/cartellaclinica/degenza
echo "°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°"
sleep 1
echo "Dovrebbe dare errore"
curl -H "Content-Type: application/json" --request POST --data '{ "id":"Cart22", "stato":false }' http://localhost:8000/cartellaclinica/degenza
echo "°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°"
echo "FINE"

