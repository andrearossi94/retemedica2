#!/bin/bash
echo "Testiamo get paziente e dottore"

curl 'http://localhost:8000/personale/get/Paz1?org=org1&user=paziente1'

sleep 1

curl 'http://localhost:8000/personale/get/Dot1?org=org1&user=dottore1'

sleep 1
echo "Test create cartellaclinica"

curl 'http://localhost:8000/cartellaclinica/create?org=org1&user=dottore1' -H "Content-Type: application/json" --request POST --data '{"cartellaclinica": { "id":"Cart33", "patologia":"infezione", "pazienteID":"Paz1", "dottoreID":"Dot1", "stato":true, "consenso":true } , "username":"mr1976", "password":"mario123"}'

sleep 1
echo "Test get cartellaclinica"

curl 'http://localhost:8000/cartellaclinica/get?org=org1&user=paziente1' -H "Content-Type: application/json" --request POST --data '{"id":"Cart1", "username": "ab1996", "password":"andrea123" }'

sleep 1
echo "Test getByUsername"
curl 'http://localhost:8000/cartellaclinica/getByUsername?org=org1&user=paziente2' -H "Content-Type: application/json" --request POST --data '{"id":"Paz2", "username": "gc1996", "password":"giacomo123" }'

curl 'http://localhost:8000/cartellaclinica/getByUsername?org=org1&user=paziente1' -H "Content-Type: application/json" --request POST --data '{"id":"Paz1", "username": "ab1996", "password":"andrea123" }'

sleep 1
echo "Test degenza"

curl 'http://localhost:8000/cartellaclinica/degenza?org=org1&user=dottore1' -H "Content-Type: application/json" --request POST --data '{ "id": "Cart1", "username":"mr1976", "password":"mario123" }'

echo "error: wrong person"

curl 'http://localhost:8000/cartellaclinica/degenza?org=org1&user=paziente1' -H "Content-Type: application/json" --request POST --data '{ "id": "Cart1", "username":"ab1996", "password":"andrea123"}'

sleep 1
echo "test cambiaconsenso"

curl 'http://localhost:8000/cartellaclinica/cambiaconsenso?org=org1&user=paziente1' -H "Content-Type: application/json" --request POST --data '{ "id": "Cart1", "username":"ab1996", "password":"andrea123"}'

echo "error: wrong person"

curl 'http://localhost:8000/cartellaclinica/cambiaconsenso?org=org1&user=dottore1' -H "Content-Type: application/json" --request POST --data '{ "id": "Cart1", "username":"mr1976", "password":"mario123"}'

sleep 1 
echo "error: wrong user or password"
curl 'http://localhost:8000/cartellaclinica/cambiaconsenso?org=org1&user=paziente1' -H "Content-Type: application/json" --request POST --data '{ "id": "Cart1", "username":"ab1996", "password":"andrea"}'

sleep 1
echo "FINE TEST"

