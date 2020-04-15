#!/bin/bash
echo "Testiamo alcune chiamate get del paziente e dottore"

curl 'http://localhost:8000/personale/get/Paz1?org=org1&user=paziente1'

sleep 1

curl 'http://localhost:8000/personale/get/Dot1?org=org1&user=dottore1'

sleep 1
echo "Test create cartellaclinica"

curl 'http://localhost:8000/cartellaclinica/create?org=org1&user=dottore1' -H "Content-Type: application/json" --request POST --data '{"cartellaclinica": { "id":"Cart33", "patologia":"infezione", "pazienteID":"Paz1", "dottoreID":"Dot1", "stato":true, 
"consenso":true } }'

sleep 1
echo "Test get cartellaclinica"

curl 'http://localhost:8000/cartellaclinica/get/Cart1?org=org1&user=paziente1'

echo "Test degenza"

curl 'http://localhost:8000/cartellaclinica/degenza?org=org1&user=dottore1' -H "Content-Type: application/json" --request POST --data '{ "id": "Cart1"}'

echo "dovrebbe dare errore"

curl 'http://localhost:8000/cartellaclinica/degenza?org=org1&user=paziente1' -H "Content-Type: application/json" --request POST --data '{ "id": "Cart1"}'

sleep 1
echo "test cambiaconsenso"

curl 'http://localhost:8000/cartellaclinica/cambiaconsenso?org=org1&user=paziente1' -H "Content-Type: application/json" --request POST --data '{ "id": "Cart1"}'

echo "dovrebbe dare errore"

curl 'http://localhost:8000/cartellaclinica/cambiaconsenso?org=org1&user=dottore1' -H "Content-Type: application/json" --request POST --data '{ "id": "Cart1"}'

sleep 1
echo "FINE TEST"

